"use client";

import { useState } from "react";
import Image from "next/image";
import {
  OrangeFlower,
  BlueRibbon,
  GreenDaisy,
  YellowSunburst,
} from "./DoodleBadges";

interface HeroImageStageProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroImageStage({
  imageSrc = "/hero-workers.png",
  imageAlt = "QwikHelp verified professionals: chef, electrician, plumber, and carpenter ready to help",
}: HeroImageStageProps) {
  const [showSlotGuide, setShowSlotGuide] = useState(false);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 md:mt-12">
      {/* =========================================================================
          DECORATIVE DOODLE ACCENTS (Positioned around the image stage)
          ========================================================================= */}
      {/* Top Left: Orange Flower */}
      <div className="absolute -top-6 left-6 sm:left-12 md:left-16 z-20">
        <OrangeFlower />
      </div>

      {/* Bottom Left: Blue Ribbon Badge */}
      <div className="absolute bottom-16 sm:bottom-24 left-4 sm:left-8 md:left-12 z-20">
        <BlueRibbon />
      </div>

      {/* Top Right: Green 8-petal Daisy */}
      <div className="absolute -top-4 sm:-top-8 right-6 sm:right-14 md:right-20 z-20">
        <GreenDaisy />
      </div>

      {/* Bottom Right: Golden Yellow Sunburst */}
      <div className="absolute bottom-20 sm:bottom-28 right-4 sm:right-8 md:right-12 z-20">
        <YellowSunburst />
      </div>

      {/* =========================================================================
          THE IMAGE SPACE / CONTAINER
          ========================================================================= */}
      <div className="relative mx-auto w-full group">
        {/* Soft Ambient Grounding Glow */}
        <div
          className="absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-16 sm:h-24 bg-gradient-to-t from-gray-200/50 via-gray-100/30 to-transparent blur-2xl rounded-[100%] pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Dedicated Image Frame / Slot */}
        <div
          id="hero-image-container"
          className="relative w-full overflow-hidden flex items-end justify-center"
          style={{ minHeight: "280px" }}
        >
          {/* Main Hero Workers Image */}
          <div className="relative w-full aspect-16/10 sm:aspect-16/9 max-w-4xl mx-auto flex items-end justify-center">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1600}
              height={900}
              priority
              className="w-full h-auto object-contain object-bottom select-none"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
            />
          </div>

          {/* Slot Guide Overlay (Toggleable inspect mode) */}
          {showSlotGuide && (
            <div className="absolute inset-0 bg-blue-50/90 border-2 border-dashed border-brand-blue rounded-3xl flex flex-col items-center justify-center p-6 text-center z-30 backdrop-blur-xs animate-in fade-in duration-150">
              <div className="size-12 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center mb-3">
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900">
                Hero Image Space Slot
              </h4>
              <p className="text-sm text-gray-600 max-w-md mt-1">
                Target location: <code className="bg-white px-2 py-0.5 rounded text-brand-blue font-mono text-xs">/public/hero-workers.png</code>
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-left bg-white p-3 rounded-xl border border-blue-100 max-w-sm">
                <div>
                  <span className="font-semibold text-gray-800">Aspect Ratio:</span> 16:9 or 16:10
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Recommended:</span> 1600 × 900 px
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Format:</span> PNG (transparent or white BG)
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Current Source:</span> {imageSrc}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSlotGuide(false)}
                className="mt-4 px-4 py-1.5 bg-brand-blue text-white text-xs font-semibold rounded-full shadow-2xs hover:bg-brand-blue-hover motion-safe:active:scale-[0.96] transition-colors duration-150 [-webkit-tap-highlight-color:transparent]"
              >
                Close Guide
              </button>
            </div>
          )}
        </div>

        {/* Developer / Designer Helper Pill */}
        <div className="flex justify-center mt-3">
          <button
            type="button"
            onClick={() => setShowSlotGuide(!showSlotGuide)}
            className="text-[11px] font-medium text-gray-400 hover:text-brand-blue inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200/60 bg-white/70 hover:bg-white hover:border-blue-200 shadow-2xs transition-[color,background-color,border-color] duration-150 [-webkit-tap-highlight-color:transparent]"
            title="Inspect hero image container specifications"
          >
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {showSlotGuide ? "Hide Image Slot Guide" : "Hero Image Slot Info"}
          </button>
        </div>
      </div>
    </div>
  );
}
