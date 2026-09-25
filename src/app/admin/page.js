import { ExternalLink, LogOut } from "lucide-react";
import SimpleShell from "@/components/booking/SimpleShell";
import { BLACKOUTS, FLEET_SIZE } from "@/lib/booking/config";
import { emailConfigured } from "@/lib/booking/email";
import { getStripe, listBookings } from "@/lib/booking/stripe-bookings";
import { adminConfigured, isAdmin } from "@/lib/booking/server-utils";
import { formatMoney, formatRange } from "@/lib/booking/time";
import { cancelAction, loginAction, logoutAction } from "./actions";
import ConfirmSubmit from "./ConfirmSubmit";

export const dynamic = "force-dynamic";
export const metadata = { title: "Bookings | Oahu.BIKE", robots: { index: false, follow: false } };

const ACTIVE = new Set(["confirmed", "pending", "hold"]);

function badge(b) {
  if (b.status === "refunded") {
    if (b.state === "overbooked") return ["Auto-refunded (overlap)", "bg-rose-100 text-rose-800"];
    return ["Refunded", "bg-slate-200 text-slate-700"];
  }
  return {
    confirmed: ["Confirmed", "bg-emerald-100 text-emerald-800"],
    pending: ["Payment processing", "bg-amber-100 text-amber-800"],
    hold: ["In checkout", "bg-sky-100 text-sky-800"],
  }[b.status] || ["Payment failed", "bg-red-100 text-red-800"];
}

function Panel({ children }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">{children}</div>;
}

