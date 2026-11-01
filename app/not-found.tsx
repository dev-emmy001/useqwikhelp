"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  HouseIcon,
  CompassIcon,
  ChatCircleDotsIcon,
  WrenchIcon,
  CookingPotIcon,
  LightningIcon,
} from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFF] flex flex-col selection:bg-blue-100 selection:text-brand-blue">
      {/* Docked / Floating Navbar */}
      <Navbar />

      {/* Main 404 Hero Section - Centered */}
      <main className="flex-1 flex flex-col items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12 relative w-full">
        {/* Soft Ambient Radial Background Glow */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-blue-100/60 via-indigo-50/30 to-transparent blur-3xl rounded-full pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Playful Graphical 404 Stage */}
          <div className="relative my-4 sm:my-6 flex items-center justify-center select-none animate-fade-in-up animation-delay-100">


            {/* Big "4" */}
            <span className="text-[96px] sm:text-[140px] md:text-[170px] font-black tracking-tighter text-gray-900 leading-none font-sans drop-shadow-xs">
              4
            </span>

            {/* Custom Interactive Service Portal "0" */}
            <div className="relative mx-2 sm:mx-4 flex size-24 sm:size-36 md:size-44 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-brand-blue to-indigo-700 shadow-xl shadow-brand-blue/20">
              {/* Outer rotating dashed track */}
              <div
                className="absolute inset-1.5 sm:inset-2.5 rounded-full border-2 border-dashed border-white/40 animate-spin"
                style={{ animationDuration: "24s" }}
                aria-hidden="true"
              />

              {/* Inner Portal Center */}
              <div className="relative flex size-16 sm:size-24 md:size-28 flex-col items-center justify-center rounded-full bg-white text-gray-900 shadow-inner">
                <span className="flex size-8 sm:size-11 items-center justify-center rounded-full bg-blue-50 text-brand-blue animate-pulse">
                  <WrenchIcon size={20} weight="fill" className="text-brand-blue sm:w-6 sm:h-6" />
                </span>
                <span className="mt-1 text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-brand-blue">
                  Offline
                </span>
              </div>

              {/* Orbiting Satellite Tool Badges */}
              <span
                className="absolute -top-2 left-1/2 -translate-x-1/2 flex size-7 sm:size-8 items-center justify-center rounded-full bg-amber-400 text-gray-950 shadow-md"
                aria-hidden="true"
              >
                <LightningIcon size={14} weight="fill" />
              </span>
              <span
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex size-7 sm:size-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md"
                aria-hidden="true"
              >
                <CookingPotIcon size={14} weight="fill" />
              </span>
            </div>

            {/* Big "4" */}
            <span className="text-[96px] sm:text-[140px] md:text-[170px] font-black tracking-tighter text-gray-900 leading-none font-sans drop-shadow-xs">
              4
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-2 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-tight sm:leading-[1.15] text-gray-950 font-sans text-balance animate-fade-in-up animation-delay-200">
            Even our verified pros
            <span className="block mt-1 sm:mt-2">
              <span className="text-brand-blue font-extrabold">couldn&apos;t fix this link.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-lg md:text-[18px] leading-relaxed text-gray-600 max-w-xl font-normal text-pretty animate-fade-in-up animation-delay-300">
            The page you are looking for might have been moved, remodeled, or unplugged by an enthusiastic electrician.
            Let&apos;s get you back to safe, escrow-protected ground.
          </p>

          {/* Direct Action Buttons */}
          <div className="mt-7 sm:mt-8 flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap animate-fade-in-up animation-delay-400">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand-blue text-white text-sm sm:text-[15px] font-semibold transition-all duration-150 hover:bg-brand-blue-hover motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
            >
              <HouseIcon size={17} weight="fill" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/#services"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-gray-800 text-sm sm:text-[15px] font-medium transition-all duration-150 hover:bg-gray-100 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
            >
              <CompassIcon size={17} weight="fill" className="text-brand-blue" />
              <span>Browse Services</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-gray-700 text-sm sm:text-[15px] font-medium transition-all duration-150 hover:bg-gray-100 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
            >
              <ChatCircleDotsIcon size={17} weight="fill" className="text-gray-500" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
