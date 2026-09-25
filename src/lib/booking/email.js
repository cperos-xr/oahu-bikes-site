// Server-only. Optional booking emails through Resend (https://resend.com).
// Without RESEND_API_KEY + BOOKING_EMAIL_FROM this quietly does nothing, and
// Stripe's own receipt / payment notification emails still go out.

import { CONTACT_EMAIL, RENTAL_TERMS } from "./config";
import { formatClock, formatDate, formatMoney, formatRange } from "./time";

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.BOOKING_EMAIL_FROM);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

async function send({ to, subject, lines, idempotencyKey }) {
  if (!to) return;
  const text = lines.join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0f172a">${lines
    .map((l) => (l ? escapeHtml(l) : "&nbsp;"))
    .join("<br>")}</div>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      // The webhook and confirmation page can both finalize a booking; this
      // keeps a customer from getting the same email twice.
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({ from: process.env.BOOKING_EMAIL_FROM, to: [to], reply_to: CONTACT_EMAIL, subject, text, html }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

function detailLines(b) {
  return [
    `Booking: ${b.ref}`,
    `Rental: ${b.bikes} × ${b.rentalLabel} e-bike${b.bikes === 1 ? "" : "s"}`,
    `Pickup: ${formatDate(b.start)} at ${formatClock(b.start)} (Hawaii time)`,
    `Return: ${formatDate(b.end)} at ${formatClock(b.end)}`,
    `Where: ${b.locationName}${b.locationAddress ? ` — ${b.locationAddress}` : ""}`,
    `Total: ${formatMoney(b.amountTotal)}`,
  ];
}

function customerEmail(kind, b) {
  const hi = `Aloha${b.customer.name ? ` ${b.customer.name.split(" ")[0]}` : ""},`;
  if (kind === "confirmed") {
    return {
      subject: `You're booked! E-bike pickup ${formatDate(b.start)}`,
      lines: [
        hi, "", "Mahalo for booking with Oahu.BIKE. Here are your details:", "",
        ...detailLines(b), "",
        "What's next:",
        `• Before pickup we'll text your lockbox code and the exact pickup pin${b.customer.phone ? ` to ${b.customer.phone}` : ""}.`,
        "• Your key, helmet and U-lock are in the lockbox.",
        "• Need to change or cancel? Just reply to this email.", "",
        "Rental terms:", ...RENTAL_TERMS.map((t) => `• ${t}`), "",
        "See you soon!", "Oahu.BIKE",
      ],
    };
  }
  if (kind === "overbooked") {
    return {
      subject: "We couldn't confirm your e-bike booking — full refund issued",
      lines: [
        hi, "",
        `We're so sorry — someone booked the last bikes for ${formatRange(b.start, b.end)} moments before your payment went through.`,
        `We've refunded the full ${formatMoney(b.amountTotal)}. It should appear on your statement within 5–10 business days.`, "",
        "Reply to this email and we'll gladly help you find another time.", "",
        "Oahu.BIKE",
      ],
    };
  }
  return {
    subject: `Your e-bike booking ${b.ref} is cancelled`,
    lines: [
      hi, "",
      `Your booking for ${formatRange(b.start, b.end)} has been cancelled and ${formatMoney(b.amountTotal)} refunded.`,
      "It should appear on your statement within 5–10 business days.", "",
      "Questions? Just reply to this email.", "",
      "Oahu.BIKE",
    ],
  };
}

function ownerEmail(kind, b, origin) {
  const heading = {
    confirmed: `New booking ${b.ref} — ${formatMoney(b.amountTotal)}`,
    overbooked: `Auto-refunded ${b.ref} (overlapping booking)`,
    cancelled: `Cancelled ${b.ref} — refunded ${formatMoney(b.amountTotal)}`,
  }[kind];
  return {
    subject: `${heading} · ${formatDate(b.start)}`,
    lines: [
      heading, "",
      ...detailLines(b), "",
      `Customer: ${b.customer.name || "(no name)"}`,
      `Phone: ${b.customer.phone || "—"}`,
      `Email: ${b.customer.email || "—"}`,
      ...(b.notes ? [`Staying at: ${b.notes}`] : []),
      ...(b.partner ? [`Booked via partner page: ${b.partner}`] : []),
      ...(origin ? ["", `All bookings: ${origin}/admin`] : []),
    ],
  };
}

export async function sendBookingEmails(kind, booking, { origin } = {}) {
  if (!emailConfigured()) return;
  const owner = process.env.BOOKING_NOTIFY_EMAIL || CONTACT_EMAIL;
  const jobs = [
    send({ to: booking.customer.email, idempotencyKey: `${kind}-customer-${booking.id}`, ...customerEmail(kind, booking) }),
    send({ to: owner, idempotencyKey: `${kind}-owner-${booking.id}`, ...ownerEmail(kind, booking, origin) }),
  ];
  // Email trouble must never break a booking, so log and move on.
  for (const result of await Promise.allSettled(jobs)) {
    if (result.status === "rejected") console.error("[booking email]", result.reason);
  }
}
