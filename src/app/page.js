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
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Interactive Gallery Component
function GalleryComponent() {
  const [featuredImage, setFeaturedImage] = React.useState(0);
  
  const images = [
    "/jazzy.png",
    "/punky.png", 
    "/rocky.png",
    "/simpy.png",
    "/splatty.png",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1465310477141-6fb93167a273?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
  ];

  const handleImageClick = (index) => {
    setFeaturedImage(index);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Featured Large Image - Left Half */}
      <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
        <div
          className="w-full h-full bg-cover bg-center cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `url('${images[featuredImage]}')` }}
        />
      </div>
      
      {/* Thumbnail Grid - Right Half */}
      <div className="grid grid-cols-2 gap-4">
        {images.filter((_, i) => i !== featuredImage).slice(0, 4).map((src, i) => {
          const originalIndex = images.findIndex(img => img === src);
          return (
            <div 
              key={originalIndex} 
              className="aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => handleImageClick(originalIndex)}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${src}')` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
            <Bike className={`h-6 w-6 ${T.brandIcon}`} />
            <span className="font-semibold tracking-wide text-slate-900">Oahu.BIKE</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className={`hover:${T.brand.replace("text-", "text-")}`}>How it works</a>
            <a href="#rentals" className={`hover:${T.brand.replace("text-", "text-")}`}>Rentals</a>
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
        {/* Subtle background pattern */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="grid grid-cols-4 gap-8 rotate-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <Bike key={i} className="w-12 h-12 text-slate-300" />
            ))}
          </div>
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
      <section id="rentals" className="bg-slate-50/50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Simple pricing</h2>
            <p className="text-slate-600 mt-2">Day rentals with optional hotel delivery. Helmets and locks included.</p>
          </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className={`rounded-3xl relative overflow-hidden ${T.border}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
            <CardHeader><CardTitle>Half‑Day Rental</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-semibold">$35<span className="text-base font-normal text-slate-500"> / half day</span></p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>4 hours of riding time</li>
                <li>Perfect for beach & downtown</li>
                <li>Same great bikes & gear</li>
                <li>Morning or afternoon slots</li>
              </ul>
              <Button asChild className={`w-full ${T.cta} rounded-2xl`}>
                <a href="#booking">Book Now</a>
              </Button>
            </CardContent>
          </Card>

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
                <a href="#booking">Book Now</a>
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
                <a href="#booking">Book Now</a>
              </Button>
            </CardContent>
          </Card>
          </div>
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

      {/* Main Booking Section */}
      <section id="booking" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Book Your E-Bike Adventure</h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Choose your rental duration and we&rsquo;ll get you set up with the perfect e-bike experience in Honolulu.
          </p>
        </div>
        
        <Card className={`rounded-3xl ${T.border} max-w-4xl mx-auto bg-white shadow-lg`}>
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">Reserve Your E-Bike</h3>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <p className={`${T.brand} mb-4 text-lg`}>
                  🚀 Peek Pro booking system integration coming soon!
                </p>
                <p className="text-sm text-slate-600 mb-6">
                  Select your preferred rental duration above, then complete your booking here. 
                  The system will automatically set up your half-day, full-day, or multi-day rental.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Button 
                    className={`${T.cta} rounded-2xl flex items-center justify-center gap-2`}
                  >
                    <Calendar className="h-4 w-4" />
                    Half-Day ($35)
                  </Button>
                  <Button 
                    className={`${T.cta} rounded-2xl flex items-center justify-center gap-2`}
                  >
                    <Calendar className="h-4 w-4" />
                    Full-Day ($60)
                  </Button>
                  <Button 
                    className={`${T.cta} rounded-2xl flex items-center justify-center gap-2`}
                  >
                    <Calendar className="h-4 w-4" />
                    Multi-Day ($50/day)
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  ✓ Contactless pickup ✓ Helmets & U-locks included ✓ Flexible scheduling
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
            ></iframe>
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

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 flex items-center gap-3">
          <ImageIcon className={T.brandIcon} />
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Gallery</h2>
        </div>
        <GalleryComponent />
      </section>


      {/* U-Lock Tutorial Video */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">How to Use Your U-Lock</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Proper locking technique is essential for bike security. Watch this quick tutorial 
            to learn the most effective way to secure your e-bike.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className={`rounded-3xl ${T.border} overflow-hidden`}>
            <CardContent className="p-0">
              <div className="aspect-video bg-slate-900 relative">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Vw9erXJvByE"
                  title="How to Use a U-Lock Properly"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className={`h-5 w-5 ${T.brandIcon}`} />
                  <h3 className="font-medium">Essential Security Tips</h3>
                </div>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Always lock your bike frame AND wheel to a secure rack</li>
                  <li>• Use the smallest U-lock setting to minimize leverage space</li>
                  <li>• Position the keyhole facing down to prevent tampering</li>
                  <li>• Never leave bikes unattended for extended periods</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Partner Hotels */}
      <section id="hotels" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Partner Hotels</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Surfjack Hotel & Swim Club",
              location: "Waikīkī",
              description: "Retro-modern boutique hotel with vibrant local art and poolside vibes",
              slug: "surfjack",
              featured: true
            },
            {
              name: "White Sands Hotel",
              location: "Waikīkī Beach", 
              description: "Stylish beachfront hotel with tropical modern design",
              slug: "whitesands",
              featured: true
            },
            {
              name: "The Monarch Hotel",
              location: "Waikīkī",
              description: "Contemporary hotel with rooftop bar and city views",
              slug: "monarch",
              featured: false
            }
          ].map((hotel, i) => (
            <Card key={i} className={`rounded-3xl ${T.border}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hotel className={T.brandIcon} /> 
                  <div>
                    <div className="text-base">{hotel.name}</div>
                    <div className="text-xs text-slate-500 font-normal">{hotel.location}</div>
                  </div>
                  {hotel.featured && (
                    <span className={`ml-auto text-xs px-2 py-1 rounded-full bg-${T.brandIcon.replace('text-', 'bg-')}/10 text-${T.brandIcon.replace('text-', 'text-')}`}>
                      Popular
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600">{hotel.description}</p>
                <div className="flex gap-2">
                  <Button asChild className={`w-full ${T.cta} rounded-2xl text-sm`}>
                    <a href={`/hotels/${hotel.slug}`}>View Hotel Page & Book</a>
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  ✓ On-site bike pickup ✓ Contactless unlock ✓ Integrated booking
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-100">
          <h3 className="font-medium text-slate-900 mb-2">Hotel-Specific Experience</h3>
          <p className="text-sm text-slate-600 mb-3">
            Each partner hotel has its own dedicated booking page with custom branding, specific pickup instructions, and local recommendations.
          </p>
          <div className="text-sm text-slate-600">
            Are you a hotel? <a className={`${T.brand} underline`} href="#partner-info">Learn about revenue share</a>.
          </div>
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
              <Bike className={`h-5 w-5 ${T.brandIcon}`} />
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
