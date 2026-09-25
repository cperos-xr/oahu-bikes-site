import Link from "next/link";
import { ArrowLeft, Bike } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/booking/config";

// Minimal nav + footer for the booking pages, matching the homepage style.
export default function SimpleShell({ children }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-800">
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Bike className="h-6 w-6 text-sky-500" />
            <span className="font-semibold tracking-wide text-slate-900">Oahu.BIKE</span>
          </Link>
          <Link href="/" className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-700">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </div>
      </nav>
      {children}
      <footer className="border-t border-slate-100 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-600">
          Questions?{" "}
          <a className="text-sky-700 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <div className="mt-2 text-xs text-slate-500">© {new Date().getFullYear()} Oahu.BIKE. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
