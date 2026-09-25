import Link from "next/link";
import { CalendarPlus, CheckCircle2, Clock, XCircle } from "lucide-react";
import SimpleShell from "@/components/booking/SimpleShell";
import { CONTACT_EMAIL } from "@/lib/booking/config";
import { finalizeBooking, getStripe } from "@/lib/booking/stripe-bookings";
import { originFromHeaders } from "@/lib/booking/server-utils";
import { formatClock, formatDate, formatMoney } from "@/lib/booking/time";

export const dynamic = "force-dynamic";
export const metadata = { title: "Your Booking | Oahu.BIKE", robots: { index: false } };

function googleCalendarUrl(b) {
  const stamp = (ms) => new Date(ms).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Oahu.BIKE e-bike rental (${b.ref})`,
    dates: `${stamp(b.start)}/${stamp(b.end)}`,
    location: [b.locationName, b.locationAddress].filter(Boolean).join(", "),
    details: `${b.bikes} × ${b.rentalLabel}. We'll text your lockbox code before pickup. Questions: ${CONTACT_EMAIL}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function Row({ label, children }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-900">{children}</dd>
    </div>
  );
}

function Details({ b }) {
  return (
    <dl className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white px-5 py-2 text-sm">
      <Row label="Booking">{b.ref}</Row>
      <Row label="Rental">
        {b.bikes} × {b.rentalLabel}
      </Row>
      <Row label="Pickup">
        {formatDate(b.start)}, {formatClock(b.start)}
      </Row>
      <Row label="Return">
        {formatDate(b.end)}, {formatClock(b.end)}
      </Row>
      <Row label="Where">
        {b.locationName}
        {b.locationAddress && <span className="block font-normal text-slate-500">{b.locationAddress}</span>}
      </Row>
      <Row label="Total paid">{formatMoney(b.amountTotal)}</Row>
    </dl>
  );
}

function Status({ icon: Icon, tone, title, children }) {
  return (
    <div className="text-center">
      <Icon className={`mx-auto h-14 w-14 ${tone}`} />
      <h1 className="mt-4 text-3xl font-semibold text-slate-900">{title}</h1>
      <div className="mt-3 text-slate-600">{children}</div>
    </div>
  );
}

const btn = "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-medium transition";

function Content({ booking: b }) {
  if (b?.status === "confirmed") {
    return (
      <>
        <Status icon={CheckCircle2} tone="text-emerald-500" title="You're booked!">
          <p>Mahalo! A receipt is on its way{b.customer.email ? ` to ${b.customer.email}` : ""}.</p>
        </Status>
        <Details b={b} />
        <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5 text-sm text-slate-700">
          <h2 className="mb-2 font-semibold text-slate-900">What happens next</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Before pickup we&rsquo;ll text your lockbox code and the exact pin
              {b.customer.phone ? ` to ${b.customer.phone}` : ""}.
            </li>
            <li>Your key, helmet and U-lock are in the lockbox.</li>
            <li>
              Need to change or cancel? Email <a className="text-sky-700 underline" href={`mailto:${CONTACT_EMAIL}?subject=Booking%20${b.ref}`}>{CONTACT_EMAIL}</a>{" "}
              with your booking number.
            </li>
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={googleCalendarUrl(b)} target="_blank" rel="noreferrer" className={`${btn} bg-sky-600 text-white hover:bg-sky-700`}>
            <CalendarPlus className="h-5 w-5" /> Add to Google Calendar
          </a>
          <Link href="/" className={`${btn} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}>
            Back to home
          </Link>
        </div>
      </>
    );
  }

  if (b?.status === "pending") {
    return (
      <>
        <Status icon={Clock} tone="text-amber-500" title="Payment processing">
          <p>Your bikes are reserved. We&rsquo;ll email you as soon as your payment clears.</p>
        </Status>
        <Details b={b} />
      </>
    );
  }

  if (b?.status === "refunded") {
    const overbooked = b.state === "overbooked";
    return (
      <Status icon={XCircle} tone="text-rose-500" title={overbooked ? "Sorry — those bikes were just taken" : "Booking cancelled"}>
        <p>
          {overbooked
            ? "Someone booked the last bikes for that time moments before your payment went through. "
            : "This booking has been cancelled. "}
          We&rsquo;ve refunded {formatMoney(b.amountRefunded || b.amountTotal)} in full; it should reach your account within 5–10
          business days.
        </p>
        <div className="mt-6">
          <Link href="/book" className={`${btn} bg-sky-600 text-white hover:bg-sky-700`}>
            Pick another time
          </Link>
        </div>
      </Status>
    );
  }

  if (b?.status === "hold") {
    return (
      <Status icon={Clock} tone="text-slate-400" title="Checkout isn't finished">
        <p>It looks like payment wasn&rsquo;t completed, so you haven&rsquo;t been charged.</p>
        <div className="mt-6">
          <Link href="/book" className={`${btn} bg-sky-600 text-white hover:bg-sky-700`}>
            Back to booking
          </Link>
        </div>
      </Status>
    );
  }

  return (
    <Status icon={XCircle} tone="text-slate-400" title="We couldn't find that booking">
      <p>
        If you were charged, email <a className="text-sky-700 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with
        your receipt and we&rsquo;ll sort it out right away.
      </p>
      <div className="mt-6">
        <Link href="/book" className={`${btn} bg-sky-600 text-white hover:bg-sky-700`}>
          Book a ride
        </Link>
      </div>
    </Status>
  );
}

export default async function ConfirmedPage({ searchParams }) {
  const { session_id: sessionId } = await searchParams;
  let booking = null;
  if (typeof sessionId === "string" && sessionId.startsWith("cs_") && getStripe()) {
    try {
      // Also runs the overbooking check, in case the webhook hasn't yet.
      booking = await finalizeBooking(sessionId, { origin: await originFromHeaders() });
    } catch (err) {
      console.error("[confirmed]", err);
    }
  }

  return (
    <SimpleShell>
      <section className="mx-auto max-w-2xl px-4 py-12 md:py-16">
        <Content booking={booking} />
      </section>
    </SimpleShell>
  );
}
