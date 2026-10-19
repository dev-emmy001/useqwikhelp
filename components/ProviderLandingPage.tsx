"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BroomIcon,
  CalendarCheckIcon,
  ChatCircleDotsIcon,
  CheckCircleIcon,
  CookingPotIcon,
  HammerIcon,
  IdentificationCardIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  SnowflakeIcon,
  StarIcon,
  UserCheckIcon,
  WalletIcon,
  WrenchIcon,
} from "@phosphor-icons/react";

const steps = [
  {
    title: "Get verified",
    description:
      "Create your profile with your NIN or BVN, photo ID, face verification, and a guarantor.",
    icon: IdentificationCardIcon,
  },
  {
    title: "Get approved",
    description:
      "The QwikHelp team reviews your details. When your account is approved, your profile goes live.",
    icon: UserCheckIcon,
  },
  {
    title: "Meet nearby customers",
    description:
      "Go online to appear in proximity search. Receive direct requests or respond to broadcast jobs.",
    icon: MagnifyingGlassIcon,
  },
  {
    title: "Do the work. Get paid.",
    description:
      "Check that payment is in escrow before starting. After both sides confirm completion, funds reach your wallet.",
    icon: WalletIcon,
  },
];

const categories = [
  { label: "Cooking", icon: CookingPotIcon },
  { label: "Cleaning", icon: BroomIcon },
  { label: "Plumbing", icon: WrenchIcon },
  { label: "Electrical", icon: LightningIcon },
  { label: "AC servicing", icon: SnowflakeIcon },
  { label: "Carpentry", icon: HammerIcon },
];

const faqItems = [
  {
    question: "What do I need to sign up as a provider?",
    answer:
      "Provider verification includes an NIN or BVN check, photo ID, face verification, and a guarantor. Your account is reviewed before your profile goes live.",
  },
  {
    question: "When should I start a job?",
    answer:
      "Start only after you can see that the customer's payment has been confirmed in escrow in the app.",
  },
  {
    question: "How do I receive my earnings?",
    answer:
      "When you and the customer confirm the job is complete, the funds are credited to your in-app wallet. You can withdraw to a Nigerian bank account on demand.",
  },
  {
    question: "Can I pay to appear higher in search?",
    answer:
      "No. Provider visibility is earned through customer ratings, job completion rate, and response time. Providers cannot buy a higher position.",
  },
  {
    question: "How do I communicate with customers?",
    answer:
      "QwikHelp keeps job conversations in-app with text chat, voice notes, and voice calls, so you can discuss the work without sharing your personal number.",
  },
  {
    question: "What if a customer raises a dispute?",
    answer:
      "QwikHelp provides a formal dispute process. Keep job communication in the app and submit relevant details or evidence through the process.",
  },
];

