"use client";

import React from "react";
import {
  Bike,
  Calendar,
  MapPin,
  Lock,
  Smartphone,
  Hotel,
  KeySquare,
  Ship,
  Image as ImageIcon,
  Waves,
  ThumbsUp,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Oahu.BIKE Landing Page
 * - Hotel-first model (primary): partners store bikes on-site and earn a cut of bookings at their location
 * - Secondary model: designated pickup/return spots around Waikīkī
 * - Contactless unlock via KEY LOCKBOX (like Airbnb) — no QR unlocks
 * - No references to FareHarbor. Generic BOOK_URL env fits Peek Pro later
 *
 * THEME: quickly try alternate color schemes by changing `ACTIVE_THEME` below.
 * (We pre-declare all classes to satisfy Tailwind's purge/safelist.)
 */

// Config (env vars if present, otherwise sensible defaults)
const BOOK_URL = process.env.NEXT_PUBLIC_BOOK_URL || "https://book.oahu.bike"; // point this to Peek Pro once ready
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@oahu.bike";

// ---- Theme system ---------------------------------------------------------
// Pick one of: "ocean" | "sunset" | "taro"
const ACTIVE_THEME = "ocean";

const THEMES = {
  ocean: {
    // sky/teal
    bgGrad: "from-sky-50 via-white to-teal-50",
    brand: "text-sky-700",
    brandIcon: "text-sky-500",
    cta: "bg-sky-600 hover:bg-sky-700",
    ctaOutline: "border-sky-300 text-sky-700",
    border: "border-sky-100",
    chip: "bg-white/80",
  },
  sunset: {
    // orange/rose
    bgGrad: "from-rose-50 via-white to-orange-50",
    brand: "text-orange-700",
    brandIcon: "text-orange-500",
    cta: "bg-orange-600 hover:bg-orange-700",
    ctaOutline: "border-orange-300 text-orange-700",
    border: "border-orange-100",
    chip: "bg-white/80",
  },
  taro: {
    // fuchsia/violet (subtle purple alternative)
    bgGrad: "from-fuchsia-50 via-white to-violet-50",
    brand: "text-violet-700",
    brandIcon: "text-fuchsia-500",
    cta: "bg-violet-600 hover:bg-violet-700",
    ctaOutline: "border-violet-300 text-violet-700",
    border: "border-violet-100",
    chip: "bg-white/80",
  },
};

const T = THEMES[ACTIVE_THEME];

export default function OahuBikeLanding() {
  return (
    <main className={`min-h-screen bg-gradient-to-b ${T.bgGrad} text-slate-800`}>
      {/* Tailwind safelist helper — do not remove */}
      <div className="hidden">
        from-sky-50 via-white to-teal-50 text-sky-700 text-sky-500 bg-sky-600 hover:bg-sky-700 border-sky-300 border-sky-100
        from-rose-50 to-orange-50 text-orange-700 text-orange-500 bg-orange-600 hover:bg-orange-700 border-orange-300 border-orange-100
        from-fuchsia-50 to-violet-50 text-violet-700 text-fuchsia-500 bg-violet-600 hover:bg-violet-700 border-violet-300 border-violet-100
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className={`h-6 w-6 ${T.brandIcon}`} />
            <span className="font-semibold tracking-wide text-slate-900">Oahu.BIKE</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#rentals" className={`hover:${T.brand.replace("text-", "text-")}`}>Rentals</a>
            <a href="#how" className={`hover:${T.brand.replace("text-", "text-")}`}>How it works</a>
            <a href="#hotels" className={`hover:${T.brand.replace("text-", "text-")}`}>Partner Hotels</a>
            <a href="#pickup" className={`hover:${T.brand.replace("text-", "text-")}`}>Pickup</a>
            <a href="#faq" className={`hover:${T.brand.replace("text-", "text-")}`}>FAQ</a>
            <a href="#gallery" className={`hover:${T.brand.replace("text-", "text-")}`}>Gallery</a>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild className={`${T.cta} rounded-2xl`}>
              <a href={BOOK_URL} target="_blank" rel="noreferrer">Book now</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Large bicycle background icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Bike className="w-96 h-96 md:w-[500px] md:h-[500px] text-slate-100/40 rotate-12" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-slate-900">
              Easy E‑Bike Rentals in Honolulu
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Reserve online, get a lockbox code by text, and ride at your own pace. 
              Stay at a partner hotel? Pick up your bike right on‑site.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className={`${T.cta} rounded-2xl`}>
                <a href={BOOK_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Book your ride
                </a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2"><Bike className={`${T.brandIcon} h-4 w-4`} /> Foldable RadExpand 5</div>
              <div className="flex items-center gap-2"><Lock className={`${T.brandIcon} h-4 w-4`} /> U‑lock included</div>
              <div className="flex items-center gap-2"><KeySquare className={`${T.brandIcon} h-4 w-4`} /> Key lockbox access</div>
            </div>
          </div>

          <div className="relative">
            {/* Main scenic image */}
            <div
              aria-hidden="true"
              role="presentation"
              className="aspect-[4/3] rounded-3xl shadow-xl bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1465310477141-6fb93167a273?q=80&w=1400&auto=format&fit=crop')",
              }}
            />
            {/* Front info chip */}
            <div className={`absolute -bottom-4 -left-4 ${T.chip} backdrop-blur rounded-2xl shadow p-4 flex items-center gap-3 z-10`}>
              <Star className="h-5 w-5 text-amber-500" />
              <span className="text-sm">Hotel guests: grab & go at the lobby bike rack</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rentals */}
      <section id="rentals" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Simple pricing</h2>
          <p className="text-slate-600 mt-2">Day rentals with optional hotel delivery. Helmets and locks included.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className={`rounded-3xl ${T.border}`}>
            <CardHeader><CardTitle>Full‑Day Rental</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-semibold">$60<span className="text-base font-normal text-slate-500"> / day</span></p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>Unlimited miles</li>
                <li>Helmet, U‑lock included</li>
                <li>Hotel or pickup options</li>
                <li>Flexible scheduling available</li>
              </ul>
              <Button asChild className={`w-full ${T.cta} rounded-2xl`}>
                <a href={BOOK_URL} target="_blank" rel="noreferrer">Reserve now</a>
              </Button>
            </CardContent>
          </Card>

          <Card className={`rounded-3xl ${T.border}`}>
            <CardHeader><CardTitle>Multi‑Day</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-semibold">$50<span className="text-base font-normal text-slate-500"> / day</span></p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>2+ days, save more</li>
                <li>Charger included</li>
                <li>Night storage tips</li>
                <li>Flexible scheduling available</li>
              </ul>
              <Button asChild className={`w-full ${T.cta} rounded-2xl`}>
                <a href={BOOK_URL} target="_blank" rel="noreferrer">See availability</a>
              </Button>
            </CardContent>
          </Card>

          <Card className={`rounded-3xl relative overflow-hidden ${T.border}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
            <CardHeader><CardTitle>Hotel Delivery</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-semibold">$35<span className="text-base font-normal text-slate-500"> flat</span></p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>Drop‑off at lobby or curb</li>
                <li>Waikīkī & nearby areas</li>
                <li>Schedule at checkout</li>
              </ul>
              <Button asChild variant="outline" className={`w-full rounded-2xl ${T.ctaOutline}`}>
                <a href={BOOK_URL} target="_blank" rel="noreferrer">Add delivery</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works — hotel‑first */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8">How it works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Hotel, title: "Stay & Reserve", text: "Pick your partner hotel location and time online." },
            { icon: KeySquare, title: "Contactless Unlock", text: "We text a lockbox code. Grab the key, helmet & U‑lock." },
            { icon: MapPin, title: "Ride", text: "Follow our scenic routes or explore at your pace." },
            { icon: Lock, title: "Return", text: "Lock up in the designated rack and drop key back in lockbox." },
          ].map((s, i) => (
            <Card key={i} className={`rounded-3xl ${T.border}`}>
              <CardContent className="pt-6">
                <s.icon className={`h-6 w-6 ${T.brandIcon}`} />
                <h3 className="mt-3 font-medium">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Partner Hotels */}
      <section id="hotels" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 flex items-center gap-3">
          <ThumbsUp className={T.brandIcon} />
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Partner Hotels</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {["Waikīkī Beachfront", "Ala Moana Area", "Kapiʻolani / McCully"].map((zone, i) => (
            <Card key={i} className={`rounded-3xl ${T.border}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Hotel className={T.brandIcon} /> {zone}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>Pick up directly at the hotel rack. Availability varies by date.</p>
                <Button asChild className={`${T.cta} rounded-2xl`}>
                  <a href={BOOK_URL} target="_blank" rel="noreferrer">Rent Bike at this zone</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-sm text-slate-600">
          Are you a hotel? <a className={`${T.brand} underline`} href="#partner-info">Learn about revenue share</a>.
        </div>
      </section>

      {/* Pickup (secondary model) */}
      <section id="pickup" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Free pickup & return (optional)</h2>
        <p className="text-slate-600 mt-2 max-w-3xl">
          Prefer not to use a partner hotel? Use our designated pickup/return spot near the 7‑Eleven on Kapiʻolani Blvd between Pumehana & McCully. Exact pin shared after booking.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-3xl overflow-hidden shadow border bg-white border-slate-100">
            <iframe
              title="Pickup Map"
              className="w-full h-72 md:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=831+Pumehana+St,+Honolulu,+HI+96826&output=embed"
            />
          </div>
          <Card className={`rounded-3xl ${T.border}`}>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-medium">What to bring</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Photo ID & matching credit card</li>
                <li>Closed‑toe shoes recommended</li>
                <li>Light jacket or sunscreen (trade winds!)</li>
              </ul>
              <h3 className="font-medium pt-2">Safety & security</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Helmets & U‑locks included</li>
                <li>Please bring bikes inside at night</li>
                <li>Return to the specified lock‑up pin</li>
              </ul>
              <div className="pt-2">
                <Button asChild className={`rounded-2xl ${T.cta}`}>
                  <a href={BOOK_URL} target="_blank" rel="noreferrer">Book pickup time</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">FAQ</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className={`rounded-3xl ${T.border}`}>
            <CardContent className="p-6">
              <h3 className="font-medium">Do I need an account to book?</h3>
              <p className="text-sm text-slate-600 mt-1">No — our secure booking page handles everything. Just tap "Book now."</p>
            </CardContent>
          </Card>
          <Card className={`rounded-3xl ${T.border}`}>
            <CardContent className="p-6">
              <h3 className="font-medium">How do I unlock the bike?</h3>
              <p className="text-sm text-slate-600 mt-1">You’ll receive a text with your key lockbox code. Take the key to release the U‑lock — similar to Airbnb check‑in.</p>
            </CardContent>
          </Card>
          <Card className={`rounded-3xl ${T.border}`}>
            <CardContent className="p-6">
              <h3 className="font-medium">Where do I pick up?</h3>
              <p className="text-sm text-slate-600 mt-1">If you’re staying at a partner hotel, your bike is on‑site. Otherwise, use our designated pickup spot in town.</p>
            </CardContent>
          </Card>
          <Card className={`rounded-3xl ${T.border}`}>
            <CardContent className="p-6">
              <h3 className="font-medium">Group bookings?</h3>
              <p className="text-sm text-slate-600 mt-1">Yes — we have 6 foldable e‑bikes and can arrange staggered starts.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 flex items-center gap-3">
          <ImageIcon className={T.brandIcon} />
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Gallery</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502999793241-d0b7bfed92d1?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1465310477141-6fb93167a273?q=80&w=400&auto=format&fit=crop",
          ].map((src, i) => (
            <div key={i} className={`aspect-square rounded-2xl overflow-hidden shadow-lg ${i === 4 ? 'md:col-span-2' : ''}`}>
              <div
                className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('${src}')` }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Partner info (for hotels) */}
      <section id="partner-info" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 flex items-center gap-2">
            <Hotel className={T.brandIcon} />
            Hotel Partners: Earn on every booking
          </h2>
          <p className="text-slate-600 mt-3 max-w-3xl">
            We place a small fleet of foldable e‑bikes on‑site. Your team hosts them in a secure rack; we handle maintenance, insurance, and guest support. You earn a revenue share on every booking made for your location.
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-600 mt-4 space-y-1">
            <li>Hands‑off operations — we service, charge, and rotate bikes</li>
            <li>Contactless guest experience with lockbox codes</li>
            <li>Custom QR/poster signage for in‑property promotion</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <Button asChild className={`${T.cta} rounded-2xl`}>
              <a href={`mailto:${CONTACT_EMAIL}?subject=Oahu.BIKE%20Hotel%20Partnership`}>Request partnership deck</a>
            </Button>
            <Button asChild variant="outline" className={`rounded-2xl ${T.ctaOutline}`}>
              <a href="#hotels">See guest experience</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-3 gap-6 items-start">
          <div>
            <div className="flex items-center gap-2">
              <Waves className={`h-5 w-5 ${T.brandIcon}`} />
              <span className="font-semibold">Oahu.BIKE</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">Minimal footprint, maximum fun. See more by e‑bike.</p>
          </div>
          <div className="text-sm">
            <div className="font-medium">Contact</div>
            <a className={`${T.brand} block hover:underline`} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <div className="text-sm">
            <div className="font-medium">Book</div>
            <a className={`${T.brand} block hover:underline`} href={BOOK_URL} target="_blank" rel="noreferrer">Go to booking page</a>
          </div>
        </div>
        <div className="text-xs text-center text-slate-500 pb-6">© {new Date().getFullYear()} Oahu.BIKE. All rights reserved.</div>
      </footer>
    </main>
  );
}
