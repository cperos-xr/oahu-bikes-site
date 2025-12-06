"use client";

import { Calendar } from "lucide-react";

const BOOK_URL = process.env.NEXT_PUBLIC_BOOK_URL || "https://book.peek.com/s/319bb68d-5272-40cc-b627-a3787f443677/4xvox";

export default function PeekTestPage() {
  return (
    <main className="min-h-screen flex items-start justify-center bg-slate-50 py-16">
      <section
        id="peek-test"
        className="w-full max-w-5xl px-4"
        style={{ overflow: "visible" }}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">Peek Widget Test</h1>
          <p className="text-slate-600 mt-2">This page isolates the Peek Pro widget with minimal styling.</p>
        </div>

        <div className="flex justify-center mb-8">
          <a
            href={BOOK_URL}
            data-embed="true"
            data-button-text="Book Now"
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-8 py-4 text-white text-lg font-medium shadow hover:bg-sky-700"
          >
            <Calendar className="h-6 w-6" />
            Open Booking Widget
          </a>
        </div>

        <p className="text-xs text-slate-500 text-center">
          If the widget is still cropped here, the constraint is likely inside Peek&apos;s own markup; otherwise, the issue is with the homepage layout.
        </p>
      </section>
    </main>
  );
}
