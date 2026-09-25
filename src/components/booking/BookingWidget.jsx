"use client";

import React from "react";
import { AlertCircle, Check, Loader2, Lock, MapPin, Minus, Plus } from "lucide-react";
import {
  CONTACT_EMAIL,
  FLEET_SIZE,
  MAX_ADVANCE_DAYS,
  PICKUP_TIMES,
  RENTALS,
  RENTAL_ORDER,
  RENTAL_TERMS,
  locationsFor,
} from "@/lib/booking/config";
import { bikesAvailable, buildQuote, checkStartTime, rentalHours } from "@/lib/booking/availability";
import { addDays, formatMoney, formatRange, hawaiiDateStr, hawaiiToMs, timeLabel } from "@/lib/booking/time";

const HOUR_MS = 60 * 60 * 1000;
const CLIENT_KEY = "ob_client_id";
const SELECTION_KEY = "ob_booking_selection";

const DEFAULT_THEME = {
  cta: "bg-sky-600 hover:bg-sky-700 text-white",
  ctaStyle: undefined,
  selected: "border-sky-500 bg-sky-50 ring-2 ring-sky-200",
  accent: "text-sky-600",
};

// A random id per browser, so someone who backs out of Stripe checkout isn't
// blocked by their own unpaid hold when they try again.
function getClientId() {
  try {
    let id = localStorage.getItem(CLIENT_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(CLIENT_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

function readSavedSelection() {
  try {
    return JSON.parse(sessionStorage.getItem(SELECTION_KEY) || "null");
  } catch {
    return null;
  }
}

function saveSelection(selection) {
  try {
    sessionStorage.setItem(SELECTION_KEY, JSON.stringify(selection));
  } catch {}
}

function Step({ n, title, children }) {
  return (
    <section>
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-white">{n}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function Stepper({ value, min, max, onChange, format }) {
  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="flex items-center gap-3">
      <button type="button" aria-label="Fewer" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)}>
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-[5.5rem] text-center font-medium" aria-live="polite">{format(value)}</span>
      <button type="button" aria-label="More" className={btn} disabled={value >= max} onClick={() => onChange(value + 1)}>
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function Notice({ tone = "info", children }) {
  const tones = {
    info: "border-sky-200 bg-sky-50 text-sky-900",
    warn: "border-amber-200 bg-amber-50 text-amber-900",
  };
  return (
    <div className={`flex items-start gap-2 rounded-2xl border p-4 text-sm ${tones[tone]}`}>
      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
}

/**
 * Self-contained booking form. Shows live availability, then hands off to
 * Stripe Checkout. The server re-checks everything before charging.
 *
 * Props: initialRental / initialLocation preselect options, `partner` adds a
 * partner hotel's pickup spot (and credits the booking to it), `cancelled`
 * restores the last selection after backing out of checkout, and `theme`
 * overrides the accent classes to match a partner page.
 */
export default function BookingWidget({ initialRental, initialLocation, partner, cancelled = false, theme: themeOverride }) {
  const theme = { ...DEFAULT_THEME, ...themeOverride };
  const locations = locationsFor(partner);
  const multi = RENTALS["multi-day"];

  const [rental, setRental] = React.useState(RENTALS[initialRental] ? initialRental : "half-day");
  const [days, setDays] = React.useState(multi.minDays);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [bikes, setBikes] = React.useState(1);
  const [location, setLocation] = React.useState(
    locations.find((l) => l.id === (initialLocation || partner))?.id || locations[0].id
  );
  const [agreed, setAgreed] = React.useState(false);
  const [avail, setAvail] = React.useState(null);
  const [loadError, setLoadError] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const clientIdRef = React.useRef(null);

  const loadAvailability = React.useCallback(async () => {
    setLoadError(false);
    try {
      const qs = clientIdRef.current ? `?client=${encodeURIComponent(clientIdRef.current)}` : "";
      const res = await fetch(`/api/availability${qs}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      // Remember the server/browser clock difference so "too soon" matches the server.
      setAvail({ ...data, skew: data.now - Date.now() });
    } catch {
      setLoadError(true);
    }
  }, []);

  React.useEffect(() => {
    clientIdRef.current = getClientId();
    const saved = cancelled ? readSavedSelection() : null;
    if (saved) {
      if (RENTALS[saved.rental]) setRental(saved.rental);
      if (Number.isInteger(saved.days)) setDays(Math.min(multi.maxDays, Math.max(multi.minDays, saved.days)));
      if (typeof saved.date === "string") setDate(saved.date);
      if (PICKUP_TIMES.includes(saved.time)) setTime(saved.time);
      if (Number.isInteger(saved.bikes)) setBikes(saved.bikes);
      if (locations.some((l) => l.id === saved.location)) setLocation(saved.location);
    }
    loadAvailability();
    // Mount-only: restore once, then load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Coming back from Stripe with the browser's back button restores this page
  // from cache; re-enable the button and refresh availability.
  React.useEffect(() => {
    const onShow = (e) => {
      if (e.persisted) {
        setSubmitting(false);
        loadAvailability();
      }
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, [loadAvailability]);

  const now = avail ? Date.now() + avail.skew : null;
  const today = avail ? hawaiiDateStr(avail.now) : "";
  const fleetSize = avail?.fleetSize ?? FLEET_SIZE;

  // Default to today, or tomorrow once today's pickups have passed.
  React.useEffect(() => {
    if (!avail || date) return;
    const t = hawaiiDateStr(avail.now);
    const anyLeftToday = PICKUP_TIMES.some((p) => !checkStartTime(hawaiiToMs(t, p), avail.now));
    setDate(anyLeftToday ? t : addDays(t, 1));
  }, [avail, date]);

  const durationMs = rentalHours(rental, days) * HOUR_MS;
  const slots =
    avail && date
      ? PICKUP_TIMES.map((t) => {
          const start = hawaiiToMs(date, t);
          const closed = start == null || Boolean(checkStartTime(start, now));
          const free = closed ? 0 : bikesAvailable(avail.busy, start, start + durationMs, avail.fleetSize);
          return { time: t, free, closed };
        })
      : [];
  const slot = slots.find((s) => s.time === time);
  const quote = avail && time ? buildQuote({ rental, date, time, days, bikes, location, partner }, now) : null;
  const priced = quote && !quote.error ? quote : null;

  let slotMessage = null;
  if (avail && !date) slotMessage = "Choose a pickup date.";
  else if (slots.length && slots.every((s) => s.closed)) slotMessage = "No pickups left on this date — please choose a later one.";
  else if (slots.length && slots.every((s) => s.closed || s.free < bikes)) {
    slotMessage = `Fully booked for ${bikes} bike${bikes === 1 ? "" : "s"} on this date. Try another date${bikes > 1 ? " or fewer bikes" : ""}.`;
  } else if (slot && !slot.closed && slot.free < bikes) {
    slotMessage = `Only ${slot.free} bike${slot.free === 1 ? " is" : "s are"} free at ${timeLabel(slot.time)}. Pick another time or fewer bikes.`;
  } else if (slot?.closed) slotMessage = "That time is no longer available — please pick another.";

  const canSubmit = Boolean(avail?.configured && priced && slot && !slot.closed && slot.free >= bikes && agreed && !submitting);

  async function submit() {
    setSubmitting(true);
    setError("");
    const selection = { rental, days, date, time, bikes, location };
    saveSelection(selection);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selection, partner, clientId: clientIdRef.current, agreed }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      if (data.busy) setAvail((a) => ({ ...a, busy: data.busy }));
      setError(data.error || "Something went wrong. Please try again.");
    } catch {
      setError("Couldn't reach our server. Check your connection and try again.");
    }
    setSubmitting(false);
  }

  return (
    <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-5 text-left text-slate-800 shadow-sm md:p-8">
      {cancelled && <Notice>Checkout cancelled — you weren&rsquo;t charged. Your selections are saved below.</Notice>}
      {avail && !avail.configured && (
        <Notice tone="warn">
          Online payments aren&rsquo;t switched on yet. Email{" "}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we&rsquo;ll reserve your bikes.
        </Notice>
      )}

      <Step n={1} title="Choose your rental">
        <div className="grid gap-3 sm:grid-cols-3">
          {RENTAL_ORDER.map((id) => {
            const r = RENTALS[id];
            const active = rental === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setRental(id)}
                className={`rounded-2xl border p-4 text-left transition ${active ? theme.selected : "border-slate-200 hover:border-slate-300"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{r.label}</span>
                  {active && <Check className={`h-4 w-4 ${theme.accent}`} />}
                </div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">
                  {formatMoney(r.pricePerBike ?? r.pricePerBikePerDay)}
                  <span className="text-sm font-normal text-slate-500"> {r.priceUnit}</span>
                </div>
                <div className="text-sm text-slate-500">{r.blurb}</div>
              </button>
            );
          })}
        </div>
        {rental === "multi-day" && (
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-slate-700">Number of days</span>
            <Stepper value={days} min={multi.minDays} max={multi.maxDays} onChange={setDays} format={(d) => `${d} days`} />
          </div>
        )}
      </Step>

      <Step n={2} title="Pick a date & time">
        <label className="block text-sm font-medium text-slate-700">
          Pickup date
          <input
            type="date"
            value={date}
            min={today || undefined}
            max={today ? addDays(today, MAX_ADVANCE_DAYS) : undefined}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 sm:w-64"
          />
        </label>

        <div className="mt-4">
          <div className="mb-2 text-sm font-medium text-slate-700">
            Pickup time <span className="font-normal text-slate-500">(Hawaii time)</span>
          </div>
          {loadError ? (
            <Notice tone="warn">
              Couldn&rsquo;t load live availability.{" "}
              <button type="button" className="font-medium underline" onClick={loadAvailability}>Try again</button>
            </Notice>
          ) : !avail ? (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking availability…
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {slots.map((s) => {
                const disabled = s.closed || s.free < bikes;
                const active = time === s.time;
                return (
                  <button
                    key={s.time}
                    type="button"
                    aria-pressed={active}
                    disabled={disabled}
                    onClick={() => setTime(s.time)}
                    className={`rounded-xl border px-2 py-2 text-center transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      active ? theme.selected : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-sm font-medium text-slate-900">{timeLabel(s.time)}</div>
                    <div className="text-xs text-slate-500">
                      {s.closed ? "\u00a0" : s.free === 0 ? "Full" : s.free < fleetSize ? `${s.free} left` : "\u00a0"}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          {slotMessage && <p className="mt-3 text-sm text-amber-700">{slotMessage}</p>}
        </div>
      </Step>

      <Step n={3} title="How many bikes?">
        <Stepper value={bikes} min={1} max={fleetSize} onChange={setBikes} format={(n) => `${n} bike${n === 1 ? "" : "s"}`} />
      </Step>

      <Step n={4} title="Pickup spot">
        <div className="grid gap-3 sm:grid-cols-2">
          {locations.map((l) => {
            const active = location === l.id;
            return (
              <button
                key={l.id}
                type="button"
                aria-pressed={active}
                onClick={() => setLocation(l.id)}
                className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                  active ? theme.selected : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <MapPin className={`mt-0.5 h-4 w-4 flex-shrink-0 ${active ? theme.accent : "text-slate-400"}`} />
                <span>
                  <span className="block font-medium text-slate-900">{l.name}</span>
                  <span className="block text-sm text-slate-500">{l.address}</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-slate-500">We text the exact pin and your lockbox code before pickup.</p>
      </Step>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        {priced ? (
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Rental</dt>
              <dd className="text-right font-medium">{priced.rentalLabel}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">When</dt>
              <dd className="text-right font-medium">{formatRange(priced.start, priced.end)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Pickup</dt>
              <dd className="text-right font-medium">{priced.location.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Bikes</dt>
              <dd className="text-right font-medium">
                {priced.bikes} × {formatMoney(priced.pricePerBike)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-slate-200 pt-2 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold">{formatMoney(priced.total)}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-slate-500">{quote?.error || "Pick a pickup time to see your total."}</p>
        )}

        <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4" />
          <span className="font-medium text-slate-800">I agree to the rental terms</span>
        </label>
        <ul className="ml-7 mt-2 list-disc space-y-1 text-xs text-slate-500">
          {RENTAL_TERMS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        {error && (
          <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-red-600">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" /> {error}
          </p>
        )}

        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit}
          style={theme.ctaStyle}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${theme.cta}`}
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Opening secure checkout…
            </>
          ) : (
            <>
              <Lock className="h-5 w-5" /> {priced ? `Reserve & pay ${formatMoney(priced.total)}` : "Reserve & pay"}
            </>
          )}
        </button>
        <p className="mt-2 text-center text-xs text-slate-500">Secure checkout by Stripe · Card, Apple Pay &amp; Google Pay</p>
      </div>
    </div>
  );
}
