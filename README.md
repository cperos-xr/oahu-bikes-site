# Oahu.BIKE

Next.js site for Oahu.BIKE e-bike rentals, with its own booking system
(Stripe Checkout, no Peek/FareHarbor).

```bash
npm install
cp .env.example .env.local   # add your Stripe test key
npm run dev                  # http://localhost:3000
```

## How booking works

- **`/book`** is the booking page (hotel pages embed the same form). Customers pick
  a rental, date, time, number of bikes and a pickup spot, then pay on Stripe's hosted
  checkout page.
- **Stripe is the database.** Each booking is a Stripe Checkout Session with the booking
  details in its metadata, so there's nothing else to host or keep in sync.
- **No overbooking:** availability is checked live, and bikes are held for 30 minutes
  while someone is in checkout. If two people pay for the last bikes at the same instant,
  the later payment is refunded automatically and both of you get told.
- **`/book/confirmed`** shows the customer their booking; Stripe emails the receipt.
- **`/admin`** (password protected) lists upcoming bookings with name, phone and email,
  and has a one-click **Cancel & refund**. Refunding a payment in the Stripe dashboard
  also frees the bikes.

Prices, fleet size, pickup spots, pickup hours, lead time, blackout dates and rental
terms all live in [`src/lib/booking/config.js`](src/lib/booking/config.js).

## Setup (one time)

No Stripe products are needed — prices come from `config.js`.

1. **Stripe API key.** Stripe Dashboard → Developers → API keys. Add
   `STRIPE_SECRET_KEY` to Vercel (Project → Settings → Environment Variables).
   Start with the `sk_test_…` key.
2. **Webhook.** Stripe Dashboard → Developers → Webhooks → Add endpoint:
   - URL: `https://oahu.bike/api/stripe/webhook`
   - Events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`
   - Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
3. **Admin password.** Set `ADMIN_PASSWORD` to something long.
4. **Site URL.** Set `SITE_URL=https://oahu.bike`.
5. **Stripe emails.** Settings → Customer emails → turn on *Successful payments*
   (customer receipts). Your profile → Notifications → turn on *Successful payments*
   (you get an email per booking).
6. **Payment methods (optional).** Settings → Payment methods: Apple Pay and Google Pay
   work automatically; you can also turn on Cash App Pay, Link, etc.
7. Redeploy, make a test booking with card `4242 4242 4242 4242`, check `/admin`, then
   cancel it there.
8. **Go live:** repeat steps 1–2 with your live key and a live-mode webhook, and redeploy.

### Optional: booking emails

With [Resend](https://resend.com) connected, customers get a confirmation with pickup
details and you get an alert with their phone number for every booking, auto-refund and
cancellation. Verify the `oahu.bike` domain in Resend, then set `RESEND_API_KEY`,
`BOOKING_EMAIL_FROM` (e.g. `Oahu.BIKE <bookings@oahu.bike>`) and `BOOKING_NOTIFY_EMAIL`.

## Day to day

- New booking → you get an email (Stripe, plus Resend if set up) → text the customer the
  lockbox code and pin before pickup. `/admin` has everything in pickup order.
- Customer cancels → `/admin` → **Cancel & refund**.
- Bike in the shop or a day off → add an entry to `BLACKOUTS` in `config.js`, push.
