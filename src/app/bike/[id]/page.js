"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Bike,
  Calendar,
  Clock,
  Lock,
  KeySquare,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock availability data - replace with API call in production
const BIKE_AVAILABILITY = {
  1: { available: true, name: "E-Bike #1", location: "Surfjack Hotel", hotel: "surfjack", isHotelLocation: true },
  2: { available: true, name: "E-Bike #2", location: "McCully Recreation Center", hotel: null, isHotelLocation: false },
  3: { available: false, name: "E-Bike #3", location: "Monarch Hotel", hotel: "monarch", isHotelLocation: true, returnDate: "Oct 15, 2025" },
  4: { available: true, name: "E-Bike #4", location: "Surfjack Hotel", hotel: "surfjack", isHotelLocation: true },
  5: { available: true, name: "E-Bike #5", location: "White Sands Hotel", hotel: "whitesands", isHotelLocation: true },
  6: { available: true, name: "E-Bike #6", location: "Ala Moana Beach Park", hotel: null, isHotelLocation: false },
};

const RENTAL_OPTIONS = [
  { id: "half-day", label: "Half-Day", price: 35, unit: "4 hours", duration: "4 hours", desc: "Morning or afternoon adventure" },
  { id: "full-day", label: "Full-Day", price: 60, unit: "per day", duration: "24 hours", desc: "Explore at your own pace" },
  { id: "multi-day", label: "Multi-Day", price: 50, unit: "per day", duration: "2+ days", desc: "Best value for extended trips" },
];

// Theme matching main site
const ACTIVE_THEME = "ocean";
const THEMES = {
  ocean: {
    bgGrad: "from-sky-50 via-white to-teal-50",
    brand: "text-sky-700",
    brandIcon: "text-sky-500",
    cta: "bg-sky-600 hover:bg-sky-700",
    ctaOutline: "border-sky-300 text-sky-700",
    border: "border-sky-100",
    chip: "bg-white/80",
  },
};
const T = THEMES[ACTIVE_THEME];

