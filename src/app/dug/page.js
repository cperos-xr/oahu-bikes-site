"use client";

import React from "react";
import { Volume2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOUNDS = [
  { id: "a-ball", label: "A Ball", file: "/dug/a_ball.mp3" },
  { id: "cone-of-shame", label: "Cone of Shame", file: "/dug/cone_of_shame.mp3" },
  { id: "good-and-smart", label: "Good and Smart", file: "/dug/good_and_smart.mp3" },
  { id: "hi-there", label: "Hi There", file: "/dug/hi_there.mp3" },
  { id: "love-you", label: "Love You", file: "/dug/love_you.mp3" },
  { id: "master-made", label: "Master Made Me", file: "/dug/master_made_me_this_collar.mp3" },
  { id: "name-is-dug", label: "Name is Dug", file: "/dug/name_is_dug.mp3" },
  { id: "stop-dogs", label: "Stop Dogs", file: "/dug/stop_dogs.mp3" },
  { id: "yes", label: "Yes", file: "/dug/yes.mp3" },
];

export default function DugSoundboard() {
  const audioRef = React.useRef(null);

  const playSound = (file) => {
    if (audioRef.current) {
      audioRef.current.src = file;
      audioRef.current.currentTime = 0; // Start from beginning
      audioRef.current.play().catch(() => {
        // Autoplay policy may block in some browsers, but user click should work
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 text-slate-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-6 w-6 text-amber-600" />
            <span className="font-semibold tracking-wide text-slate-900">Dug Soundboard</span>
          </div>
          <Button asChild variant="outline" className="rounded-2xl">
            <a href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Home
            </a>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            🐕 Dug Soundboard
          </h1>
          <p className="text-lg text-slate-600">
            Press any button to hear Dug&rsquo;s iconic quotes. Tap as many times as you want!
          </p>
        </div>

        {/* Soundboard Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6">
          {SOUNDS.map((sound) => (
            <button
              key={sound.id}
              onClick={() => playSound(sound.file)}
              className="group relative aspect-square rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-2 p-4 cursor-pointer"
            >
              <Volume2 className="h-8 w-8 md:h-10 md:w-10 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs md:text-sm font-semibold text-white text-center leading-tight break-words">
                {sound.label}
              </span>
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-amber-100 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-2">💡 Pro Tip</h2>
          <p className="text-sm text-slate-600">
            Each button plays its sound instantly. You can tap multiple buttons rapidly to create fun sound mashups!
          </p>
        </div>
      </section>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} crossOrigin="anonymous" />

      {/* Footer */}
      <footer className="border-t border-amber-100 bg-white/50 mt-12">
        <div className="mx-auto max-w-4xl px-4 py-6 text-center text-sm text-slate-600">
          <p>Sounds by Dug — Up! Up! Up!</p>
        </div>
      </footer>
    </main>
  );
}
