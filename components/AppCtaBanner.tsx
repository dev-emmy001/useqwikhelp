import React from "react";
import Link from "next/link";

export default function AppCtaBanner() {
  return (
    <section
      id="download"
      aria-label="Download QwikHelp App"
      className="w-full py-16 sm:py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Outer banner box with concentric radius: rounded-3xl with padding p-8 sm:p-12 */}
        <div className="relative rounded-3xl bg-linear-to-br from-brand-blue via-blue-700 to-indigo-900 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_20px_50px_-12px_rgba(30,91,247,0.35)]">
          {/* Subtle Ambient Radial Highlight */}
          <div
            className="absolute top-0 right-0 size-96 bg-white/10 blur-3xl rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl text-center md:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-xs">
              <span className="text-xs font-semibold text-white">
                Available on iOS &amp; Android
              </span>
            </div>

            {/* Headline */}
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-balance font-sans text-white">
              Ready for verified help without the headache?
            </h2>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-blue-100/90 leading-relaxed text-pretty font-normal">
              Download QwikHelp today to browse verified cooks, cleaners, plumbers, and technicians near you. Your first booking is 100% covered by our recourse guarantee.
            </p>

            {/* Download Store Buttons */}
            <div className="mt-8 flex flex-row items-center justify-center md:justify-start gap-3.5 sm:gap-4 flex-wrap">
              {/* App Store */}
              <a
                href="#app-store"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white text-gray-950 font-semibold text-sm shadow-md transition-[background-color,transform] duration-150 hover:bg-gray-100 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
              >
                <svg className="size-6 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.13.65-2.79 1.42-.58.67-1.1 1.74-.96 2.78 1.07.09 2.13-.58 2.74-1.33z" />
                </svg>
                <div className="text-left">
                  <span className="text-[10px] text-gray-500 block leading-none font-normal">Download on</span>
                  <span className="text-sm font-bold leading-tight block">App Store</span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#google-play"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white text-gray-950 font-semibold text-sm shadow-md transition-[background-color,transform] duration-150 hover:bg-gray-100 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
              >
                <svg className="size-6 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186a1.99 1.99 0 0 1-.61-1.428V3.242c0-.53.22-1.037.609-1.428zm11.312 11.314l2.122 2.121-11.83 6.83 9.708-8.951zm2.828-1.414l2.829 1.633c.854.494.854 1.294 0 1.787l-2.83 1.634-2.313-2.314 2.314-2.74zm-2.828-1.414L5.213 1.363l11.83 6.83-2.122 2.121z" />
                </svg>
                <div className="text-left">
                  <span className="text-[10px] text-gray-500 block leading-none font-normal">Get it on</span>
                  <span className="text-sm font-bold leading-tight block">Google Play</span>
                </div>
              </a>
            </div>

            {/* Provider callout */}
            <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-3 flex-wrap text-xs text-blue-100">
              <span>Are you a qualified artisan or cleaner?</span>
              <Link
                href="#provider"
                className="font-bold text-white underline underline-offset-2 hover:text-blue-200"
              >
                Apply to become a verified QwikHelp pro →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
