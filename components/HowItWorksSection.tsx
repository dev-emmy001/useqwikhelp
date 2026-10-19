"use client";

import {
  CalendarCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  BroomIcon,
  CookingPotIcon,
  HammerIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShieldCheckIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

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
        <div className="relative w-full max-w-[270px] rounded-2xl bg-white p-4 shadow-md">
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
        <div className="relative w-full max-w-[270px] rounded-2xl bg-white p-4 text-left shadow-md">
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
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent-green-light px-3 py-2 text-xs font-medium text-emerald-800">
            <ShieldCheckIcon size={16} weight="fill" />
            Payment protected in escrow
          </div>
        </div>
      )}

      {step === "complete" && (
        <div className="relative w-full max-w-[270px] rounded-2xl bg-white p-4 text-left shadow-md">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-green-light text-emerald-700">
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
              <div className="h-full w-full rounded-full bg-accent-green" />
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
              className="flex min-w-0 flex-col rounded-[28px] bg-white p-5 shadow-sm sm:p-6 lg:p-7"
            >
              <div className="mb-3 text-center text-sm font-semibold text-brand-blue">
                Step {Number(step.number)}
              </div>
              <h3 className="min-h-[3.5rem] text-center text-xl font-bold leading-snug text-gray-950 text-balance sm:text-2xl">
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

        <aside
          aria-labelledby="how-it-works-cta-title"
          className="relative mt-16 overflow-hidden rounded-[32px] bg-[#f4f3ec] px-5 py-10 text-center sm:mt-20 sm:rounded-[40px] sm:px-8 sm:py-14 lg:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-460px] h-[620px] w-[min(1000px,140vw)] -translate-x-1/2 rounded-[50%] bg-white/60"
          />

          <div className="relative mx-auto max-w-2xl">
            <div
              aria-hidden="true"
              className="mx-auto flex h-36 max-w-sm items-start justify-center gap-2 sm:h-44 sm:gap-4"
            >
              {serviceIcons.map(({ label, icon: Icon, position }, index) => (
                <span
                  key={label}
                  className={`flex size-14 shrink-0 items-center justify-center rounded-[20px] shadow-sm sm:size-[72px] sm:rounded-[24px] ${
                    index % 2 === 0
                      ? "bg-white text-brand-blue"
                      : "bg-brand-blue text-white"
                  } ${position}`}
                >
                  <Icon size={28} weight="fill" className="sm:hidden" />
                  <Icon size={34} weight="fill" className="hidden sm:block" />
                </span>
              ))}
            </div>

            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-blue shadow-sm">
              Help is closer than you think
            </span>
            <h3
              id="how-it-works-cta-title"
              className="mx-auto mt-4 max-w-xl text-3xl font-extrabold leading-tight text-gray-950 text-balance sm:text-4xl lg:text-5xl"
            >
              Home help should feel simple, not stressful.
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-gray-600 text-pretty sm:text-lg">
              Book trusted local professionals, pay securely, and know you have
              support if anything goes wrong.
            </p>
            <Link
              href="#get-started"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-gray-950 px-6 text-sm font-semibold text-white shadow-md transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-950"
            >
              Find your help
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Trusted help for the jobs that matter.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
