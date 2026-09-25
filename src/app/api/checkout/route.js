import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/booking/config";
import { createCheckout, getStripe } from "@/lib/booking/stripe-bookings";
import { originFromRequest } from "@/lib/booking/server-utils";

export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!getStripe()) {
    return NextResponse.json(
      { error: `Online booking isn't switched on yet — email ${CONTACT_EMAIL} and we'll reserve your bikes.` },
      { status: 503 }
    );
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (input?.agreed !== true) {
    return NextResponse.json({ error: "Please agree to the rental terms." }, { status: 400 });
  }

  try {
    const { status = 200, ...body } = await createCheckout(input, originFromRequest(request));
    return NextResponse.json(body, { status });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "We couldn't start checkout. Please try again in a moment." }, { status: 502 });
  }
}
