import React from "react";
import Link from "next/link";

export default function PhilosophyBanner() {
  return (
    <section
      aria-label="QwikHelp Core Promise"
      className="w-full bg-linear-to-b from-blue-900 to-gray-950 text-white py-16 sm:py-20 relative overflow-hidden"
    >
      {/* Subtle ambient light glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-brand-blue/25 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs mb-4">
          <span className="text-xs font-semibold text-blue-200">
            Our Standard
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-[1.2] text-balance font-sans text-white">
          Getting help around the house should bring peace of mind, never anxiety.
        </h2>

        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed text-pretty font-normal">
          We built QwikHelp so you never have to wonder if an artisan is qualified, worry if they&apos;ll vanish with your deposit, or stress about who covers the cost if a job goes wrong.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="#get-started"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white text-gray-950 font-semibold text-sm shadow-md transition-[background-color,transform] duration-150 hover:bg-gray-100 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
          >
            Experience QwikHelp
          </Link>
          <span className="text-xs text-blue-200/70">
            100% verified artisans • Escrow security
          </span>
        </div>
      </div>
    </section>
  );
}
