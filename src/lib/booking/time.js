// Hawaii time helpers. Hawaii doesn't observe daylight saving, so a fixed
// UTC-10 offset is exact year-round.

export const TIME_ZONE = "Pacific/Honolulu";
const OFFSET_MS = -10 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

// "2026-10-04" + "09:00" (Hawaii) -> epoch ms, or null if invalid.
export function hawaiiToMs(dateStr, timeStr = "00:00") {
  if (!DATE_RE.test(dateStr || "") || !TIME_RE.test(timeStr || "")) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);
  const utc = Date.UTC(y, m - 1, d, hh, mm);
  // Reject dates that roll over, like 2026-02-31.
  if (new Date(utc).getUTCDate() !== d) return null;
  return utc - OFFSET_MS;
}

// Epoch ms -> "YYYY-MM-DD" in Hawaii.
export function hawaiiDateStr(ms) {
  return new Date(ms + OFFSET_MS).toISOString().slice(0, 10);
}

export function addDays(dateStr, n) {
  const ms = hawaiiToMs(dateStr);
  return ms == null ? null : hawaiiDateStr(ms + n * DAY_MS);
}

// "13:00" -> "1:00 PM"
export function timeLabel(timeStr) {
  const [hh, mm] = timeStr.split(":").map(Number);
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${hh < 12 ? "AM" : "PM"}`;
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE, weekday: "short", month: "short", day: "numeric", year: "numeric",
});
const shortDateFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE, weekday: "short", month: "short", day: "numeric",
});
const clockFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE, hour: "numeric", minute: "2-digit",
});

export const formatDate = (ms) => dateFmt.format(ms);
export const formatShortDate = (ms) => shortDateFmt.format(ms);
export const formatClock = (ms) => clockFmt.format(ms);

// "Sat, Oct 4, 2026 · 9:00 AM – 1:00 PM" or
// "Sat, Oct 4, 9:00 AM → Mon, Oct 6, 9:00 AM"
export function formatRange(startMs, endMs) {
  if (hawaiiDateStr(startMs) === hawaiiDateStr(endMs)) {
    return `${formatDate(startMs)} · ${formatClock(startMs)} – ${formatClock(endMs)}`;
  }
  return `${formatShortDate(startMs)}, ${formatClock(startMs)} → ${formatShortDate(endMs)}, ${formatClock(endMs)}`;
}

export function formatMoney(cents) {
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}