export default function BikePage() {
  const params = useParams();
  const router = useRouter();
  const bikeId = params.id;
  
  const [selectedOption, setSelectedOption] = useState("half-day");
  const [isChecking, setIsChecking] = useState(true);
  const [bike, setBike] = useState(null);

  useEffect(() => {
    // Simulate availability check
    const checkAvailability = async () => {
      setIsChecking(true);
      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const bikeData = BIKE_AVAILABILITY[bikeId];
      
      if (!bikeData) {
        // Invalid bike ID - redirect to home
        router.push("/");
        return;
      }
      
      if (!bikeData.available) {
        // Bike unavailable - redirect to hotel page after showing message
        setTimeout(() => {
          router.push(`/hotels/${bikeData.hotel}`);
        }, 3000);
      }
      
      setBike(bikeData);
      setIsChecking(false);
    };

    checkAvailability();
  }, [bikeId, router]);

  const handleBooking = () => {
    const selectedRental = RENTAL_OPTIONS.find(opt => opt.id === selectedOption);
    
    // If bike is at a hotel, redirect to hotel booking page for commission tracking
    if (bike.isHotelLocation && bike.hotel) {
      router.push(`/hotels/${bike.hotel}#booking`);
      return;
    }
    
    // Otherwise, book directly on this page (free pickup locations)
    // In production, this would initiate the actual booking flow
    alert(`Booking ${bike.name} for ${selectedRental.label} rental!\n\nNext: Payment & confirmation would go here.`);
  };

  // Loading state
  if (isChecking) {
    return (
      <main className={`min-h-screen bg-gradient-to-b ${T.bgGrad} flex items-center justify-center`}>
        <Card className={`rounded-3xl ${T.border} max-w-md mx-4`}>
          <CardContent className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Checking availability...</h2>
            <p className="text-slate-600 text-sm">Please wait while we verify this bike is ready for you.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  // Bike unavailable - show message before redirect
  if (bike && !bike.available) {
    return (
      <main className={`min-h-screen bg-gradient-to-b ${T.bgGrad} flex items-center justify-center`}>
        <Card className={`rounded-3xl ${T.border} max-w-md mx-4`}>
          <CardContent className="p-12 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Bike Currently Rented</h2>
            <p className="text-slate-700 mb-2">
              <strong>{bike.name}</strong> is currently out on an adventure.
            </p>
            {bike.returnDate && (
              <p className="text-sm text-slate-600 mb-4">
                Expected return: {bike.returnDate}
              </p>
            )}
            <p className="text-slate-600 mb-6">
              Redirecting you to {bike.location} to see other available bikes...
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild variant="outline" className={`rounded-2xl ${T.ctaOutline}`}>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </Button>
              <Button asChild className={`rounded-2xl ${T.cta}`}>
                <Link href={`/hotels/${bike.hotel}`}>
                  View {bike.location}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  // Bike not found (should have redirected already)
  if (!bike) {
    return null;
  }

  // Bike available - show booking interface
  return (
    <main className={`min-h-screen bg-gradient-to-b ${T.bgGrad} text-slate-800`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bike className={`h-6 w-6 ${T.brandIcon}`} />
            <span className="font-semibold tracking-wide text-slate-900">Oahu.BIKE</span>
            <span className="text-slate-400 mx-2">•</span>
            <span className="text-sm text-slate-600">Bike #{bikeId}: {bike.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero - Bike Available */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Card className={`rounded-3xl ${T.border} bg-gradient-to-r from-green-50 to-teal-50 border-green-200`}>
          <CardContent className="p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="h-12 w-12 text-green-600 flex-shrink-0" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {bike.name} is Available!
                </h1>
                <p className="text-lg text-slate-700">
                  Located at {bike.location} • Ready to ride right now
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 bg-white/60 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <Bike className={`h-5 w-5 ${T.brandIcon}`} />
                <div>
                  <div className="text-xs text-slate-500">Bike ID</div>
                  <div className="font-medium">#{bikeId}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <KeySquare className={`h-5 w-5 ${T.brandIcon}`} />
                <div>
                  <div className="text-xs text-slate-500">Pickup</div>
                  <div className="font-medium">Contactless</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Lock className={`h-5 w-5 ${T.brandIcon}`} />
                <div>
                  <div className="text-xs text-slate-500">Includes</div>
                  <div className="font-medium">Helmet & U-lock</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Rental Options */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Rental Duration</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          {RENTAL_OPTIONS.map((option) => (
            <Card
              key={option.id}
              className={`rounded-3xl cursor-pointer transition-all bg-white ${
                selectedOption === option.id
                  ? `border-sky-400 border-2 shadow-lg`
                  : `${T.border} hover:border-sky-200`
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg text-slate-900">{option.label}</h3>
                  {selectedOption === option.id && (
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                  )}
                </div>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-slate-900">${option.price}</span>
                  <span className="text-sm text-slate-500 ml-1">{option.unit}</span>
                </div>
                <div className="text-sm text-slate-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {option.duration}
                  </div>
                  <p className="text-xs text-slate-700">{option.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking CTA */}
        <Card className={`rounded-3xl ${T.border} max-w-2xl mx-auto`}>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Complete Your Booking</h3>
              <p className="text-slate-600">
                {RENTAL_OPTIONS.find(opt => opt.id === selectedOption)?.label} rental for {bike.name}
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Rental Duration</span>
                <span className="font-medium">
                  {RENTAL_OPTIONS.find(opt => opt.id === selectedOption)?.label}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Price</span>
                <span className="font-medium">
                  ${RENTAL_OPTIONS.find(opt => opt.id === selectedOption)?.price}
                  <span className="text-sm text-slate-500 ml-1">
                    {RENTAL_OPTIONS.find(opt => opt.id === selectedOption)?.unit}
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-600">Bike Location</span>
                <span className="font-medium">{bike.location}</span>
              </div>
            </div>

            <Button
              onClick={handleBooking}
              className={`w-full ${T.cta} rounded-2xl text-lg py-6`}
            >
              <Calendar className="h-5 w-5 mr-2" />
              {bike.isHotelLocation ? `Book at ${bike.location}` : `Book ${bike.name} Now`}
            </Button>

            {bike.isHotelLocation && (
              <p className="text-xs text-slate-500 text-center mt-3">
                📍 Booking through {bike.location} to support our hotel partner
              </p>
            )}

            <div className="mt-4 flex items-start gap-2 text-xs text-slate-500">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>
                You&rsquo;ll receive lockbox code via text within 1 hour of your start time. 
                Helmet, U-lock, and riding instructions included.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* U-Lock Tutorial */}
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
                  <Lock className={`h-5 w-5 ${T.brandIcon}`} />
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

      {/* Pickup Location Info */}
      <section className="mx-auto max-w-6xl px-4 py-8 mb-12">
        <Card className={`rounded-3xl ${T.border}`}>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Pickup Location Details</h3>
            <p className="text-sm text-slate-600 mb-4">
              This bike is available at {bike.location}. After booking, you&rsquo;ll receive:
            </p>
            <ul className="text-sm text-slate-600 space-y-2 mb-4">
              <li>• Exact bike rack location at the hotel</li>
              <li>• Lockbox code (sent 1 hour before pickup)</li>
              <li>• Helmet sizing guide and safety tips</li>
              <li>• Local route recommendations</li>
            </ul>
            <Button asChild variant="outline" className={`rounded-2xl ${T.ctaOutline}`}>
              <Link href={`/hotels/${bike.hotel}`}>
                View {bike.location} Details
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white/70 mt-12">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bike className={`h-5 w-5 ${T.brandIcon}`} />
            <span className="font-semibold">Oahu.BIKE</span>
          </div>
          <p className="text-sm text-slate-600">Scan the QR code on any bike to book instantly</p>
          <div className="text-xs text-slate-500 mt-2">© {new Date().getFullYear()} Oahu.BIKE. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
