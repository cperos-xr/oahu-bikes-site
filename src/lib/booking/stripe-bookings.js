// Server-only. Stripe is the booking database: every booking is a Checkout
// Session whose metadata holds the rental window, bike count and pickup spot.
//
//   open session (unexpired)  -> "hold"      bikes held while the customer pays
//   complete + paid           -> "confirmed"
//   complete + processing     -> "pending"   (slow payment methods)
//   fully refunded            -> "refunded"  bikes released
//
// Refunding a booking (from /admin or the Stripe dashboard) frees its bikes.

import Stripe from "stripe";
import { HOLD_MINUTES, MAX_ADVANCE_DAYS, RENTALS, getLocation } from "./config";
import { bikesAvailable, blackoutIntervals, buildQuote, occupancy } from "./availability";
import { formatRange } from "./time";
import { sendBookingEmails } from "./email";

export const APP_TAG = "oahu-bike-booking";
const BLOCKING = new Set(["confirmed", "pending", "hold"]);
const REF_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

let stripeClient;
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  stripeClient ??= new Stripe(key, { appInfo: { name: APP_TAG } });
  return stripeClient;
}

function requireStripe() {
  const stripe = getStripe();
  if (!stripe) throw new Error("STRIPE_SECRET_KEY is not set");
  return stripe;
}

function expanded(value) {
  return value && typeof value === "object" ? value : null;
}

function toBooking(session, now = Date.now()) {
  const m = session.metadata || {};
  if (m.app !== APP_TAG) return null;
  const start = Date.parse(m.start);
  const end = Date.parse(m.end);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;

  const pi = expanded(session.payment_intent);
  const charge = expanded(pi?.latest_charge);

  let status;
  if (session.status === "open") status = session.expires_at * 1000 > now ? "hold" : "expired";
  else if (session.status !== "complete") status = "expired";
  else if (charge?.refunded) status = "refunded";
  else if (session.payment_status === "paid") status = "confirmed";
  else if (pi?.status === "processing") status = "pending";
  else status = "failed";

  const location = getLocation(m.location);
  return {
    id: session.id,
    ref: m.ref || session.id.slice(-8),
    status,
    state: pi?.metadata?.booking_state || null,
    start,
    end,
    bikes: Number(m.bikes) || 1,
    rental: m.rental,
    rentalLabel: m.rental_label || RENTALS[m.rental]?.label || m.rental,
    locationName: location?.name || m.location,
    locationAddress: location?.address || "",
    partner: m.partner || null,
    clientId: m.client_id || null,
    amountTotal: session.amount_total ?? 0,
    amountRefunded: charge?.amount_refunded ?? 0,
    customer: {
      name: session.customer_details?.name || "",
      email: session.customer_details?.email || "",
      phone: session.customer_details?.phone || "",
    },
    notes: session.custom_fields?.find((f) => f.key === "notes")?.text?.value || "",
    createdAt: session.created * 1000,
    paidAt: charge ? charge.created * 1000 : null,
    paymentIntentId: pi?.id || (typeof session.payment_intent === "string" ? session.payment_intent : null),
    livemode: session.livemode,
  };
}

// Every booking recent enough to still matter: anything created within the
// booking horizon (plus the longest rental) could overlap a future window.
export async function listBookings() {
  const stripe = requireStripe();
  const lookbackDays = MAX_ADVANCE_DAYS + RENTALS["multi-day"].maxDays + 7;
  const created = { gte: Math.floor(Date.now() / 1000) - lookbackDays * 86400 };
  const now = Date.now();

  const load = async (status) => {
    const out = [];
    const pages = stripe.checkout.sessions.list({
      status,
      created,
      limit: 100,
      expand: ["data.payment_intent.latest_charge"],
    });
    for await (const session of pages) {
      const booking = toBooking(session, now);
      if (booking) out.push(booking);
    }
    return out;
  };

  const [open, complete] = await Promise.all([load("open"), load("complete")]);
  return [...open, ...complete];
}

export async function getBooking(sessionId) {
  const session = await requireStripe().checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.latest_charge"],
  });
  return toBooking(session);
}

// Occupancy windows (no customer details) for the bookings that tie up bikes.
export function busyIntervals(bookings, { excludeClientId } = {}) {
  const busy = blackoutIntervals();
  for (const b of bookings) {
    if (!BLOCKING.has(b.status)) continue;
    if (b.status === "hold" && excludeClientId && b.clientId === excludeClientId) continue;
    busy.push({ ...occupancy(b.start, b.end), bikes: b.bikes });
  }
  return busy;
}

function newRef() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "OB-" + Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
}

function cleanClientId(id) {
  return typeof id === "string" && /^[A-Za-z0-9-]{8,64}$/.test(id) ? id : null;
}

function unavailableMessage(available) {
  if (available <= 0) return "Sorry — those bikes were just booked. Please pick another time.";
  return `Only ${available} bike${available === 1 ? " is" : "s are"} free for that time. Try fewer bikes or another time.`;
}

