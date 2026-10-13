"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About"
      className="w-full py-16 sm:py-24 border-y border-gray-100"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* =========================================================================
            TOP ROW: 2-COLUMN LAYOUT (Text Left, Visual Stage Right)
            ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          {/* LEFT COLUMN: ABOUT HEADLINE & DESCRIPTION */}
          <div className="flex-1 flex flex-col items-center md:items-start max-w-xl text-center md:text-left">
            {/* Pill Badge */}
            {/* <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100/90 text-gray-500 text-xs font-semibold tracking-wider uppercase mb-5">
              ABOUT
            </div> */}

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.1] text-balance font-sans">
              What is Qwikhelp?
            </h2>

            {/* Description Paragraph */}
            <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed text-pretty font-normal">
              BIMM is an app for people who love going out. It gives you access to
              exclusive deals and special offers from your favorite restaurants and
              cafes — all in one place.
            </p>

            {/* CTA Button: View Deals */}
            <div className="mt-8 sm:mt-10">
              <Link
                href="#deals"
                className="inline-flex items-center justify-center h-[52px] px-8 rounded-2xl bg-white text-gray-950 font-bold text-base shadow-[0px_8px_20px_0px_rgba(0,0,0,0.06),0px_2px_6px_0px_rgba(0,0,0,0.04)] border border-gray-200/80 transition-[background-color,border-color,box-shadow,transform] duration-150 hover:bg-gray-50 hover:border-gray-300 motion-safe:enabled:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
              >
                View deals
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: VISUAL STAGE WITH ASYMMETRIC MOCKUP & FLOATING CARDS */}
          <div className="flex-1 w-full relative">
            <div className="relative w-full aspect-[760/580] sm:aspect-[760/540] rounded-[40px] sm:rounded-[65px] lg:rounded-[90px] overflow-hidden bg-[#2563EB] shadow-sm">
              {/* Concentric Lime Circles Background */}
              <div
                className="absolute -left-[20%] top-[-10%] size-[600px] pointer-events-none"
                aria-hidden="true"
              >
                <svg viewBox="0 0 600 600" className="w-full h-full" fill="none">
                  <circle cx="240" cy="300" r="140" stroke="#5087FF" strokeWidth="48" opacity="0.9" />
                  <circle cx="240" cy="300" r="235" stroke="#5087FF" strokeWidth="52" opacity="0.9" />
                  <circle cx="240" cy="300" r="335" stroke="#5087FF" strokeWidth="58" opacity="0.9" />
                </svg>
              </div>

              {/* Main Model Photo (from reference) */}
              <div className="absolute inset-0">
                <Image
                  src="/about-image.png"
                  alt="Person enjoying food with BIMM"
                  fill
                  priority
                  className="object-cover object-[center_top] pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 760px"
                />
              </div>

              {/* Floating Element 1: Speech Bubble with Coffee & Croissant */}
              <div className="block absolute left-[16%] sm:left-[26%] top-[34%] sm:top-[42%] z-20 scale-[0.78] sm:scale-100 origin-bottom-left motion-safe:animate-doodle-float-1">
                <div className="relative w-[114px] h-[64px] drop-shadow-[0px_6px_14px_rgba(0,0,0,0.1)]">
                  {/* Speech bubble SVG shape */}
                  <svg
                    viewBox="0 0 118 66.8232"
                    fill="none"
                    className="w-full h-full"
                    aria-hidden="true"
                  >
                    <path
                      d="M118 41.9547C118 51.368 110.369 58.999 100.956 58.999H95.3286C92.4689 58.999 89.8129 60.4792 88.3084 62.9112C85.0818 68.1271 77.4949 68.1273 74.2685 62.9112C72.7642 60.4792 70.1082 58.999 67.2485 58.999H17.0444C7.63103 58.999 0 51.368 0 41.9546V17.0444C0 7.63102 7.63103 0 17.0444 0H100.956C110.369 0 118 7.63103 118 17.0444V41.9547Z"
                      fill="white"
                    />
                  </svg>
                  {/* Inside Icons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-1 pb-2.5">
                    <div className="size-9 relative">
                      <Image
                        src="/coffee-cup.webp"
                        alt="Coffee cup"
                        fill
                        sizes="36px"
                        className="object-contain"
                      />
                    </div>
                    <div className="size-9 relative">
                      <Image
                        src="/croissant.webp"
                        alt="Croissant"
                        fill
                        sizes="36px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element 2: "Scan your QR and enjoy rewards" pill badge */}
              <div className="flex absolute left-2 sm:left-[3%] top-[48%] sm:top-[56%] bg-white rounded-[18px] sm:rounded-[24px] px-3 sm:px-5 py-2 sm:py-3 shadow-[0px_8px_24px_rgba(0,0,0,0.12)] items-center gap-2.5 sm:gap-3.5 z-20 max-w-[240px] sm:max-w-[290px] border border-gray-100/60 scale-[0.78] sm:scale-100 origin-left">
                <div className="size-9 sm:size-12 rounded-lg sm:rounded-xl bg-[#2563EB] flex items-center justify-center shrink-0">
                  <svg
                    className="size-5 sm:size-7"
                    viewBox="0 0 36 36"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M3 13.5V10.5C3 6 6 3 10.5 3H13.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22.5 3H25.5C30 3 33 6 33 10.5V13.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M33 24V25.5C33 30 30 33 25.5 33H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.5 33H10.5C6 33 3 30 3 25.5V22.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 14.25V12.75C24 10.5 22.5 9 20.25 9H15.75C13.5 9 12 10.5 12 12.75V14.25" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 21.75V23.25C24 25.5 22.5 27 20.25 27H15.75C13.5 27 12 25.5 12 23.25V21.75" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 18H30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-xs sm:text-base sm:text-[17px] text-gray-950 leading-snug">
                  <span className="font-bold text-[#2563EB]">Scan your QR </span>
                  <span className="font-normal">and enjoy rewards</span>
                </p>
              </div>

              {/* Floating Element 3: Stacked Loyalty Stamp Cards on Bottom Right */}
              <div className="block absolute right-1 sm:right-[4%] bottom-2 sm:bottom-[3%] z-10 scale-[0.68] sm:scale-100 origin-bottom-right">
                <div className="flex flex-col items-center">
                  {/* Card 1: Back layer (depth scale) */}
                  <div className="scale-[0.72] opacity-25 -mb-28 pointer-events-none">
                    <StampCardItem isBackLayer />
                  </div>

                  {/* Card 2: Middle layer */}
                  <div className="scale-[0.86] opacity-80 -mb-20 pointer-events-none">
                    <StampCardItem isBackLayer />
                  </div>

                  {/* Card 3: Front layer */}
                  <div className="scale-100 z-10 shadow-[0px_16px_36px_rgba(0,0,0,0.16)] rounded-[18px]">
                    <StampCardItem />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM ROW: 3 FEATURE COLUMNS (Exact match to reference)
            ========================================================================= */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-14 pt-8">
          {/* Feature 1: Exclusive Deals */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Lime Icon Container */}
            <div className="size-[50px] rounded-[18px] bg-[#81a9ff9b] flex items-center justify-center shrink-0 shadow-2xs">
              <svg
                className="size-6 text-[#2563EB]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12.586 2.586C12.211 2.2109 11.7024 2.00011 11.172 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V11.172C2.00011 11.7024 2.2109 12.211 2.586 12.586L11.29 21.29C11.7445 21.7416 12.3592 21.9951 13 21.9951C13.6408 21.9951 14.2555 21.7416 14.71 21.29L21.29 14.71C21.7416 14.2555 21.9951 13.6408 21.9951 13C21.9951 12.3592 21.7416 11.7445 21.29 11.29L12.586 2.586Z"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="7.5" cy="7.5" r="1.5" fill="#2563EB" />
              </svg>
            </div>

            <h3 className="mt-5 text-xl sm:text-[22px] font-bold text-gray-950 font-sans tracking-tight">
              Exclusive Deals
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed text-pretty">
              Access deals at top-rated restaurants and local cafes
            </p>
          </div>

          {/* Feature 2: Loyalty Cards */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Lime Icon Container */}
            <div className="size-[50px] rounded-[18px] bg-[#81a9ff9b] flex items-center justify-center shrink-0 shadow-2xs">
              <svg
                className="size-6 text-[#2563EB]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 5H4C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5Z"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M2 10H22" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 className="mt-5 text-xl sm:text-[22px] font-bold text-gray-950 font-sans tracking-tight">
              Loyalty Cards
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed text-pretty">
              Forget about the hassle with paper stamp cards
            </p>
          </div>

          {/* Feature 3: Easy to Use */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Lime Icon Container */}
            <div className="size-[50px] rounded-[18px] bg-[#81a9ff9b] flex items-center justify-center shrink-0 shadow-2xs">
              <svg
                className="size-6 text-[#2563EB]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13 2L3 14h7v8l10-12h-7l0-8z"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="mt-5 text-xl sm:text-[22px] font-bold text-gray-950 font-sans tracking-tight">
              Easy to Use
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed text-pretty">
              Save time with a streamlined process that works in seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Stamp card unit used in the stacked 3D deck on the right
 */
