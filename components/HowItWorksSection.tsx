"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  DownloadSimpleIcon,
  BroomIcon,
  CookingPotIcon,
  HammerIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShieldCheckIcon,
  WrenchIcon,
} from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    title: "Find the right pro",
    description:
      "Choose the service you need and explore trusted professionals available in your area.",
    visual: "discover",
  },
  {
    number: "02",
    title: "Book with confidence",
    description:
      "Pick a time that works for you. Your payment stays protected until the job is done.",
    visual: "book",
  },
  {
    number: "03",
    title: "Get it done, worry-free",
    description:
      "Review the completed work, then approve payment. If something is not right, we are here to help.",
    visual: "complete",
  },
] as const;

const serviceIcons = [
  { label: "Cleaning", icon: BroomIcon, position: "mt-10" },
  { label: "Cooking", icon: CookingPotIcon, position: "mt-4" },
  { label: "Repairs", icon: WrenchIcon, position: "mt-0" },
  { label: "Electrical", icon: LightningIcon, position: "mt-4" },
  { label: "Carpentry", icon: HammerIcon, position: "mt-10" },
] as const;

function StepVisual({ step }: { step: (typeof steps)[number]["visual"] }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl bg-[#0a60d9] p-5 sm:min-h-[240px]"
    >
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

      {step === "discover" && (
        <div className="relative w-full max-w-[270px] rounded-2xl bg-white p-4">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-500">
            <MagnifyingGlassIcon size={17} />
            <span>What do you need help with?</span>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue text-white">
              <WrenchIcon size={20} weight="fill" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block text-sm font-semibold text-gray-900">
                Plumbing
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                <MapPinIcon size={13} />
                Available near you
              </span>
            </span>
            <CheckCircleIcon
              className="shrink-0 text-brand-blue"
              size={19}
              weight="fill"
            />
          </div>
        </div>
      )}

      {step === "book" && (
        <div className="relative w-full max-w-[270px] rounded-2xl bg-white p-4 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">
              Your booking
            </span>
            <CalendarCheckIcon
              className="text-brand-blue"
              size={20}
              weight="fill"
            />
          </div>
          <div className="mt-3 rounded-xl bg-gray-50 p-3">
            <span className="block text-sm font-medium text-gray-800">
              Plumbing visit
            </span>
            <span className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
              <ClockIcon size={14} />
              Tomorrow, 10:00 AM
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
            <ShieldCheckIcon size={16} weight="fill" />
            Payment protected in escrow
          </div>
        </div>
      )}

      {step === "complete" && (
        <div className="relative w-full max-w-[270px] rounded-2xl bg-white p-4 text-left">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <CheckCircleIcon size={25} weight="fill" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-gray-900">
                Job completed
              </span>
              <span className="mt-0.5 block text-xs text-gray-500">
                Your home, back in order
              </span>
            </span>
          </div>
          <div className="mt-4 border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Your protection</span>
              <span className="font-semibold text-emerald-700">Active</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-full rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="w-full py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="how-it-works-title"
            className="mt-5 text-4xl font-extrabold leading-tight text-gray-950 text-balance sm:text-5xl lg:text-[56px]"
          >
            How QwikHelp works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 text-pretty sm:text-lg">
            From finding a trusted professional to getting the job done, every
            step is clear, convenient, and protected.
          </p>
        </header>

        <ol className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3 md:gap-4 lg:gap-6">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex min-w-0 flex-col rounded-[28px] bg-white p-5 sm:p-6 lg:p-7 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="mb-3 text-center text-sm font-semibold text-brand-blue">
                Step {Number(step.number)}
              </div>
              <h3 className="min-h-[3.5rem] text-center text-xl font-bold leading-snug text-gray-950 text-balance sm:text-2xl font-sans">
                {step.title}
              </h3>
              <p className="mt-2 min-h-[4.5rem] text-center text-sm leading-relaxed text-gray-600 text-pretty">
                {step.description}
              </p>
              <div className="mt-5">
                <StepVisual step={step.visual} />
              </div>
            </li>
          ))}
        </ol>

        {/* =========================================================================
            BOTTOM CALLOUT: SINGLE CIRCLES ROTATING ANTICLOCKWISE WITH "Home help should feel simple, not stressful."
            ========================================================================= */}
        <aside
          aria-labelledby="how-it-works-cta-title"
          className="relative mt-16 sm:mt-24 overflow-hidden rounded-[36px] sm:rounded-[48px] bg-[#FAF9F5] px-5 pt-8 pb-12 sm:pt-12 sm:pb-16 text-center"
        >
          {/* Subtle curved background crest / dome */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-260px] sm:top-[-360px] h-[480px] sm:h-[620px] w-[min(1100px,150vw)] -translate-x-1/2 rounded-[50%] bg-white/70"
          />

          <div className="relative mx-auto max-w-4xl flex flex-col items-center">
            {/* Orbital Stage: Single circles containing images rotating anticlockwise */}
            <div className="relative w-full h-[180px] sm:h-[230px] md:h-[260px] overflow-hidden flex items-end justify-center mb-4 sm:mb-6">
              {/* Giant Orbital Ring Rotating Anticlockwise */}
              <div
                className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 size-[620px] sm:size-[780px] md:size-[880px] rounded-full border border-dashed border-blue-200/50 animate-spin-anticlockwise pointer-events-auto hover:[animation-play-state:paused]"
              >
                {[
                  {
                    label: "Identity Verification",
                    image: "/illustrations/verify.svg",
                    accent: "border-blue-200",
                  },
                  {
                    label: "Escrow Payment",
                    image: "/illustrations/wallet.svg",
                    accent: "border-emerald-200",
                  },
                  {
                    label: "Nearby Artisans",
                    image: "/illustrations/users.svg",
                    accent: "border-amber-200",
                  },
                  {
                    label: "Guaranteed Payout",
                    image: "/illustrations/paid.svg",
                    accent: "border-cyan-200",
                  },
                  {
                    label: "Biometric Review",
                    image: "/illustrations/id-check.svg",
                    accent: "border-purple-200",
                  },
                  {
                    label: "Proximity Matching",
                    image: "/illustrations/proximity.svg",
                    accent: "border-indigo-200",
                  },
                  {
                    label: "Approved Pro",
                    image: "/illustrations/approved.svg",
                    accent: "border-rose-200",
                  },
                ].map((item, index, arr) => {
                  const angle = (index * 360) / arr.length;
                  return (
                    <div
                      key={item.label}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translate(clamp(220px, 34vw, 350px)) rotate(-${angle}deg)`,
                      }}
                    >
                      {/* Counter-rotation to keep image upright */}
                      <div className="animate-spin-clockwise hover:[animation-play-state:paused]">
                        <div
                          className={`group/circle relative size-16 sm:size-20 md:size-24 rounded-full bg-white p-3 sm:p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${item.accent} flex items-center justify-center transition-transform duration-200 hover:scale-115 cursor-pointer`}
                          title={item.label}
                        >
                          {/* Inner spinning accent ring */}
                          <div className="absolute -inset-1 rounded-full animate-spin-anticlockwise pointer-events-none" />
                          <Image
                            src={item.image}
                            alt={item.label}
                            width={64}
                            height={64}
                            className="size-full object-contain pointer-events-none"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Eyebrow Pill */}


            {/* Headline */}
            <h3
              id="how-it-works-cta-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-gray-950 font-sans tracking-[-0.03em] leading-[1.12] text-balance max-w-2xl"
            >
              Home help should feel simple, not stressful.
            </h3>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 max-w-xl text-base sm:text-lg text-gray-600 leading-relaxed text-pretty">
              QwikHelp brings payments, domestic assistance, and verified trade services
              together — giving you one trusted place to handle more of your everyday.
            </p>

            {/* Primary Action Button */}
            <div className="mt-8">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-brand-blue text-white font-bold text-sm sm:text-base shadow-[0_6px_20px_rgba(30,91,247,0.28)] transition-all duration-150 hover:bg-brand-blue-hover hover:shadow-[0_8px_24px_rgba(30,91,247,0.38)] active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
              >
                <DownloadSimpleIcon size={19} weight="bold" />
                <span>Download the App</span>
              </a>
            </div>

            {/* Bottom Caption */}
            <p className="mt-3.5 text-xs sm:text-[13px] text-gray-400 font-normal">
              Payments, vetted artisans and local home services
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