// Validates, re-checks availability, and starts a Stripe Checkout.
// Returns { url } on success or { status, error, busy? } on failure.
export async function createCheckout(input, origin) {
  const stripe = requireStripe();
  const quote = buildQuote(input);
  if (quote.error) return { status: 400, error: quote.error };

  const clientId = cleanClientId(input.clientId);
  const bookings = await listBookings();

  // A visitor who backed out of checkout shouldn't be blocked by their own hold.
  const mine = bookings.filter((b) => b.status === "hold" && clientId && b.clientId === clientId);
  await Promise.all(mine.map((b) => stripe.checkout.sessions.expire(b.id).catch(() => {})));

  const busy = busyIntervals(bookings.filter((b) => !mine.includes(b)));
  const available = bikesAvailable(busy, quote.start, quote.end);
  if (available < quote.bikes) {
    return { status: 409, error: unavailableMessage(available), busy };
  }

  const ref = newRef();
  const when = formatRange(quote.start, quote.end);
  const metadata = {
    app: APP_TAG,
    ref,
    rental: quote.rental,
    rental_label: quote.rentalLabel,
    start: new Date(quote.start).toISOString(),
    end: new Date(quote.end).toISOString(),
    days: String(quote.days),
    bikes: String(quote.bikes),
    location: quote.location.id,
    ...(input.partner && quote.location.id === input.partner ? { partner: input.partner } : {}),
    ...(clientId ? { client_id: clientId } : {}),
  };

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "book",
    client_reference_id: ref,
    line_items: [
      {
        quantity: quote.bikes,
        price_data: {
          currency: "usd",
          unit_amount: quote.pricePerBike,
          product_data: {
            name: `E-bike rental — ${quote.rentalLabel}`,
            description: `${when} (Hawaii time) · Pickup: ${quote.location.name}`,
          },
        },
      },
    ],
    metadata,
    payment_intent_data: {
      metadata,
      description: `Oahu.BIKE ${ref}: ${quote.bikes} × ${quote.rentalLabel}, ${when}`,
    },
    phone_number_collection: { enabled: true },
    custom_fields: [
      {
        key: "notes",
        label: { type: "custom", custom: "Where are you staying?" },
        type: "text",
        optional: true,
        text: { maximum_length: 200 },
      },
    ],
    custom_text: {
      submit: {
        message: `Your bikes are held for ${HOLD_MINUTES} minutes while you check out. We'll text your lockbox code before pickup.`,
      },
    },
    // Stripe requires at least 30 minutes; the extra minute avoids edge rejections.
    expires_at: Math.floor(Date.now() / 1000) + (HOLD_MINUTES + 1) * 60,
    success_url: `${origin}/book/confirmed?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/book?cancelled=1`,
  });

  return { url: session.url };
}

// Runs once a booking is paid (from the webhook and the confirmation page —
// whichever gets there first). If two people paid for the last bikes at the
// same moment, the later payment is refunded automatically.
export async function finalizeBooking(sessionId, { origin } = {}) {
  const stripe = requireStripe();
  const booking = await getBooking(sessionId);
  if (!booking || booking.status !== "confirmed" || booking.state) return booking;

  const paidFirst = (b) =>
    (b.paidAt ?? b.createdAt) - (booking.paidAt ?? booking.createdAt) || (b.id < booking.id ? -1 : 1);
  const earlier = (await listBookings()).filter(
    (b) => b.id !== booking.id && (b.status === "confirmed" || b.status === "pending") && paidFirst(b) < 0
  );
  const fits = bikesAvailable(busyIntervals(earlier), booking.start, booking.end) >= booking.bikes;

  if (fits) {
    await stripe.paymentIntents.update(booking.paymentIntentId, { metadata: { booking_state: "confirmed" } });
    booking.state = "confirmed";
    await sendBookingEmails("confirmed", booking, { origin });
    return booking;
  }

  await stripe.refunds.create(
    {
      payment_intent: booking.paymentIntentId,
      reason: "requested_by_customer",
      metadata: { app: APP_TAG, ref: booking.ref, why: "overbooked" },
    },
    { idempotencyKey: `overbooked-${booking.id}` }
  );
  await stripe.paymentIntents.update(booking.paymentIntentId, { metadata: { booking_state: "overbooked" } });
  Object.assign(booking, { status: "refunded", state: "overbooked", amountRefunded: booking.amountTotal });
  await sendBookingEmails("overbooked", booking, { origin });
  return booking;
}

// Admin cancel: full refund for paid bookings, or release an unpaid hold.
export async function cancelBooking(sessionId, { origin } = {}) {
  const stripe = requireStripe();
  const booking = await getBooking(sessionId);
  if (!booking) throw new Error(`No booking for ${sessionId}`);

  if (booking.status === "hold") {
    await stripe.checkout.sessions.expire(sessionId);
    return booking;
  }
  if (booking.status !== "confirmed" && booking.status !== "pending") return booking;

  await stripe.refunds.create(
    {
      payment_intent: booking.paymentIntentId,
      reason: "requested_by_customer",
      metadata: { app: APP_TAG, ref: booking.ref, why: "cancelled" },
    },
    { idempotencyKey: `cancel-${booking.id}` }
  );
  await stripe.paymentIntents.update(booking.paymentIntentId, { metadata: { booking_state: "cancelled" } });
  Object.assign(booking, { status: "refunded", state: "cancelled", amountRefunded: booking.amountTotal });
  await sendBookingEmails("cancelled", booking, { origin });
  return booking;
}