function StampCardItem({ isBackLayer = false }: { isBackLayer?: boolean }) {
  return (
    <div className="w-[300px] sm:w-[324px] rounded-[18px] bg-white p-2 border border-gray-100 flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        {/* Left Coffee Preview */}
        <div className="size-[84px] shrink-0 rounded-[12px] bg-[#F9F7F0] flex items-center justify-center overflow-hidden p-1">
          <div className="relative size-16">
            <Image
              src="/coffee-cup.webp"
              alt="Free matcha drink"
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0 flex-1">
              <h4 className="text-[17px] font-bold text-gray-950 truncate leading-snug">
                Free matcha
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2 mt-0.5 leading-snug">
                Collect 6 stamps and get a free...
              </p>
            </div>
            {/* Checkmark box */}
            <div className="size-8 rounded-[10px] bg-gray-100/80 flex items-center justify-center shrink-0 text-gray-900">
              <svg className="size-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bars & Scans Counter */}
      {!isBackLayer && (
        <div className="pt-1 border-t border-gray-50 flex flex-col gap-1.5 px-0.5">
          <div className="flex h-1.5 gap-1.5 w-full">
            <div className="h-1.5 flex-1 rounded-full bg-[#5087FF]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#5087FF]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#5087FF]" />
            <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
            <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
            <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
          </div>
          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="text-gray-500 font-normal">3 of 6 scans</span>
            <span className="font-bold text-gray-900">3 more</span>
          </div>
        </div>
      )}
    </div>
  );
}
