"use client";

import React from "react";
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

export default function MonarchPage() {
  const hotel = {
    name: "The Monarch Hotel",
    logo: "/logos/monarch-logo.png",
    website: "https://waikikimonarchhotel.com/",
    colors: {
      primary: "bg-slate-900", // solid black, no gradients
      accent: "text-amber-700", // #42270f inspired brown accents
      accentIcon: "text-amber-600",
      button: "bg-slate-900 hover:bg-black text-white", // black buttons
      buttonOutline: "border-amber-700 text-amber-700 bg-white", // brown border on white
      border: "border-slate-200", // light border for white cards
      background: "bg-slate-900", // solid black background
      cardBg: "bg-white", // white content areas
      textPrimary: "text-slate-900", // black text on white
      textSecondary: "text-slate-600" // gray text on white
    },
    contact: {
      phone: "(808) 949-3911",
      email: "info@waikikimonarchhotel.com"
    },
    location: {
      address: "444 Niu St, Honolulu, HI 96815",
      bikeLocation: "Valet area in the main lobby, clearly marked bike storage",
      storageInstructions: "Use the designated bike room on P1 level. Key card access required - ask front desk.",
      additionalNotes: "Rooftop views make this a perfect starting point for scenic rides."
    },
    bookingUrl: "https://book.oahu.bike?hotel=monarch"
  };

  const colors = hotel.colors;

  return (
    <main className={`min-h-screen ${colors.background} text-white`}>
      {/* Tailwind safelist for Monarch colors */}
      <div className="hidden">
        bg-slate-900 text-amber-700 text-amber-600 hover:bg-black border-amber-700 bg-white border-slate-200 text-slate-900 text-slate-600
      </div>

      {/* Header with hotel branding */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <a href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Oahu.BIKE</span>
              </a>
            </Button>
            <div className="h-6 border-r border-slate-300" />
            <div className="flex items-center gap-3">
              <a href={hotel.website} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                <img 
                  src={hotel.logo}
                  alt={`${hotel.name} Logo`}
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild className={`${colors.button} text-white rounded-2xl`}>
              <a href="#booking">Book E-Bike</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className={`${colors.cardBg} rounded-3xl p-8 md:p-12 text-center shadow-2xl`}>
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${colors.textPrimary}`}>
              E-Bike Rentals at<br />
              <span className={colors.textPrimary}>
                {hotel.name}
              </span>
            </h1>
            <p className={`text-xl ${colors.textSecondary} max-w-3xl mx-auto`}>
              Your e-bike adventure starts right here at the hotel. Contactless pickup, 
              premium bikes, and local insider routes included.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className={`${colors.button} rounded-2xl`}>
                <a href="#booking" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Reserve Your Bike
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className={`rounded-2xl ${colors.buttonOutline}`}>
                <a href="#instructions" className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> View Instructions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className={`rounded-3xl ${colors.border} ${colors.cardBg} shadow-lg`}>
            <CardContent className="pt-6 text-center">
              <KeySquare className={`h-8 w-8 ${colors.accentIcon} mx-auto mb-3`} />
              <h3 className={`font-medium mb-2 ${colors.textPrimary}`}>Contactless Pickup</h3>
              <p className={`text-sm ${colors.textSecondary}`}>Get your lockbox code via text. No waiting, no paperwork.</p>
            </CardContent>
          </Card>
          <Card className={`rounded-3xl ${colors.border} ${colors.cardBg} shadow-lg`}>
            <CardContent className="pt-6 text-center">
              <Bike className={`h-8 w-8 ${colors.accentIcon} mx-auto mb-3`} />
              <h3 className={`font-medium mb-2 ${colors.textPrimary}`}>Premium E-Bikes</h3>
              <p className={`text-sm ${colors.textSecondary}`}>RadExpand 5 foldable e-bikes with helmets and U-locks included.</p>
            </CardContent>
          </Card>
          <Card className={`rounded-3xl ${colors.border} ${colors.cardBg} shadow-lg`}>
            <CardContent className="pt-6 text-center">
              <MapPin className={`h-8 w-8 ${colors.accentIcon} mx-auto mb-3`} />
              <h3 className={`font-medium mb-2 ${colors.textPrimary}`}>Local Routes</h3>
              <p className={`text-sm ${colors.textSecondary}`}>Curated routes and insider tips for the best island experience.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className={`${colors.cardBg} rounded-3xl p-8 mb-8 text-center shadow-lg`}>
          <h2 className={`text-3xl font-bold mb-4 ${colors.textPrimary}`}>Book Your E-Bike</h2>
          <p className={`${colors.textSecondary} max-w-2xl mx-auto`}>
            Reserve your premium e-bike rental directly from The Monarch Hotel.
            Choose your dates and we'll handle the rest.
          </p>
        </div>
        
        <Card className={`rounded-3xl ${colors.border} ${colors.cardBg} max-w-4xl mx-auto shadow-xl`}>
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <h3 className={`text-2xl font-bold mb-6 ${colors.textPrimary}`}>E-Bike Booking Form</h3>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <p className={`${colors.accent} mb-4`}>
                  🚧 Booking system integration coming soon with Peek Pro!
                </p>
                <p className={`text-sm ${colors.textSecondary} mb-6`}>
                  In the meantime, you can book directly through our booking partner:
                </p>
                <Button asChild size="lg" className={`${colors.button} text-white rounded-2xl`}>
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
          <Card className={`rounded-3xl ${colors.border} ${colors.cardBg} shadow-lg`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.textPrimary}`}>
                <Hotel className={colors.accentIcon} />
                Bike Location & Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className={`font-medium mb-2 ${colors.textPrimary}`}>Hotel Address</h4>
                <p className={`${colors.textSecondary} text-sm`}>{hotel.location.address}</p>
              </div>
              
              <div>
                <h4 className={`font-medium mb-2 ${colors.textPrimary}`}>Bike Pickup Location</h4>
                <p className={`${colors.textSecondary} text-sm`}>{hotel.location.bikeLocation}</p>
              </div>
              
              <div>
                <h4 className={`font-medium mb-2 ${colors.textPrimary}`}>Storage Instructions</h4>
                <p className={`${colors.textSecondary} text-sm`}>{hotel.location.storageInstructions}</p>
              </div>
              
              <div>
                <h4 className={`font-medium mb-2 ${colors.textPrimary}`}>Additional Notes</h4>
                <p className={`${colors.textSecondary} text-sm`}>{hotel.location.additionalNotes}</p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className={`font-medium mb-3 ${colors.textPrimary}`}>Need Help?</h4>
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
          <Card className={`rounded-3xl ${colors.border} ${colors.cardBg} shadow-lg`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colors.textPrimary}`}>
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
                    <div className={`w-6 h-6 rounded-full ${colors.primary} text-white text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5`}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className={`font-medium text-sm ${colors.textPrimary}`}>{item.title}</h4>
                      <p className={`text-xs ${colors.textSecondary}`}>{item.desc}</p>
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
        <div className={`${colors.cardBg} rounded-3xl p-8 mb-8 text-center shadow-lg`}>
          <h2 className={`text-3xl font-bold mb-4 ${colors.textPrimary}`}>How to Use Your U-Lock</h2>
          <p className={`${colors.textSecondary} max-w-2xl mx-auto`}>
            Proper locking technique is essential for bike security. Watch this quick tutorial 
            to learn the most effective way to secure your e-bike.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className={`rounded-3xl ${colors.border} ${colors.cardBg} overflow-hidden shadow-lg`}>
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
                  <h3 className={`font-medium ${colors.textPrimary}`}>Essential Security Tips</h3>
                </div>
                <ul className={`text-sm ${colors.textSecondary} space-y-2`}>
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
        <Card className={`rounded-3xl ${colors.border} ${colors.cardBg} shadow-xl`}>
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className={`text-3xl font-bold mb-4 ${colors.textPrimary}`}>Ready to Explore Oahu?</h2>
            <p className={`${colors.textSecondary} mb-8 max-w-2xl mx-auto`}>
              Book your e-bike rental now and start your Hawaiian adventure right from {hotel.name}. 
              Premium bikes, contactless pickup, and unforgettable island experiences await.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className={`${colors.button} text-white rounded-2xl`}>
                <a href="#booking" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Book Your E-Bike Now
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className={`rounded-2xl ${colors.buttonOutline}`}>
                <a href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" /> Back to Oahu.BIKE
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-800 mt-16">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bike className={`h-5 w-5 ${colors.accentIcon}`} />
                <span className="font-semibold text-white">Oahu.BIKE</span>
                <span className="text-slate-400">×</span>
                <span className="font-medium text-white">{hotel.name}</span>
              </div>
              <p className="text-sm text-slate-300">Premium e-bike rentals with hotel convenience.</p>
            </div>
            <div className="text-sm md:text-right text-slate-300">
              <div className="space-y-1">
                <div>Hotel: {hotel.contact.phone}</div>
                <div>E-Bike Support: info@oahu.bike</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-center text-slate-400 pt-6 border-t border-slate-700 mt-6">
            © {new Date().getFullYear()} Oahu.BIKE. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}