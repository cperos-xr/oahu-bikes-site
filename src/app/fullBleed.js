import React from "react";
import { Bike, Calendar, MapPin, Lock, ShipWheel, Smartphone, ArrowRight, Waves, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FAREHARBOR_BOOK_URL = "https://fareharbor.com/your-business/items/";
const CONTACT_EMAIL = "waikikiebikes@gmail.com";

export default function WaikikiEbikesLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Top bar */}
      <nav className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6" />
            <span className="font-semibold tracking-wide">Waikiki E-Bikes</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#rentals" className="hover:opacity-90">Rentals</a>
            <a href="#experiences" className="hover:opacity-90">Drops</a>
            <a href="#how" className="hover:opacity-90">How it works</a>
            <a href="#pickup" className="hover:opacity-90">Pickup</a>
            <a href="#faq" className="hover:opacity-90">FAQ</a>
          </div>
          <Button asChild className="rounded-2xl bg-white text-emerald-700 hover:bg-emerald-50">
            <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">Book now</a>
          </Button>
        </div>
      </nav>

      {/* Full-bleed hero */}
      <header className="relative">
        <div className="h-[72vh] min-h-[520px] bg-cover bg-center"
             style={{ backgroundImage:"url('https://images.unsplash.com/photo-1540280374370-8d94a0bbf3d5?q=80&w=1600&auto=format&fit=crop')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-semibold">See more of Oʻahu by e-bike</h1>
          <p className="mt-3 max-w-2xl text-white/90">Reserve online, get a QR unlock code, and cruise Waikīkī, Ala Moana, and Diamond Head with ease.</p>
          <div className="mt-6 flex gap-3">
            <Button asChild size="lg" className="rounded-2xl bg-emerald-600 hover:bg-emerald-700">
              <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2"><Calendar className="h-5 w-5" />Book your ride</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl bg-transparent border-white/60 text-white hover:bg-white/10">
              <a href="#experiences">Curated drops</a>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {[
              {icon:Bike, label:"Foldable bikes"},
              {icon:Lock, label:"U-lock + AirTag"},
              {icon:Smartphone, label:"QR unlock"},
              {icon:MapPin, label:"Free pickup"},
            ].map((x,i)=>(
              <div key={i} className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2 backdrop-blur">
                <x.icon className="h-4 w-4"/>
                <span>{x.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Pricing tiles */}
      <section id="rentals" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">Simple pricing</h2>
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

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Calendar, title: "Reserve", text: "Pick date & time online." },
            { icon: Smartphone, title: "Unlock", text: "We text your QR+code." },
            { icon: MapPin, title: "Ride", text: "Scenic routes to keep it chill." },
            { icon: Lock, title: "Return", text: "Lock at the pin or hotel return." },
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

      {/* Footer */}
      <footer className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8 grid sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-2"><Waves className="h-5 w-5 text-emerald-600"/><span className="font-semibold">Waikiki E-Bikes</span></div>
          <div className="text-sm"><div className="font-medium">Contact</div><a className="text-emerald-700 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
          <div className="text-sm"><div className="font-medium">Book</div><a className="text-emerald-700 hover:underline" href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">FareHarbor bookings</a></div>
        </div>
      </footer>
    </main>
  );
}
