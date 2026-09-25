import { NextResponse } from "next/server";
import { FLEET_SIZE } from "@/lib/booking/config";
import { blackoutIntervals } from "@/lib/booking/availability";
import { busyIntervals, getStripe, listBookings } from "@/lib/booking/stripe-bookings";

export const dynamic = "force-dynamic";

// Busy windows only (start, end, bike count) — never customer details.
export async function GET(request) {
  const now = Date.now();
  const noStore = { headers: { "Cache-Control": "no-store" } };

  if (!getStripe()) {
    return NextResponse.json({ configured: false, fleetSize: FLEET_SIZE, now, busy: blackoutIntervals() }, noStore);
  }

  try {
    const client = new URL(request.url).searchParams.get("client");
    const busy = busyIntervals(await listBookings(), { excludeClientId: client }).filter((i) => i.end > now);
    return NextResponse.json({ configured: true, fleetSize: FLEET_SIZE, now, busy }, noStore);
  } catch (err) {
    console.error("[availability]", err);
    return NextResponse.json({ error: "Couldn't load availability." }, { status: 502 });
  }
}
