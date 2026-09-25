import { NextResponse } from "next/server";
import { APP_TAG, finalizeBooking, getStripe } from "@/lib/booking/stripe-bookings";
import { originFromRequest } from "@/lib/booking/server-utils";

export const dynamic = "force-dynamic";

const PAID_EVENTS = new Set(["checkout.session.completed", "checkout.session.async_payment_succeeded"]);

export async function POST(request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), request.headers.get("stripe-signature"), secret);
  } catch (err) {
    return NextResponse.json({ error: `Bad signature: ${err.message}` }, { status: 400 });
  }

  const session = event.data.object;
  if (PAID_EVENTS.has(event.type) && session?.metadata?.app === APP_TAG) {
    try {
      await finalizeBooking(session.id, { origin: originFromRequest(request) });
    } catch (err) {
      // A 500 makes Stripe retry later.
      console.error("[webhook]", event.type, session.id, err);
      return NextResponse.json({ error: "Failed to process booking" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
