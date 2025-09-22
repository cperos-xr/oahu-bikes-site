import React from "react";
import { Bike, Calendar, MapPin, Lock, ShipWheel, Smartphone, ArrowRight, Waves, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FAREHARBOR_BOOK_URL = "https://fareharbor.com/your-business/items/";
const CONTACT_EMAIL = "waikikiebikes@gmail.com";

export default function WaikikiEbikesLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 text-slate-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-emerald-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6 text-emerald-500" />
            <span className="font-semibold tracking-wide text-slate-900">Waikiki E-Bikes</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#rentals" className="hover:text-emerald-600">Rentals</a>
            <a href="#experiences" className="hover:text-emerald-600">Drops</a>
            <a href="#how" className="hover:text-emerald-600">How it works</a>
            <a href="#pickup" className="hover:text-emerald-600">Pickup</a>
            <a href="#faq" className="hover:text-emerald-600">FAQ</a>
          </div>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl">
            <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">Book now</a>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-slate-900">
              Easy, beautiful <span className="text-emerald-600">e-bike rentals</span> in Waikīkī
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Reserve online. Scan a QR. Ride the island. Hotel delivery or free pickup near McCully & Kapiʻolani.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl">
                <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Book your ride
                </a>
              </Button>
              <a href="#experiences" className="inline-flex items-center gap-2 text-emerald-700 hover:underline font-medium">
                Curated drops <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2"><Bike className="h-4 w-4 text-emerald-600"/> Foldable e-bikes</div>
              <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-emerald-600"/> U-lock + AirTag</div>
              <div className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-emerald-600"/> QR unlock codes</div>
            </div>
          </div>

          <div className="relative">
            {/* Main postcard image */}
            <div aria-hidden role="presentation"
                 className="aspect-[4/3] rounded-3xl shadow-xl bg-cover bg-center"
                 style={{ backgroundImage:"url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop')" }} />
            {/* Backing scenic card */}
            <div className="absolute -bottom-6 -left-6 w-[280px] h-28 md:w-[360px] md:h-28 rounded-2xl shadow-lg overflow-hidden z-0"
                 style={{ backgroundImage:"url('https://images.unsplash.com/photo-1520975930161-6bd83b67a3b2?q=80&w=1200&auto=format&fit=crop')", backgroundSize:"cover", backgroundPosition:"center" }} />
            {/* Front info card */}
            <div className="absolute -bottom-4 -left-4 bg-white/85 backdrop-blur rounded-2xl shadow p-4 flex items-center gap-3 z-10">
              <Sun className="h-5 w-5 text-amber-500"/>
              <span className="text-sm">Best at golden hour along Ala Moana & Diamond Head</span>
            </div>
          </div>
        </div>
      </section>

      {/* Simple pricing row */}
      <section id="rentals" className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {title:"Full-Day", price:"$90 / day", cta:"Reserve now"},
            {title:"Multi-Day", price:"$80 / day", cta:"See availability"},
            {title:"Hotel Delivery", price:"$35 flat", cta:"Add delivery", outline:true},
          ].map((x,i)=>(
            <Card key={i} className="rounded-3xl border-emerald-100">
              <CardHeader><CardTitle>{x.title}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-semibold">{x.price}</p>
                <Button asChild className={`w-full rounded-2xl ${x.outline ? "border border-emerald-300 text-emerald-700 bg-white hover:bg-emerald-50" : "bg-emerald-600 hover:bg-emerald-700"}`}>
                  <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">{x.cta}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How + Pickup condensed */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="rounded-3xl border-emerald-100">
            <CardHeader><CardTitle>How it works</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {[
                {icon:Calendar, title:"Reserve", text:"Pick date & time online. Add delivery if you like."},
                {icon:Smartphone, title:"Unlock", text:"We text your QR+code. Helmets & locks included."},
                {icon:MapPin, title:"Ride", text:"Follow our scenic routes—Ala Moana, Diamond Head, Kakaʻako."},
                {icon:Lock, title:"Return", text:"Lock at pickup pin or schedule hotel return."},
              ].map((s,i)=>(
                <div key={i} className="flex gap-3">
                  <s.icon className="h-5 w-5 mt-1 text-emerald-600"/><div><div className="font-medium">{s.title}</div><div className="text-sm text-slate-600">{s.text}</div></div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card id="pickup" className="rounded-3xl border-emerald-100">
            <CardHeader><CardTitle>Free pickup & return</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-slate-600">Near the 7-Eleven on Kapiʻolani Blvd between Pumehana & McCully. Exact pin after booking.</p>
              <div className="rounded-2xl overflow-hidden border">
                <iframe title="Pickup Map" className="w-full h-64" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.642732222692!2d-157.839!3d21.289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE3JzIwLjQiTiAxNTfCsDUwJzIxLjQiVw!5e0!3m2!1sen!2sus!4v1689123456789"/>
              </div>
              <Button asChild className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"><a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">Book pickup time</a></Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-3 gap-6">
          <div className="flex items-center gap-2"><Waves className="h-5 w-5 text-emerald-600"/><span className="font-semibold">Waikiki E-Bikes</span></div>
          <div className="text-sm"><div className="font-medium">Contact</div><a className="text-emerald-700 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
          <div className="text-sm"><div className="font-medium">Book</div><a className="text-emerald-700 hover:underline" href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">FareHarbor bookings</a></div>
        </div>
        <div className="text-xs text-center text-slate-500 pb-6">© {new Date().getFullYear()} Waikiki E-Bikes.</div>
      </footer>
    </main>
  );
}
