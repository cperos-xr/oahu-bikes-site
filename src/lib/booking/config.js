// Booking configuration — the one file to edit for prices, fleet size,
// pickup spots, hours, and blackout dates. Shared by the browser widget and
// the server, so never put secrets here.

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@oahu.bike";

// Total bikes that can be out at the same time.
export const FLEET_SIZE = 6;

// Prices are in cents, per bike.
export const RENTALS = {
  "half-day": {
    id: "half-day",
    label: "Half-Day",
    blurb: "4 hours of riding",
    hours: 4,
    pricePerBike: 3500,
    priceUnit: "/ bike",
  },
  "full-day": {
    id: "full-day",
    label: "24-Hour",
    blurb: "24 hours from pickup",
    hours: 24,
    pricePerBike: 6000,
    priceUnit: "/ bike",
  },
  "multi-day": {
    id: "multi-day",
    label: "Multi-Day",
    blurb: "2+ days, best value",
    pricePerBikePerDay: 5000,
    priceUnit: "/ bike / day",
    minDays: 2,
    maxDays: 14,
  },
};

export const RENTAL_ORDER = ["half-day", "full-day", "multi-day"];

// Pickup start times offered each day (24h "HH:MM", Hawaii time).
export const PICKUP_TIMES = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
];

// How far ahead a booking must start, so there's time to stage the bikes.
export const MIN_LEAD_HOURS = 3;
// How far into the future customers can book.
export const MAX_ADVANCE_DAYS = 180;
// Gap kept after every rental for charging / moving bikes.
export const TURNAROUND_MINUTES = 60;
// How long an unpaid checkout holds its bikes (Stripe's minimum is 30).
export const HOLD_MINUTES = 30;

// Public pickup spots are always offered. Partner spots only show up when
// booking from that partner's page (e.g. /hotels/surfjack).
export const LOCATIONS = [
  { id: "mccully", name: "McCully Recreation Center", address: "831 Pumehana St, Honolulu, HI 96826" },
  { id: "magic-island", name: "Magic Island", address: "Ala Moana Blvd Park, Honolulu, HI 96814" },
  { id: "kaimana", name: "Hau Tree / Kaimana Beach", address: "2777 Kalākaua Ave, Honolulu, HI 96815" },
  { id: "san-souci", name: "San Souci", address: "Kalākaua Ave & Monsarrat Ave, Honolulu, HI 96815" },
  { id: "surfjack", name: "Surfjack Hotel & Swim Club", address: "412 Lewers St, Honolulu, HI 96815", partner: true },
  { id: "whitesands", name: "White Sands Hotel", address: "2426 Kuhio Ave, Honolulu, HI 96815", partner: true },
  { id: "monarch", name: "The Monarch Hotel", address: "444 Niu St, Honolulu, HI 96815", partner: true },
];

// Days when fewer (or no) bikes can be booked — maintenance, holidays,
// a private rental you arranged by text, etc. Dates are inclusive, Hawaii
// time. `bikes` defaults to the whole fleet.
//   { start: "2026-12-24", end: "2026-12-25", bikes: 6, note: "Christmas" },
export const BLACKOUTS = [];

// Shown next to the "I agree" checkbox. Review and adjust to your policies.
export const RENTAL_TERMS = [
  "Free cancellation up to 24 hours before pickup — email us and we'll refund you in full.",
  "Riders must be 18 or older. Helmets are provided; please wear them.",
  "Always lock the bike with the included U-lock. You're responsible for the bike while it's with you.",
  "Please return on time to the same spot. Late returns may be charged for the extra time.",
  "If anything goes wrong on our end, we'll refund you in full.",
];

// The partner's own spot comes first on its page.
export function locationsFor(partner) {
  const own = LOCATIONS.filter((l) => l.partner && l.id === partner);
  return [...own, ...LOCATIONS.filter((l) => !l.partner)];
}

export function getLocation(id) {
  return LOCATIONS.find((l) => l.id === id);
}
