import React from "react";
import { Bike, Calendar, MapPin, Lock, ShipWheel, Smartphone, ArrowRight, Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FAREHARBOR_BOOK_URL = "https://fareharbor.com/your-business/items/";
const CONTACT_EMAIL = "waikikiebikes@gmail.com";

export default function WaikikiEbikesLanding() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><Waves className="h-6 w-6 text-emerald-600"/><span className="font-semibold">Waikiki E-Bikes</span></div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#pricing" className="hover:text-emerald-600">Pricing</a>
            <a href="#how" className="hover:text-emerald-600">How it works</a>
            <a href="#pickup" className="hover:text-emerald-600">Pickup</a>
          </div>
          <Button asChild className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"><a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">Book now</a></Button>
        </div>
      </nav>

      {/* Compact hero */}
      <header className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">
          <div>
            <h1 className="text-4xl font-semibold leading-tight">Book your Waikīkī e-bike in seconds</h1>
            <p className="mt-3 text-slate-600">Choose a day, get a QR unlock code, and ride. Hotel delivery available.</p>
            <div className="mt-5 flex gap-3">
              <Button asChild size="lg" className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"><a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2"><Calendar className="h-5 w-5"/>Book now</a></Button>
              <a href="#pricing" className="text-emerald-700 font-medium hover:underline inline-flex items-center gap-2">See pricing <ArrowRight className="h-4 w-4"/></a>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow border bg-cover bg-center h-56 md:h-72"
               style={{ backgroundImage:"url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop')" }} />
        </div>
      </header>

      {/* Booking cards above the fold */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {title:"Full-Day Rental", price:"$90 / day", items:["Unlimited miles","Helmet, U-lock, AirTag","Digital guide routes"], cta:"Reserve now"},
            {title:"Multi-Day", price:"$80 / day", items:["2+ days, save more","Charger included","Night storage tips"], cta:"See availability"},
            {title:"Hotel Delivery", price:"$35 flat", items:["Drop-off at lobby","Waikīkī & nearby zones","Schedule at checkout"], cta:"Add delivery", outline:true},
          ].map((x,i)=>(
            <Card key={i} className="rounded-3xl border-emerald-100">
              <CardHeader><CardTitle>{x.title}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-semibold">{x.price}</p>
                <ul className="space-y-1 text-sm text-slate-600">{x.items.map((t,ii)=><li key={ii}>• {t}</li>)}</ul>
                <Button asChild className={`w-full rounded-2xl ${x.outline ? "border border-emerald-300 text-emerald-700 bg-white hover:bg-emerald-50" : "bg-emerald-600 hover:bg-emerald-700"}`}>
                  <a href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">{x.cta}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works + pickup */}
      <section id="how" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="rounded-3xl border-emerald-100">
            <CardHeader><CardTitle>How it works</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {[
                {icon:Calendar, title:"Reserve", text:"Pick date & time."},
                {icon:Smartphone, title:"Unlock", text:"QR+code via text."},
                {icon:MapPin, title:"Ride", text:"Scenic routes included."},
                {icon:Lock, title:"Return", text:"Lock at our pin or hotel."},
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
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex items-center gap-2"><Waves className="h-5 w-5 text-emerald-600"/><span className="font-semibold">Waikiki E-Bikes</span></div>
          <div className="text-sm flex gap-4">
            <a className="text-emerald-700 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>Email</a>
            <a className="text-emerald-700 hover:underline" href={FAREHARBOR_BOOK_URL} target="_blank" rel="noreferrer">Book</a>
          </div>
          <div className="text-xs text-slate-500">© {new Date().getFullYear()} Waikiki E-Bikes.</div>
        </div>
      </footer>
    </main>
  );
}
