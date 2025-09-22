"use client";

import React from "react";
import {
  Bike,
  Calendar,
  MapPin,
  Lock,
  ShipWheel,
  Smartphone,
  ArrowRight,
  Waves,
  Sun,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Config (env vars if present, otherwise sensible defaults)
const FAREHARBOR_BOOK_URL =
  process.env.NEXT_PUBLIC_FAREHARBOR_BOOK_URL ||
  "https://fareharbor.com/your-business/items/";
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@oahu.bike";

export default function OahuEbikesLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 text-slate-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-emerald-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6 text-emerald-500" />
            <span className="font-semibold tracking-wide text-slate-900">
              Oahu E-Bikes
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#rentals" className="hover:text-emerald-600">
              Rentals
            </a>
            <a href="#experiences" className="hover:text-emerald-600">
              Curated Drops
            </a>
            <a href="#how" className="hover:text-emerald-600">
              How it works
            </a>
            <a href="#pickup" className="hover:text-emerald-600">
              Pickup
            </a>
            <a href="#faq" className="hover:text-emerald-600">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl"
            >
              <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">
                Book now
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-slate-900">
              Easy, beautiful <span className="text-emerald-600">e-bike rentals</span> on Oʻahu
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Reserve online. Scan a QR. Ride the island. We deliver to your
              hotel or meet at our free pickup spot near McCully & Kapiʻolani.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl"
              >
                <a
                  href={FAREHARBOR_BOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-5 w-5" /> Book your ride
                </a>
              </Button>
              <a
                href="#experiences"
                className="inline-flex items-center gap-2 text-emerald-700 hover:underline font-medium"
              >
                Curated drops <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Bike className="h-4 w-4 text-emerald-600" /> Foldable e-bikes
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600" /> U-lock + AirTag
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-emerald-600" /> QR unlock
                codes
              </div>
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
                  "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop')",
              }}
            />
            {/* Backing scenic card */}
            <div
              className="absolute -bottom-6 -left-6 w-[280px] h-28 md:w-[360px] md:h-28 rounded-2xl shadow-lg overflow-hidden z-0"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1520975930161-6bd83b67a3b2?q=80&w=1200&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Front info card */}
            <div className="absolute -bottom-4 -left-4 bg-white/80 backdrop-blur rounded-2xl shadow p-4 flex items-center gap-3 z-10">
              <Sun className="h-5 w-5 text-amber-500" />
              <span className="text-sm">
                Best at golden hour along Ala Moana & Diamond Head
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Rentals */}
      <section id="rentals" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Simple pricing
          </h2>
          <p className="text-slate-600 mt-2">
            Day rentals with optional hotel delivery. Helmets and locks
            included.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-3xl border-emerald-100">
            <CardHeader>
              <CardTitle>Full-Day Rental</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-semibold">
                $90
                <span className="text-base font-normal text-slate-500">
                  {" "}
                  / day
                </span>
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>Unlimited miles</li>
                <li>Helmet, U-lock, AirTag security</li>
                <li>Digital guide routes</li>
              </ul>
              <Button
                asChild
                className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-2xl"
              >
                <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">
                  Reserve now
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-emerald-100">
            <CardHeader>
              <CardTitle>Multi-Day</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-semibold">
                $80
                <span className="text-base font-normal text-slate-500">
                  {" "}
                  / day
                </span>
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>2+ days, save more</li>
                <li>Charger included</li>
                <li>Night storage tips</li>
              </ul>
              <Button
                asChild
                className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-2xl"
              >
                <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">
                  See availability
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-emerald-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-transparent" />
            <CardHeader>
              <CardTitle>Hotel Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-semibold">
                $35
                <span className="text-base font-normal text-slate-500">
                  {" "}
                  flat
                </span>
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>Drop-off at lobby or curb</li>
                <li>Oʻahu service zones (Waikīkī & nearby areas)</li>
                <li>Schedule at checkout</li>
              </ul>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-2xl border-emerald-300 text-emerald-700"
              >
                <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">
                  Add delivery
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Experiences / Curated Drops */}
      <section id="experiences" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 flex items-center gap-3">
          <ShipWheel className="text-emerald-600" />
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Curated drop-offs
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Diamond Head Lookout Cruise",
              blurb: "Iconic coastline views on a gentle, paved loop.",
              time: "2–3 hrs",
              id: "diamond",
            },
            {
              title: "Ala Moana ↔ Kakaʻako Art Ride",
              blurb: "Beach park paths and vibrant murals.",
              time: "1–2 hrs",
              id: "kakaako",
            },
            {
              title: "North Shore Haleʻiwa Town",
              blurb: "Flat oceanside cruiser with food trucks.",
              time: "Half day",
              id: "haleiwa",
            },
          ].map((x) => (
            <Card key={x.id} className="rounded-3xl border-emerald-100">
              <CardHeader>
                <CardTitle>{x.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-600">{x.blurb}</p>
                <p className="text-sm text-slate-500">
                  Suggested time: {x.time}
                </p>
                <div className="flex items-center gap-3">
                  <Button
                    asChild
                    className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"
                  >
                    <a
                      href={FAREHARBOR_BOOK_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Book with drop-off
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-2xl border-emerald-300 text-emerald-700"
                  >
                    <a
                      href={FAREHARBOR_BOOK_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Just rent bikes
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8">
          How it works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: Calendar,
              title: "Reserve",
              text: "Pick date & time online. Add delivery if you like.",
            },
            {
              icon: Smartphone,
              title: "Unlock",
              text: "We text your QR+code. Bikes come with helmets & locks.",
            },
            {
              icon: MapPin,
              title: "Ride",
              text: "Follow our easy, scenic routes to keep things chill.",
            },
            {
              icon: Lock,
              title: "Return",
              text:
                "Lock up at our free pickup spot or schedule a hotel return.",
            },
          ].map((s, i) => (
            <Card key={i} className="rounded-3xl border-emerald-100">
              <CardContent className="pt-6">
                <s.icon className="h-6 w-6 text-emerald-600" />
                <h3 className="mt-3 font-medium">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pickup location */}
      <section id="pickup" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Free pickup & return
        </h2>
        <p className="text-slate-600 mt-2 max-w-3xl">
          Our free pickup/return location is near the 7-Eleven on Kapiʻolani
          Blvd between Pumehana & McCully. Exact pin shared after booking.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-3xl overflow-hidden shadow border border-emerald-100 bg-white">
            {/* Map placeholder; replace with your custom Google Maps embed */}
            <iframe
              title="Pickup Map"
              className="w-full h-72 md:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.642732222692!2d-157.839!3d21.289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE3JzIwLjQiTiAxNTfCsDUwJzIxLjQiVw!5e0!3m2!1sen!2sus!4v1689123456789"
            />
          </div>
          <Card className="rounded-3xl border-emerald-100">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-medium">What to bring</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Photo ID & matching credit card</li>
                <li>Closed-toe shoes recommended</li>
                <li>Light jacket or sunscreen (trade winds!)</li>
              </ul>
              <h3 className="font-medium pt-2">Safety & security</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Helmets & U-locks included</li>
                <li>Please bring bikes inside at night</li>
                <li>Return to the specified lock-up pin</li>
              </ul>
              <div className="pt-2">
                <Button
                  asChild
                  className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"
                >
                  <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">
                    Book pickup time
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
          FAQ
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-3xl border-emerald-100">
            <CardContent className="p-6">
              <h3 className="font-medium">Do I need a website to book?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Nope. Bookings run on our secure FareHarbor page. Just tap “Book
                now.”
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-emerald-100">
            <CardContent className="p-6">
              <h3 className="font-medium">Delivery available?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Yes, hotel delivery is a $35 flat add-on in our Oʻahu service
                zones (Waikīkī and nearby areas).
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-emerald-100">
            <CardContent className="p-6">
              <h3 className="font-medium">Deposits & waivers?</h3>
              <p className="text-sm text-slate-600 mt-1">
                A small security hold and a digital waiver keep things smooth
                for everyone.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-emerald-100">
            <CardContent className="p-6">
              <h3 className="font-medium">Group bookings?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Absolutely. We have 6 foldable e-bikes and can arrange staggered
                starts.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-3 gap-6 items-start">
          <div>
            <div className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-emerald-600" />
              <span className="font-semibold">Oahu E-Bikes</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">
              Minimal footprint, maximum fun. See more by e-bike.
            </p>
          </div>
          <div className="text-sm">
            <div className="font-medium">Contact</div>
            <a
              className="block text-emerald-700 hover:underline"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="text-sm">
            <div className="font-medium">Book</div>
            <a
              className="block text-emerald-700 hover:underline"
              href={FAREHARBOR_BOOK_URL}
              target="_blank"
              rel="noreferrer"
            >
              FareHarbor bookings
            </a>
          </div>
        </div>
        <div className="text-xs text-center text-slate-500 pb-6">
          © {new Date().getFullYear()} Oahu E-Bikes. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
