// Pure pricing + availability logic, shared by the booking widget (for
// instant feedback) and the server (which re-checks before taking money).

import {
  BLACKOUTS,
  FLEET_SIZE,
  MAX_ADVANCE_DAYS,
  MIN_LEAD_HOURS,
  PICKUP_TIMES,
  RENTALS,
  TURNAROUND_MINUTES,
  locationsFor,
} from "./config";
import { addDays, hawaiiDateStr, hawaiiToMs } from "./time";

const HOUR_MS = 60 * 60 * 1000;

// Validates a booking request and prices it. Returns { error } or a quote.
// `now` is passed in so the browser can use the server's clock.
export function buildQuote({ rental, date, time, days, bikes, location, partner }, now = Date.now()) {
  const r = RENTALS[rental];
  if (!r) return { error: "Please choose a rental type." };

  const start = PICKUP_TIMES.includes(time) ? hawaiiToMs(date, time) : null;
  if (start == null) return { error: "Please choose a pickup date and time." };

  const bikeCount = Number(bikes);
  if (!Number.isInteger(bikeCount) || bikeCount < 1 || bikeCount > FLEET_SIZE) {
    return { error: `You can book between 1 and ${FLEET_SIZE} bikes.` };
  }

  let dayCount = 1;
  let pricePerBike = r.pricePerBike;
  if (rental === "multi-day") {
    dayCount = Number(days);
    if (!Number.isInteger(dayCount) || dayCount < r.minDays || dayCount > r.maxDays) {
      return { error: `Multi-day rentals are ${r.minDays}–${r.maxDays} days.` };
    }
    pricePerBike = r.pricePerBikePerDay * dayCount;
  }

  const loc = locationsFor(partner).find((l) => l.id === location);
  if (!loc) return { error: "Please choose a pickup spot." };

  const tooSoon = checkStartTime(start, now);
  if (tooSoon) return { error: tooSoon };

  return {
    rental,
    rentalLabel: rental === "multi-day" ? `${r.label} (${dayCount} days)` : r.label,
    start,
    end: start + rentalHours(rental, dayCount) * HOUR_MS,
    days: dayCount,
    bikes: bikeCount,
    location: loc,
    pricePerBike,
    total: pricePerBike * bikeCount,
  };
}

export function rentalHours(rental, days) {
  return rental === "multi-day" ? Number(days) * 24 : RENTALS[rental].hours;
}

// Returns an error message if a pickup time is outside the booking window.
export function checkStartTime(start, now = Date.now()) {
  if (start < now + MIN_LEAD_HOURS * HOUR_MS) {
    return `Pickups need to be booked at least ${MIN_LEAD_HOURS} hours ahead.`;
  }
  const lastDay = addDays(hawaiiDateStr(now), MAX_ADVANCE_DAYS);
  if (hawaiiDateStr(start) > lastDay) {
    return `We take bookings up to ${MAX_ADVANCE_DAYS} days ahead.`;
  }
  return null;
}

// The time a rental ties up its bikes, including the turnaround gap.
export function occupancy(start, end) {
  return { start, end: end + TURNAROUND_MINUTES * 60 * 1000 };
}

export function blackoutIntervals() {
  return BLACKOUTS.map((b) => ({
    start: hawaiiToMs(b.start),
    end: hawaiiToMs(addDays(b.end, 1)),
    bikes: b.bikes ?? FLEET_SIZE,
  })).filter((b) => b.start != null && b.end != null);
}

// Peak number of bikes in use at any moment within [start, end).
// `intervals` are [{ start, end, bikes }] occupancy windows.
export function peakBikesInUse(intervals, start, end) {
  const events = [];
  for (const i of intervals) {
    if (i.start < end && i.end > start) {
      events.push([Math.max(i.start, start), i.bikes]);
      events.push([Math.min(i.end, end), -i.bikes]);
    }
  }
  // At equal times, returns free bikes before pickups take them.
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let inUse = 0;
  let peak = 0;
  for (const [, delta] of events) {
    inUse += delta;
    peak = Math.max(peak, inUse);
  }
  return peak;
}

export function bikesAvailable(intervals, start, end, fleetSize = FLEET_SIZE) {
  const window = occupancy(start, end);
  return Math.max(0, fleetSize - peakBikesInUse(intervals, window.start, window.end));
}
