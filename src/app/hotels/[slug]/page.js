"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Bike,
  Calendar,
  MapPin,
  Lock,
  Hotel,
  KeySquare,
  ArrowLeft,
  Play,
  ExternalLink,
  Clock,
  Users,
  Shield,
  Phone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Hotel configurations with unique branding
const HOTEL_CONFIGS = {
  surfjack: {
    name: "Surfjack Hotel & Swim Club",
    logo: "/surfjack-logo.png",
    website: "https://surfjack.com/",
    colors: {
      primary: "from-red-400 to-amber-600", // #ef6860 to #837b54 inspired
      accent: "text-red-600",
      accentIcon: "text-red-500",
      button: "bg-red-500 hover:bg-red-600", // #ef6860
      buttonOutline: "border-red-300 text-red-700",
      border: "border-red-100",
      background: "from-red-50 via-white to-amber-50"
    },
    contact: {
      phone: "(808) 923-8882",
      email: "info@surfjack.com"
    },
    location: {
      address: "412 Lewers St, Honolulu, HI 96815",
      bikeLocation: "Pool deck level, near the elevator by the Swim Club",
      storageInstructions: "Bikes must be stored in your room overnight. Use the service elevator for easy room access.",
      additionalNotes: "Check in with front desk if you need assistance locating the bike rack."
    },
    bookingUrl: "https://book.oahu.bike?hotel=surfjack"
  },
  whitesands: {
    name: "White Sands Hotel",
    logo: "/whitesands-logo.png",
    website: "https://www.whitesandshotel.com/",
    colors: {
      primary: "from-white to-orange-500", // white to #ff4d00
      accent: "text-orange-600",
      accentIcon: "text-orange-500", // #ff4d00
      button: "bg-orange-500 hover:bg-orange-600", // #ff4d00
      buttonOutline: "border-orange-300 text-orange-700",
      border: "border-orange-100",
      background: "from-orange-50 via-white to-slate-50"
    },
    contact: {
      phone: "(808) 949-7013",
      email: "info@whitesandshotel.com"
    },
    location: {
      address: "2426 Kuhio Ave, Honolulu, HI 96815",
      bikeLocation: "Main lobby area, near the front desk reception",
      storageInstructions: "Secure bikes on your lanai or bring into your room. Always use the provided U-lock.",
      additionalNotes: "Perfect beachfront location for easy access to Waikiki Beach paths."
    },
    bookingUrl: "https://book.oahu.bike?hotel=whitesands"
  },
  monarch: {
    name: "The Monarch Hotel",
    logo: "/monarch-logo.png",
    website: "https://waikikimonarchhotel.com/",
    colors: {
      primary: "from-slate-900 to-amber-800", // black to #42270f
      accent: "text-amber-700", // #42270f inspired
      accentIcon: "text-amber-600",
      button: "bg-slate-800 hover:bg-slate-900", // black
      buttonOutline: "border-amber-700 text-amber-800", // #42270f
      border: "border-amber-100",
      background: "from-slate-50 via-white to-amber-50"
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
  }
};

export default function HotelPage() {
  const params = useParams();
  const hotelSlug = params.slug;
  const hotel = HOTEL_CONFIGS[hotelSlug];

  // If hotel config doesn't exist, show 404
  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hotel Not Found</h1>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const colors = hotel.colors;

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.background} text-slate-800`}>
      {/* Header with hotel branding */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-100">
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
              <a href={hotel.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Image 
                  src={hotel.logo}
                  alt={`${hotel.name} Logo`}
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  width={32}
                  height={32}
                />
                <div className={`hidden sm:flex items-center gap-2 ${colors.accentIcon}`}>
                  <Hotel className="h-6 w-6" />
                  <span className="font-semibold text-slate-900">{hotel.name}</span>
                </div>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild className={`${colors.button} rounded-2xl`}>
              <a href="#booking">Book E-Bike</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.primary} opacity-10`} />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              E-Bike Rentals at<br />
              <span className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
                {hotel.name}
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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
          <Card className={`rounded-3xl ${colors.border}`}>
            <CardContent className="pt-6 text-center">
              <KeySquare className={`h-8 w-8 ${colors.accentIcon} mx-auto mb-3`} />
              <h3 className="font-medium mb-2">Contactless Pickup</h3>
              <p className="text-sm text-slate-600">Get your lockbox code via text. No waiting, no paperwork.</p>
            </CardContent>
          </Card>
          <Card className={`rounded-3xl ${colors.border}`}>
            <CardContent className="pt-6 text-center">
              <Bike className={`h-8 w-8 ${colors.accentIcon} mx-auto mb-3`} />
              <h3 className="font-medium mb-2">Premium E-Bikes</h3>
              <p className="text-sm text-slate-600">RadExpand 5 foldable e-bikes with helmets and U-locks included.</p>
            </CardContent>
          </Card>
          <Card className={`rounded-3xl ${colors.border}`}>
            <CardContent className="pt-6 text-center">
              <MapPin className={`h-8 w-8 ${colors.accentIcon} mx-auto mb-3`} />
              <h3 className="font-medium mb-2">Local Routes</h3>
              <p className="text-sm text-slate-600">Curated routes and insider tips for the best island experience.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Book Your E-Bike</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Reserve your premium e-bike rental directly from {hotel.name}.
            Choose your dates and we&rsquo;ll handle the rest.
          </p>
        </div>
        
        <Card className={`rounded-3xl ${colors.border} max-w-4xl mx-auto bg-gradient-to-r ${colors.primary} bg-opacity-5`}>
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">E-Bike Booking Form</h3>
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <p className={`${colors.accent} mb-4`}>
                  🚧 Booking system integration coming soon with Peek Pro!
                </p>
                <p className="text-sm text-slate-600 mb-6">
                  In the meantime, you can book directly through our booking partner:
                </p>
                <Button asChild size="lg" className={`${colors.button} rounded-2xl`}>
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
                <p className="text-slate-600 text-sm">{hotel.location.address}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Bike Pickup Location</h4>
                <p className="text-slate-600 text-sm">{hotel.location.bikeLocation}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Storage Instructions</h4>
                <p className="text-slate-600 text-sm">{hotel.location.storageInstructions}</p>
              </div>
              
              {hotel.location.additionalNotes && (
                <div>
                  <h4 className="font-medium mb-2">Additional Notes</h4>
                  <p className="text-slate-600 text-sm">{hotel.location.additionalNotes}</p>
                </div>
              )}

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
                      <p className="text-xs text-slate-600">{item.desc}</p>
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
          <p className="text-slate-600 max-w-2xl mx-auto">
            Proper locking technique is essential for bike security. Watch this quick tutorial 
            to learn the most effective way to secure your e-bike.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className={`rounded-3xl ${colors.border} overflow-hidden`}>
            <CardContent className="p-0">
              {/* Tailwind safelist for dynamic colors */}
              <div className="hidden">
                from-red-400 to-amber-600 text-red-600 text-red-500 bg-red-500 hover:bg-red-600 border-red-300 text-red-700 border-red-100 from-red-50 to-amber-50
                from-white to-orange-500 text-orange-600 text-orange-500 bg-orange-500 hover:bg-orange-600 border-orange-300 text-orange-700 border-orange-100 from-orange-50 to-slate-50
                from-slate-900 to-amber-800 text-amber-700 text-amber-600 bg-slate-800 hover:bg-slate-900 border-amber-700 text-amber-800 border-amber-100 from-slate-50 to-amber-50
              </div>
              
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

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Card className={`rounded-3xl ${colors.border} bg-gradient-to-r ${colors.primary} bg-opacity-5`}>
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Oahu?</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Book your e-bike rental now and start your Hawaiian adventure right from {hotel.name}. 
              Premium bikes, contactless pickup, and unforgettable island experiences await.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className={`${colors.button} rounded-2xl`}>
                <a href="#booking" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Book Your E-Bike Now
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
      <footer className="border-t border-slate-100 bg-white/70 mt-16">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bike className={`h-5 w-5 ${colors.accentIcon}`} />
                <span className="font-semibold">Oahu.BIKE</span>
                <span className="text-slate-400">×</span>
                <span className="font-medium">{hotel.name}</span>
              </div>
              <p className="text-sm text-slate-600">Premium e-bike rentals with hotel convenience.</p>
            </div>
            <div className="text-sm md:text-right">
              <div className="space-y-1">
                <div>Hotel: {hotel.contact.phone}</div>
                <div>E-Bike Support: info@oahu.bike</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-center text-slate-500 pt-6 border-t border-slate-100 mt-6">
            © {new Date().getFullYear()} Oahu.BIKE. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}