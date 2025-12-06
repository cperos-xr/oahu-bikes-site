"use client";

import React from "react";
import Link from "next/link";
import {
  Bike,
  Calendar,
  MapPin,
  Lock,
  Hotel,
  KeySquare,
  ArrowLeft,
  ExternalLink,
  Clock,
  Shield,
  Phone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SurfjackPage() {
  const hotel = {
    name: "Surfjack Hotel & Swim Club",
    logo: "/logos/surfjack-logo.png",
    website: "https://surfjack.com/",
    colors: {
      primary: "from-amber-700 to-yellow-800", // Warm tan tones
      accent: "text-amber-800",
      accentIcon: "text-amber-700",
      button: "text-white", // Coral BOOK button
      buttonSecondary: "text-white", // Olive DINE button
      buttonOutline: "border-amber-700 text-amber-700 hover:bg-amber-50",
      border: "border-amber-200",
      background: "from-amber-50 via-white to-yellow-50"
    },
    contact: {
      phone: "(808) 923-8882",
      email: "info@surfjack.com"
    },
    location: {
      address: "412 Lewers St, Honolulu, HI 96815",
      bikeLocation: "Pool deck level, near the elevator by the Swim Club (look for Jack the hotel dog - he might be sunbathing nearby!)",
      storageInstructions: "Bikes must be stored in your room overnight. Use the service elevator for easy room access. Feel free to wheel through the art-filled lobby!",
      additionalNotes: "Check in with our friendly front desk crew if you need assistance. They know all the best local artist spots to visit by bike."
    },
    bookingUrl: "https://book.oahu.bike?hotel=surfjack"
  };

  const colors = hotel.colors;

  return (
    <main className={`min-h-screen bg-amber-50 text-amber-900`} style={{
      backgroundImage: 'url(/paper-fibers.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: '400px 400px'
    }}>
      {/* Tailwind safelist for Surfjack colors */}
      <div className="hidden">
        from-red-400 to-amber-700 text-red-600 text-red-500 bg-red-500 hover:bg-red-600 border-red-300 text-red-700 border-red-100 from-red-50 to-amber-50
      </div>

      {/* Header with hotel branding */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-amber-50/90 bg-amber-50/80 border-b border-amber-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Oahu.BIKE</span>
              </Link>
            </Button>
            <div className="h-6 border-r border-slate-300" />
            <div className="flex items-center gap-3">
              <a href={hotel.website} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                <Image
                  src={hotel.logo}
                  alt={`${hotel.name} Logo`}
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild className={`${colors.button} px-6 py-2 font-medium uppercase tracking-wide text-sm`} style={{backgroundColor: '#bf534d'}}>
              <a href="#booking">BOOK</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Subtle tan scattered elements background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-3 h-3 bg-amber-600 rounded-full opacity-30"></div>
          <div className="absolute top-32 right-16 w-2 h-2 bg-yellow-700 rounded-full opacity-40"></div>
          <div className="absolute bottom-40 left-20 w-4 h-4 bg-amber-500 rounded-full opacity-25"></div>
          <div className="absolute bottom-60 right-32 w-2 h-2 bg-yellow-800 rounded-full opacity-35"></div>
          <div className="absolute top-40 left-1/3 w-1 h-8 bg-amber-600 opacity-20 rotate-45"></div>
          <div className="absolute bottom-32 right-1/4 w-1 h-6 bg-yellow-700 opacity-25 -rotate-12"></div>
        </div>
        
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900">
              E-Bike Rentals at<br />
              <span className={`${colors.accent} font-black tracking-tight`}>
                {hotel.name}
              </span>
            </h1>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
              Cruise the island in style from Waikīkī&rsquo;s most vibrant hotel. Where local art meets adventure, 
              and every ride is a chance to discover something new.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className={`${colors.button} px-8 py-3 font-medium uppercase tracking-wide text-sm`} style={{backgroundColor: '#bf534d'}}>
                <a href="#booking">
                  BOOK
                </a>
              </Button>
              <Button asChild size="lg" className={`${colors.buttonSecondary} px-8 py-3 font-medium uppercase tracking-wide text-sm`} style={{backgroundColor: '#776f4a'}}>
                <a href="#instructions">
                  EXPLORE
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className={`rounded-3xl ${colors.border}`}>
            <CardContent className="pt-6 text-center">
              <KeySquare className={`h-8 w-8 ${colors.accentIcon} mx-auto mb-3`} />
              <h3 className="font-medium mb-2">Contactless Pickup</h3>
              <p className="text-sm text-amber-700">Get your lockbox code via text. No waiting, no paperwork.</p>
            </CardContent>
          </Card>
          <Card className={`rounded-3xl ${colors.border}`}>
            <CardContent className="pt-6 text-center">
              <Bike className={`h-8 w-8 ${colors.accentIcon} mx-auto mb-3`} />
              <h3 className="font-medium mb-2">Premium E-Bikes</h3>
              <p className="text-sm text-amber-700">RadExpand 5 foldable e-bikes with helmets and U-locks included.</p>
            </CardContent>
          </Card>
          <Card className={`rounded-3xl ${colors.border}`}>
            <CardContent className="pt-6 text-center">
              <MapPin className={`h-8 w-8 ${colors.accentIcon} mx-auto mb-3`} />
              <h3 className="font-medium mb-2">Artist Routes</h3>
              <p className="text-sm text-amber-700">Discover local galleries, street art, and creative spaces. Curated by Surfjack&rsquo;s artist community.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Book Your E-Bike</h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Reserve your premium e-bike rental directly from Surfjack Hotel & Swim Club.
            Choose your dates and we&rsquo;ll handle the rest.
          </p>
        </div>
        
        <Card className={`rounded-3xl ${colors.border} max-w-4xl mx-auto`} style={{
          backgroundColor: 'rgba(254, 243, 199, 0.5)',
          backgroundImage: 'url(/paper-fibers.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px'
        }}>
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-amber-900">E-Bike Booking Form</h3>
              <div className="bg-white/80 rounded-2xl p-8 border border-amber-200">
                <p className="text-amber-800 mb-4">
                  🚧 Booking system integration coming soon with Peek Pro!
                </p>
                <p className="text-sm text-amber-700 mb-6">
                  In the meantime, you can book directly through our booking partner:
                </p>
                <Button asChild size="lg" className={`${colors.buttonSecondary} px-8 py-3 font-medium uppercase tracking-wide text-sm`} style={{backgroundColor: '#776f4a'}}>
                  <a href={hotel.bookingUrl} target="_blank" rel="noreferrer">
                    BOOK NOW
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pickup Instructions */}
      <section id="instructions" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Pickup & Return Instructions</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Location & Instructions */}
          <Card className={`rounded-3xl ${colors.border}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className={colors.accentIcon} />
                Bike Location & Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Hotel Address</h4>
                <p className="text-amber-700 text-sm">{hotel.location.address}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Bike Pickup Location</h4>
                <p className="text-amber-700 text-sm">{hotel.location.bikeLocation}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Storage Instructions</h4>
                <p className="text-amber-700 text-sm">{hotel.location.storageInstructions}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Local Ohana Tips</h4>
                <p className="text-amber-700 text-sm">{hotel.location.additionalNotes}</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-medium mb-3">Need Help?</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>Hotel: {hotel.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                    <span>Oahu.BIKE Support: info@oahu.bike</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How-to Steps */}
          <Card className={`rounded-3xl ${colors.border}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className={colors.accentIcon} />
                Step-by-Step Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Book Online", desc: "Reserve your bike and receive confirmation via email" },
                  { step: 2, title: "Get Your Code", desc: "Receive lockbox code via text 1 hour before pickup" },
                  { step: 3, title: "Locate the Bikes", desc: "Find the bike rack at the specified hotel location" },
                  { step: 4, title: "Unlock & Go", desc: "Use your code to open lockbox, grab key, helmet & U-lock" },
                  { step: 5, title: "Secure Return", desc: "Lock bike back in designated spot, return key to lockbox" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${colors.primary} text-white text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5`}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-amber-700">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* U-Lock Tutorial Video */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">How to Use Your U-Lock</h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Proper locking technique is essential for bike security. Watch this quick tutorial 
            to learn the most effective way to secure your e-bike.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className={`rounded-3xl ${colors.border} overflow-hidden`}>
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
                  <Shield className={`h-5 w-5 ${colors.accentIcon}`} />
                  <h3 className="font-medium">Essential Security Tips</h3>
                </div>
                <ul className="text-sm text-amber-700 space-y-2">
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

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Card className={`rounded-3xl ${colors.border} bg-gradient-to-r ${colors.primary} bg-opacity-5`}>
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Oahu?</h2>
            <p className="text-amber-700 mb-8 max-w-2xl mx-auto">
              Ready to explore O\u02bbahu like a local? Book your e-bike and join the Surfjack ohana for an authentic island adventure. 
              From hidden art spots to local grindz, every pedal tells a story. Good vibes guaranteed! \ud83c\udf3a
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className={`${colors.button} px-8 py-3 font-medium uppercase tracking-wide text-sm`} style={{backgroundColor: '#bf534d'}}>
                <a href="#booking">
                  BOOK NOW
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className={`rounded-2xl ${colors.buttonOutline}`}>
                  <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" /> Back to Oahu.BIKE
                  </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-200 bg-amber-50/80 mt-16" style={{
        backgroundImage: 'url(/paper-fibers.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '400px 400px'
      }}>
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bike className={`h-5 w-5 ${colors.accentIcon}`} />
                <span className="font-semibold">Oahu.BIKE</span>
                <span className="text-slate-400">×</span>
                <span className="font-medium">{hotel.name}</span>
              </div>
              <p className="text-sm text-amber-700">Premium e-bike rentals with hotel convenience.</p>
            </div>
            <div className="text-sm md:text-right text-amber-800">
              <div className="space-y-1">
                <div>Hotel: {hotel.contact.phone}</div>
                <div>E-Bike Support: info@oahu.bike</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-center text-amber-600 pt-6 border-t border-amber-200 mt-6">
            © {new Date().getFullYear()} Oahu.BIKE. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}