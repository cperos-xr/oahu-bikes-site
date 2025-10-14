import { redirect } from "next/navigation";
import Link from "next/link";
import { Bike, Calendar, Lock, Hotel, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBikeById } from "@/lib/bikes";

const BOOK_URL = process.env.NEXT_PUBLIC_BOOK_URL || "https://book.oahu.bike";

export default async function QRBookingPage({ params, searchParams }) {
  const { id } = params;
  const bike = getBikeById(id);

  // If no such bike, fallback to home
  if (!bike) {
    redirect("/");
  }

  // If bike is rented, redirect to hotel page if known, else home
  if (bike.status !== "available") {
    if (bike.hotelSlug) redirect(`/hotels/${bike.hotelSlug}`);
    redirect("/");
  }

  // Build booking links with query params so backend/Peek can consume later
  const makeLink = (rate) => {
    const url = new URL(BOOK_URL);
    url.searchParams.set("bikeId", bike.id);
    url.searchParams.set("rate", rate);
    if (bike.hotelSlug) url.searchParams.set("hotel", bike.hotelSlug);
    return url.toString();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </Button>
            <div className="h-6 border-r border-slate-300" />
            <div className="flex items-center gap-2 text-slate-700">
              <Bike className="h-5 w-5 text-sky-500" />
              <span className="font-semibold">Bike #{bike.id}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <Card className="rounded-3xl border-sky-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-sky-500" />
              Unlock & Book This Bike
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-slate-600">
              {bike.hotelSlug ? (
                <div className="flex items-center gap-2">
                  <Hotel className="h-4 w-4 text-sky-500" />
                  <span>Located at: <strong>/hotels/{bike.hotelSlug}</strong></span>
                </div>
              ) : (
                <div>Designated pickup location</div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-3 pt-2">
              <Button asChild className="rounded-2xl bg-sky-600 hover:bg-sky-700">
                <a href={makeLink("half-day")} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Half‑Day
                </a>
              </Button>
              <Button asChild className="rounded-2xl bg-sky-600 hover:bg-sky-700">
                <a href={makeLink("full-day")} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Full‑Day
                </a>
              </Button>
              <Button asChild className="rounded-2xl bg-sky-600 hover:bg-sky-700">
                <a href={makeLink("multi-day")} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Multi‑Day
                </a>
              </Button>
            </div>

            <p className="text-xs text-slate-500">Helmets & U‑locks included. You&rsquo;ll receive a lockbox code by text after booking.</p>
          </CardContent>
        </Card>

        <div className="text-xs text-slate-500 text-center mt-6">
          Scanned QR from sticker? Save this URL to manage your rental.
        </div>
      </section>
    </main>
  );
}