export default function ProviderLandingPage() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFF] flex flex-col overflow-x-hidden selection:bg-blue-100 selection:text-brand-blue">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <main
        id="provider"
        aria-labelledby="provider-title"
        className="flex-1 flex flex-col items-center justify-start pt-8 md:pt-28 lg:pt-32 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12 relative w-full"
      >
        {/* Soft Ambient Background Highlights */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent blur-3xl rounded-full pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Hero Text Content Container */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Main Display Headline */}
          <h1
            id="provider-title"
            className="text-[34px] sm:text-5xl md:text-[56px] lg:text-[62px] font-extrabold tracking-[-0.03em] leading-[1.12] text-gray-950 font-sans text-balance"
          >
            Good work deserves
            <span className="block mt-1 sm:mt-2">
              <span className="text-brand-blue font-extrabold">to be seen.</span>
            </span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="mt-5 sm:mt-6 text-[15px] sm:text-lg md:text-[18.5px] leading-relaxed text-gray-600 max-w-2xl font-normal text-pretty px-2">
            Find customers beyond your usual circle. Agree on the job in-app. Know
            payment is protected in escrow before you begin.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-row items-center justify-center gap-3.5 sm:gap-4 flex-wrap">
            {/* Primary CTA */}
            <Link
              href="#getting-started"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand-blue text-white text-sm sm:text-[15px] font-semibold shadow-[0_4px_16px_0_rgba(30,91,247,0.38)] transition-[background-color,box-shadow,transform] duration-150 hover:bg-brand-blue-hover hover:shadow-[0_8px_24px_0_rgba(30,91,247,0.48)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
            >
              <span>Join as a provider</span>
              <svg
                className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="#provider-journey"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-gray-800 text-sm sm:text-[15px] font-medium border border-gray-200/90 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-[background-color,border-color,transform] duration-150 hover:bg-gray-50/80 hover:border-gray-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
            >
              See how it works
            </Link>
          </div>

          {/* Inline Trust Signals */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-gray-200/70 pt-6">
            {[
              { label: "Every job", meta: "Escrow-protected" },
              { label: "All providers", meta: "Verified identities" },
              { label: "No paid slots", meta: "Merit-based ranking" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-sm sm:text-[15px] font-bold text-gray-950">
                  {s.label}
                </span>
                <span className="text-xs text-gray-500">{s.meta}</span>
              </div>
            ))}
          </div>
        </div>

        {/* HERO IMAGE STAGE */}
        <div className="relative z-10 mx-auto mt-10 sm:mt-14 w-full max-w-[960px] flex justify-center">
          <div className="relative w-full">
            <span
              aria-hidden="true"
              className="absolute inset-x-[6%] bottom-0 h-[62%] rounded-t-[48%] bg-gradient-to-t from-blue-100/70 to-blue-50/40 -z-10"
            />
            <Image
              src="/hero-workers.png"
              alt="QwikHelp verified professionals: chef, electrician, plumber, carpenter ready to work"
              width={1670}
              height={940}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 960px"
              className="relative z-10 h-auto w-full object-contain object-bottom"
            />
          </div>
        </div>
      </main>

      {/* =========================================================================
          2. WHY QWIKHELP (#services)
          ========================================================================= */}
      <section
        id="services"
        aria-labelledby="provider-intro-title"
        className="w-full scroll-mt-20 py-16 sm:py-24 border-y border-gray-100"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-2 md:items-center lg:gap-20">
            <div>
              <h2
                id="provider-intro-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans"
              >
                Less chasing work.
                <br />
                More doing what
                <br />
                you do best.
              </h2>
              <p className="mt-6 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed text-pretty font-normal">
                Skilled people should not need a perfect word-of-mouth network to
                find customers. QwikHelp gives you a verified profile, proximity
                search visibility, and a clearer process for every booking.
              </p>
              <div className="mt-8">
                <Link
                  href="#provider-journey"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-gray-800 text-sm font-semibold border border-gray-200/90 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
                >
                  See how it works
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Get discovered",
                  description:
                    "Show up for customers searching for skilled help in your area. Your profile does the work when you're offline.",
                  icon: MagnifyingGlassIcon,
                },
                {
                  title: "Keep the details clear",
                  description:
                    "Discuss the job in-app before you accept. No misunderstandings, no chasing calls.",
                  icon: ChatCircleDotsIcon,
                },
                {
                  title: "Grow your reputation",
                  description:
                    "Build a visible record through ratings and completed jobs that attract more work.",
                  icon: StarIcon,
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-[#F8FAFF] p-5 sm:p-6 transition-all duration-150 hover:bg-white hover:border-brand-blue/30 hover:shadow-[0_4px_16px_0_rgba(30,91,247,0.06)]"
                >
                  <span className="mt-0.5 flex shrink-0 size-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue border border-blue-100/60">
                    <b.icon size={22} className="text-brand-blue" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-gray-950 font-sans">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600 text-pretty">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. HOW IT WORKS / PROVIDER JOURNEY (#provider-journey)
          ========================================================================= */}
      <section
        id="provider-journey"
        aria-labelledby="provider-journey-title"
        className="w-full scroll-mt-20 bg-[#F8FAFF] py-16 sm:py-24 border-b border-gray-100"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-12 sm:mb-16 max-w-2xl">
            <h2
              id="provider-journey-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans"
            >
              From profile
              <br />
              to payday.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed text-pretty">
              A straightforward path to getting discovered, doing the work, and
              receiving your earnings securely.
            </p>
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col justify-between bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:border-brand-blue/30 hover:shadow-[0_8px_24px_0_rgba(30,91,247,0.08)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue border border-blue-100/60">
                      <step.icon size={22} className="text-brand-blue" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-extrabold text-brand-blue/60 tracking-wider tabular-nums uppercase bg-blue-50/70 px-2.5 py-1 rounded-full border border-blue-100/50">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-[17px] font-bold text-gray-950 font-sans text-balance">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 text-pretty">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =========================================================================
          4. ESCROW PROTECTION / ABOUT (#about)
          ========================================================================= */}
      <section
        id="about"
        aria-labelledby="provider-escrow-title"
        className="w-full scroll-mt-20 py-16 sm:py-24 border-b border-gray-100"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* Visual Escrow Card */}
            <div className="relative overflow-hidden rounded-3xl bg-brand-blue p-8 sm:p-10 text-white min-h-[380px] flex flex-col justify-between shadow-[0_16px_40px_0_rgba(30,91,247,0.28)]">
              {/* Background Concentric Pattern */}
              <div
                className="absolute -right-16 -top-16 size-72 pointer-events-none opacity-20"
                aria-hidden="true"
              >
                <svg viewBox="0 0 300 300" fill="none">
                  <circle cx="150" cy="150" r="140" stroke="white" strokeWidth="24" />
                  <circle cx="150" cy="150" r="90" stroke="white" strokeWidth="20" />
                  <circle cx="150" cy="150" r="40" stroke="white" strokeWidth="16" />
                </svg>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white font-sans text-balance">
                  The payment
                  <br />
                  is already there.
                </h3>
                <p className="mt-2 text-sm text-blue-100 font-medium">
                  Before work begins
                </p>
              </div>

              <div className="relative z-10 mt-8 rounded-2xl bg-white p-5 sm:p-6 text-gray-950 shadow-lg border border-white/20">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue border border-blue-100/60">
                      <ShieldCheckIcon size={22} className="text-brand-blue" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-sm sm:text-[15px] font-bold text-gray-950">
                        Payment secured
                      </span>
                      <span className="block mt-0.5 text-xs text-gray-500">
                        Held safely until the job is confirmed
                      </span>
                    </div>
                  </div>
                  <CheckCircleIcon
                    className="shrink-0 text-brand-blue"
                    size={22}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-brand-blue">
                  <span className="rounded-full bg-blue-50 px-3 py-1 border border-blue-100/60">
                    Customer confirms
                  </span>
                  <span className="h-px flex-1 bg-gray-200" />
                  <span className="rounded-full bg-blue-50 px-3 py-1 border border-blue-100/60">
                    You confirm
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2
                id="provider-escrow-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans"
              >
                No more starting
                <br />a job on a promise.
              </h2>
              <p className="mt-6 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed text-pretty">
                Customers pay through QwikHelp. Funds stay in escrow while the
                work is underway, then move to your wallet after both sides confirm
                the job is complete.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Check escrow payment before you begin.",
                  "Confirm the finished job together in the app.",
                  "Use the formal dispute process if something goes wrong.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                    <CheckCircleIcon
                      className="mt-1 shrink-0 text-brand-blue"
                      size={18}
                      aria-hidden="true"
                    />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. REPUTATION & INTEGRITY
          ========================================================================= */}
      <section
        aria-labelledby="provider-reputation-title"
        className="w-full bg-[#F8FAFF] py-16 sm:py-24 border-b border-gray-100"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-12 max-w-2xl">
            <h2
              id="provider-reputation-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans"
            >
              Your place is earned,
              <br />
              never bought.
            </h2>
            <p className="mt-4 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed text-pretty">
              There is no paid shortcut to the top. Provider visibility is based on
              how customers experience your work and how reliably you respond.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Customer ratings",
                description: "A reputation shaped by real customer feedback and job ratings.",
                icon: StarIcon,
              },
              {
                title: "Job completion",
                description: "A visible record of the work and projects you see through.",
                icon: CalendarCheckIcon,
              },
              {
                title: "Response time",
                description: "How promptly you reply to service requests and opportunities.",
                icon: ChatCircleDotsIcon,
              },
            ].map((s) => (
              <article
                key={s.title}
                className="flex flex-col bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:border-brand-blue/30 hover:shadow-[0_8px_24px_0_rgba(30,91,247,0.08)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue border border-blue-100/60">
                  <s.icon size={22} className="text-brand-blue" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-base sm:text-lg font-bold text-gray-950 font-sans">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 text-pretty">
                  {s.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SERVICE CATEGORIES
          ========================================================================= */}
      <section
        aria-labelledby="provider-categories-title"
        className="w-full py-16 sm:py-24 border-b border-gray-100"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="provider-categories-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans"
            >
              Bring your craft
              <br />
              to the neighbourhood.
            </h2>
            <p className="max-w-xs text-sm sm:text-base leading-relaxed text-gray-600 text-pretty sm:text-right">
              QwikHelp connects customers with verified professionals across
              everyday household needs and skilled trades.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="group flex min-h-[128px] flex-col justify-between rounded-2xl border border-gray-200/80 bg-[#F8FAFF] p-5 transition-all duration-200 hover:border-brand-blue/40 hover:bg-white hover:shadow-[0_8px_20px_0_rgba(30,91,247,0.08)] hover:-translate-y-1"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-white border border-gray-200/70 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  <Icon size={22} className="text-brand-blue" aria-hidden="true" />
                </span>
                <span className="text-sm sm:text-[15px] font-bold text-gray-950 font-sans group-hover:text-brand-blue transition-colors">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================================
          7. GETTING STARTED (#getting-started)
          ========================================================================= */}
      <section
        id="getting-started"
        aria-labelledby="getting-started-title"
        className="w-full scroll-mt-20 py-16 sm:py-24 border-b border-gray-100"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <h2
                id="getting-started-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans"
              >
                Get ready to build
                <br />a profile people
                <br />
                can trust.
              </h2>
              <p className="mt-6 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed text-pretty">
                Provider accounts are thoroughly reviewed before they go live. Keep
                these ready for the identity verification process.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "NIN or BVN check",
                  "Photo ID",
                  "Face verification",
                  "A guarantor",
                ].map((req) => (
                  <li
                    key={req}
                    className="flex items-center gap-2.5 text-sm sm:text-[15px] font-semibold text-gray-900 bg-white border border-gray-200/70 rounded-xl px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  >
                    <CheckCircleIcon
                      className="shrink-0 text-brand-blue"
                      size={18}
                      aria-hidden="true"
                    />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200/80 bg-white p-7 sm:p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue border border-blue-100/60">
                  <IdentificationCardIcon size={22} className="text-brand-blue" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-950 font-sans">
                    Identity review
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    A required step before your profile goes live
                  </p>
                </div>
              </div>

              <div className="mt-7 divide-y divide-gray-100">
                {[
                  "Identity details submitted",
                  "Photo and face checked",
                  "Profile reviewed by QwikHelp",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 py-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white tabular-nums">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-relaxed text-gray-500">
                Submit identity documents through the official in-app process when
                provider registration is available. Do not send documents by email.
              </p>
              <Link
                href="mailto:support@qwikhelp.com?subject=Provider%20onboarding"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-blue px-6 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(30,91,247,0.32)] hover:bg-brand-blue-hover transition-all duration-150 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
              >
                Ask about joining
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FAQ (#contact)
          ========================================================================= */}
      <section
        id="contact"
        aria-labelledby="provider-faq-title"
        className="w-full scroll-mt-20 py-16 sm:py-24 border-b border-gray-100"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-[0.65fr_1.35fr] md:gap-20 md:items-start">
            <div className="md:sticky md:top-28">
              <h2
                id="provider-faq-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans"
              >
                Questions,
                <br />
                answered.
              </h2>
              <p className="mt-4 max-w-xs text-sm sm:text-base leading-relaxed text-gray-600 text-pretty">
                The essentials on verification, jobs, payments, and how QwikHelp
                works for providers.
              </p>
            </div>

            <div className="divide-y divide-gray-200/80 border-t border-b border-gray-200/80">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-sm sm:text-[15px] font-semibold text-gray-950 marker:hidden hover:text-brand-blue transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 bg-gray-50/50 transition-all duration-200 group-open:rotate-45 group-open:bg-blue-50 group-open:text-brand-blue group-open:border-brand-blue/30"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-2 pr-10 pt-3 text-sm sm:text-[15px] leading-relaxed text-gray-600 text-pretty">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