function BookingItem({ b }) {
  const [label, cls] = badge(b);
  const dashboard = b.paymentIntentId
    ? `https://dashboard.stripe.com/${b.livemode ? "" : "test/"}payments/${b.paymentIntentId}`
    : null;
  const canCancel = b.status === "confirmed" || b.status === "hold";
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="font-semibold text-slate-900">{formatRange(b.start, b.end)}</div>
          <div className="text-sm text-slate-600">
            {b.bikes} × {b.rentalLabel} · {b.locationName}
          </div>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>{label}</span>
      </div>

      <div className="mt-3 grid gap-x-6 gap-y-1 text-sm text-slate-700 sm:grid-cols-2">
        <div>{b.customer.name || <span className="text-slate-400">No name yet</span>}</div>
        {b.customer.phone && (
          <a className="text-sky-700 hover:underline" href={`tel:${b.customer.phone}`}>{b.customer.phone}</a>
        )}
        {b.customer.email && (
          <a className="text-sky-700 hover:underline" href={`mailto:${b.customer.email}`}>{b.customer.email}</a>
        )}
        {b.notes && <div>Staying at: {b.notes}</div>}
        {b.partner && <div>Via partner page: {b.partner}</div>}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-sm">
        <span className="text-slate-500">
          {b.ref} · {formatMoney(b.amountTotal)}
          {b.amountRefunded > 0 && ` · refunded ${formatMoney(b.amountRefunded)}`}
        </span>
        <div className="flex items-center gap-4">
          {dashboard && (
            <a href={dashboard} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-600 hover:text-slate-900">
              Stripe <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {canCancel && (
            <form action={cancelAction}>
              <input type="hidden" name="sessionId" value={b.id} />
              <ConfirmSubmit
                message={
                  b.status === "hold"
                    ? "Release this unpaid checkout hold?"
                    : `Cancel ${b.ref} and refund ${formatMoney(b.amountTotal)} in full?`
                }
                className="rounded-xl border border-rose-200 px-3 py-1.5 font-medium text-rose-700 hover:bg-rose-50 disabled:opacity-50"
              >
                {b.status === "hold" ? "Release hold" : "Cancel & refund"}
              </ConfirmSubmit>
            </form>
          )}
        </div>
      </div>
    </li>
  );
}

function SetupStatus() {
  const key = process.env.STRIPE_SECRET_KEY || "";
  const live = /^(sk|rk)_live_/.test(key);
  const items = [
    [`Stripe: ${live ? "LIVE mode" : "test mode"}`, true],
    ["Webhook secret", Boolean(process.env.STRIPE_WEBHOOK_SECRET)],
    ["Booking emails", emailConfigured()],
    ["SITE_URL", Boolean(process.env.SITE_URL)],
  ];
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {items.map(([label, ok]) => (
        <span key={label} className={`rounded-full px-2.5 py-1 ${ok ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
          {ok ? "✓" : "✗"} {label}
        </span>
      ))}
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
        Fleet: {FLEET_SIZE} bikes · {BLACKOUTS.length} blackout{BLACKOUTS.length === 1 ? "" : "s"}
      </span>
    </div>
  );
}

function Frame({ children }) {
  return (
    <SimpleShell>
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-10">{children}</section>
    </SimpleShell>
  );
}

export default async function AdminPage({ searchParams }) {
  const sp = await searchParams;

  if (!adminConfigured()) {
    return (
      <Frame>
        <Panel>
          <h1 className="text-2xl font-semibold text-slate-900">Bookings admin</h1>
          <p className="mt-2 text-slate-600">
            Set an <code>ADMIN_PASSWORD</code> environment variable (in Vercel → Settings → Environment Variables) and redeploy
            to turn this page on.
          </p>
        </Panel>
      </Frame>
    );
  }

  if (!(await isAdmin())) {
    return (
      <Frame>
        <Panel>
          <h1 className="text-2xl font-semibold text-slate-900">Bookings admin</h1>
          <form action={loginAction} className="mt-4 max-w-sm space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2"
              />
            </label>
            {sp.error === "login" && <p className="text-sm text-red-600">That password didn&rsquo;t match.</p>}
            <button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700">
              Sign in
            </button>
          </form>
        </Panel>
      </Frame>
    );
  }

  if (!getStripe()) {
    return (
      <Frame>
        <Panel>
          <h1 className="text-2xl font-semibold text-slate-900">Bookings admin</h1>
          <p className="mt-2 text-slate-600">
            Add your <code>STRIPE_SECRET_KEY</code> environment variable to start taking bookings.
          </p>
        </Panel>
      </Frame>
    );
  }

  let bookings = [];
  let loadFailed = false;
  try {
    bookings = await listBookings();
  } catch (err) {
    console.error("[admin]", err);
    loadFailed = true;
  }

  const now = Date.now();
  const upcoming = bookings.filter((b) => ACTIVE.has(b.status) && b.end >= now).sort((a, b) => a.start - b.start);
  const past = bookings
    .filter((b) => !upcoming.includes(b) && b.status !== "hold" && b.status !== "expired")
    .sort((a, b) => b.start - a.start)
    .slice(0, 50);

  return (
    <Frame>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">Bookings</h1>
        <form action={logoutAction}>
          <button type="submit" className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </form>
      </div>
      <SetupStatus />

      {sp.done && (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          {sp.done} was cancelled. Any payment was refunded in full and the bikes are free again.
        </p>
      )}
      {sp.error === "cancel" && (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          Couldn&rsquo;t cancel that booking. Try again, or refund it from the Stripe dashboard (a full refund frees the bikes).
        </p>
      )}
      {loadFailed && (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          Couldn&rsquo;t load bookings from Stripe. Check the server logs and your STRIPE_SECRET_KEY.
        </p>
      )}

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Upcoming ({upcoming.length})</h2>
        {upcoming.length ? (
          <ul className="space-y-3">
            {upcoming.map((b) => (
              <BookingItem key={b.id} b={b} />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No upcoming bookings yet.</p>
        )}
      </section>

      {past.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Past &amp; refunded</h2>
          <ul className="space-y-3">
            {past.map((b) => (
              <BookingItem key={b.id} b={b} />
            ))}
          </ul>
        </section>
      )}
    </Frame>
  );
}
