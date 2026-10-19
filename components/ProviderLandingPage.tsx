"use client";

import { useState } from "react";
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
import IllustrationSlot from "@/components/IllustrationSlot";
import {
  OrangeFlower,
  BlueRibbon,
  GreenDaisy,
  YellowSunburst,
} from "@/components/DoodleBadges";

const steps = [
  {
    title: "Get verified",
    description:
      "Submit your NIN or BVN, photo ID, and guarantor for fast, secure onboarding.",
    icon: IdentificationCardIcon,
    illustrationLabel: "Identity Verification",
    illustrationHint: "e.g. Photo ID & biometric scan illustration",
    imageSrc: "/illustrations/verify.svg", // Step 1 image
  },
  {
    title: "Get approved",
    description:
      "Our team reviews your credentials and your pro profile goes live in the community.",
    icon: UserCheckIcon,
    illustrationLabel: "Profile Goes Live",
    illustrationHint: "e.g. Verified pro badge illustration",
    imageSrc: "/illustrations/approved.svg", // Step 2 image: place your path here e.g. "/illustrations/approved.svg"
  },
  {
    title: "Meet nearby clients",
    description:
      "Appear in local proximity searches and get matched directly with nearby households.",
    icon: MagnifyingGlassIcon,
    illustrationLabel: "Proximity Matching",
    illustrationHint: "e.g. Map search & booking request illustration",
    imageSrc: "/illustrations/users.svg", // Step 3 image: place your path here e.g. "/illustrations/clients.svg"
  },
  {
    title: "Do work. Get paid.",
    description:
      "Funds stay protected in escrow until you both sign off, then withdraw instantly to your bank.",
    icon: WalletIcon,
    illustrationLabel: "Escrow & Wallet Payout",
    illustrationHint: "e.g. Secure payout & earnings illustration",
    imageSrc: "/illustrations/paid.svg", // Step 4 image: place your path here e.g. "/illustrations/get-paid.svg"
  },
];

const categories = [
  {
    label: "Cooking",
    icon: CookingPotIcon,
    bg: "bg-[#EF4444]", // Red
    fg: "text-white",
    iconBg: "bg-white/20",
  },
  {
    label: "Cleaning",
    icon: BroomIcon,
    bg: "bg-[#F97316]", // Orange
    fg: "text-white",
    iconBg: "bg-white/20",
  },
  {
    label: "Plumbing",
    icon: WrenchIcon,
    bg: "bg-[#FACC15]", // Yellow
    fg: "text-gray-950",
    iconBg: "bg-black/10",
  },
  {
    label: "Electrical",
    icon: LightningIcon,
    bg: "bg-[#10B981]", // Green
    fg: "text-white",
    iconBg: "bg-white/20",
  },
  {
    label: "AC servicing",
    icon: SnowflakeIcon,
    bg: "bg-[#2563EB]", // Blue
    fg: "text-white",
    iconBg: "bg-white/20",
  },
  {
    label: "Carpentry",
    icon: HammerIcon,
    bg: "bg-[#8B5CF6]", // Purple
    fg: "text-white",
    iconBg: "bg-white/20",
  },
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
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFF] flex flex-col overflow-x-hidden selection:bg-blue-100 selection:text-brand-blue">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <main
        id="provider"
        aria-labelledby="provider-title"
        className="flex-1 flex flex-col items-center justify-start pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12 relative w-full"
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
            className="text-3xl sm:text-5xl md:text-[56px] lg:text-[62px] font-extrabold tracking-[-0.03em] leading-tight sm:leading-[1.12] text-gray-950 font-sans text-balance text-center"
          >
            Good work deserves
            <span className="block mt-1 sm:mt-2">
              <span className="text-brand-blue font-extrabold">to be seen.</span>
            </span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="mt-5 sm:mt-6 text-[15px] sm:text-lg md:text-[18.5px] leading-relaxed text-gray-600 max-w-2xl font-normal text-pretty text-center px-2">
            Find customers beyond your usual circle. Agree on the job in-app. Know
            payment is protected in escrow before you begin.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-row items-center justify-center gap-3.5 sm:gap-4 flex-wrap">
            {/* Primary CTA */}
            <Link
              href="#getting-started"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand-blue text-white text-sm sm:text-[15px] font-semibold transition-[background-color,transform] duration-150 hover:bg-brand-blue-hover motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
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
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-gray-800 text-sm sm:text-[15px] font-medium transition-[background-color,transform] duration-150 hover:bg-gray-100 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
            >
              See how it works
            </Link>
          </div>

          {/* Inline Trust Signals (Centralized on mobile) */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-y-2.5 sm:gap-x-8 pt-4">
            {[
              { label: "Every job", meta: "Escrow-protected" },
              { label: "All providers", meta: "Verified identities" },
              { label: "No paid slots", meta: "Merit-based ranking" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-center gap-2 text-center"
              >
                <span className="text-sm sm:text-[15px] font-bold text-gray-950">
                  {s.label}
                </span>
                <span className="text-xs text-gray-500">{s.meta}</span>
              </div>
            ))}
          </div>
        </div>

        {/* HERO IMAGE STAGE WITH DOODLE ACCENTS */}
        <div className="relative z-10 mx-auto mt-10 sm:mt-14 w-full max-w-[960px] flex justify-center">
          {/* Top Left Doodle */}
          <div className="absolute -top-6 left-4 sm:left-8 z-20 hidden sm:block">
            <OrangeFlower />
          </div>
          {/* Top Right Doodle */}
          <div className="absolute -top-5 right-6 sm:right-10 z-20 hidden sm:block">
            <GreenDaisy />
          </div>

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
          2. WHY QWIKHELP: 2-COLUMN WITH DEDICATED ILLUSTRATION STAGE
          ========================================================================= */}
      <section
        id="services"
        aria-labelledby="provider-intro-title"
        className="w-full scroll-mt-20 py-16 sm:py-24"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* Left: Punchy Text & Value Proposition */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">

              <h2
                id="provider-intro-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans text-center lg:text-left"
              >
                Less chasing work.
                <br />
                More doing what
                <br />
                you do best.
              </h2>
              <p className="mt-5 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed text-pretty font-normal text-center lg:text-left">
                Skip relying entirely on word-of-mouth. QwikHelp puts your verified
                skills in front of nearby homeowners searching for trusted hands right now.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="#getting-started"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-hover transition-all duration-150 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
                >
                  Join the network
                </Link>
                <Link
                  href="#provider-journey"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-gray-800 text-sm font-semibold hover:bg-gray-100 transition-all duration-150 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
                >
                  See how it works
                </Link>
              </div>
            </div>

            {/* Right: Large Dedicated Illustration Stage */}
            <div className="w-full flex justify-center">
              <IllustrationSlot
                // label="Proximity Matching & Customer Discovery"
                // hint="Place your map / incoming booking illustration here"
                aspect="aspect-[4/3] sm:aspect-[16/11]"
                variant="light"
                imageSrc="/illustrations/proximity.svg"
              >
              </IllustrationSlot>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. HOW IT WORKS: 4-STEP FLOW WITH ILLUSTRATION CARDS
          ========================================================================= */}
      <section
        id="provider-journey"
        aria-labelledby="provider-journey-title"
        className="w-full scroll-mt-20 py-16 sm:py-24"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-12 sm:mb-16 max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4">
              Step-by-Step Flow
            </span>
            <h2
              id="provider-journey-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans text-center md:text-left"
            >
              From profile
              <br />
              to payday.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed text-pretty text-center md:text-left">
              A transparent journey from initial identity review to receiving secure payments in your bank account.
            </p>
          </div>

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col justify-between bg-white rounded-3xl p-5 sm:p-6 hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  {/* Step Illustration Frame */}
                  <IllustrationSlot
                    label={step.illustrationLabel}
                    hint={step.illustrationHint}
                    aspect="aspect-[16/10]"
                    variant="light"
                    className="mb-5 rounded-2xl"
                    imageSrc={step.imageSrc}
                  />

                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                      <step.icon size={20} weight="fill" className="text-brand-blue" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-extrabold text-brand-blue tracking-wider tabular-nums uppercase bg-blue-50 px-2.5 py-1 rounded-full">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-950 font-sans text-balance">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600 text-pretty">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =========================================================================
          4. ESCROW PROTECTION: 2-COLUMN WITH ILLUSTRATION STAGE
          ========================================================================= */}
      <section
        id="about"
        aria-labelledby="provider-escrow-title"
        className="w-full scroll-mt-20 py-16 sm:py-24"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* Visual Escrow Illustration Stage */}
            <div className="w-full flex justify-center">
              <IllustrationSlot
                label="Escrow Guarantee & Safe Wallet Release"
                hint="Place your escrow / wallet transfer illustration here"
                aspect="aspect-[4/3] sm:aspect-[16/11]"
                variant="blue"
                imageSrc="/illustrations/wallet.svg"
              >
                {/* Floating Payment Status Card overlay */}
                <div className="absolute bottom-6 inset-x-6 z-20 rounded-2xl bg-white p-4 sm:p-5 text-gray-950">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                        <ShieldCheckIcon size={22} weight="fill" className="text-brand-blue" aria-hidden="true" />
                      </span>
                      <div className="text-left">
                        <span className="block text-sm font-bold text-gray-950">
                          Payment in Escrow
                        </span>
                        <span className="block text-xs text-gray-500">
                          Funds locked safely before you start
                        </span>
                      </div>
                    </div>
                    <CheckCircleIcon
                      className="shrink-0 text-brand-blue"
                      size={20}
                      weight="fill"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </IllustrationSlot>
            </div>

            {/* Description */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">

              <h2
                id="provider-escrow-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans text-center lg:text-left"
              >
                No more starting
                <br />a job on a promise.
              </h2>
              <p className="mt-5 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed text-pretty text-center lg:text-left">
                Customers pay upfront through QwikHelp. Funds stay securely in escrow
                while you work, and transfer to your in-app wallet immediately when
                both sides confirm completion.
              </p>
              <ul className="mt-6 space-y-3.5 text-left w-full max-w-md">
                {[
                  "Verify customer escrow balance before traveling to the job.",
                  "Zero awkward payment chasing after a hard day's work.",
                  "Dedicated in-app dispute support if client scope changes.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                    <CheckCircleIcon
                      className="mt-1 shrink-0 text-brand-blue"
                      size={18}
                      weight="fill"
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
        className="w-full py-16 sm:py-24"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-12 max-w-2xl text-center md:text-left mx-auto md:mx-0">

            <h2
              id="provider-reputation-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans text-center md:text-left"
            >
              Your place is earned,
              <br />
              never bought.
            </h2>
            <p className="mt-4 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed text-pretty text-center md:text-left">
              There is no paid shortcut to the top. Provider visibility is based on
              how customers experience your work and how reliably you respond.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
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
                className="flex flex-col bg-white rounded-3xl p-7 hover:-translate-y-1 transition-all duration-200"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-brand-blue mb-6">
                  <s.icon size={24} weight="fill" className="text-brand-blue" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold text-gray-950 font-sans">
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
          6. SERVICE CATEGORIES (Solid Rainbow Boxes)
          ========================================================================= */}
      <section
        aria-labelledby="provider-categories-title"
        className="w-full py-16 sm:py-24"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between text-center sm:text-left">
            <div>
              <h2
                id="provider-categories-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans text-center sm:text-left"
              >
                Bring your craft
                <br />
                to the neighbourhood.
              </h2>
            </div>
            <p className="max-w-xs text-sm sm:text-base leading-relaxed text-gray-600 text-pretty mx-auto sm:mx-0 sm:text-right">
              QwikHelp connects verified pros with everyday household needs and skilled trades across town.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ label, icon: Icon, bg, fg, iconBg }) => (
              <li
                key={label}
                className={`group flex min-h-[136px] flex-col justify-between rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1.5 ${bg} ${fg}`}
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-xl ${iconBg} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon size={24} weight="fill" className="currentColor" aria-hidden="true" />
                </span>
                <span className="text-[15px] sm:text-base font-bold font-sans tracking-tight">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================================
          7. GETTING STARTED: 2-COLUMN WITH VERIFICATION ILLUSTRATION STAGE
          ========================================================================= */}
      <section
        id="getting-started"
        aria-labelledby="getting-started-title"
        className="w-full scroll-mt-20 py-16 sm:py-24"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* Left: Requirements list */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">

              <h2
                id="getting-started-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans text-center lg:text-left"
              >
                Get ready to build
                <br />a profile people
                <br />
                can trust.
              </h2>
              <p className="mt-5 max-w-lg text-base sm:text-lg text-gray-600 leading-relaxed text-pretty text-center lg:text-left">
                Provider accounts are reviewed promptly. Keep these ready for your identity check.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 w-full text-left">
                {[
                  "NIN or BVN check",
                  "Valid Photo ID",
                  "Face verification",
                  "A verified guarantor",
                ].map((req) => (
                  <li
                    key={req}
                    className="flex items-center gap-2.5 text-sm sm:text-[15px] font-semibold text-gray-900 bg-white rounded-2xl px-4 py-3.5"
                  >
                    <CheckCircleIcon
                      className="shrink-0 text-brand-blue"
                      size={18}
                      weight="fill"
                      aria-hidden="true"
                    />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Verification Illustration Slot */}
            <div className="w-full flex justify-center">
              <IllustrationSlot
                // label="Trust & Identity Review Showcase"
                // hint="Place your document review / verified badge illustration here"
                aspect="aspect-[4/3] sm:aspect-[16/11]"
                variant="white"
                imageSrc="/illustrations/id-check.svg"
              >
                {/* Overlay Step Pill */}
                <div className="absolute bottom-6 inset-x-6 z-20 flex items-center justify-between rounded-2xl bg-[#F8FAFF] p-4 text-xs font-semibold text-gray-700">
                  <span className="flex items-center gap-2">
                    <UserCheckIcon size={18} weight="fill" className="text-brand-blue" />
                    <span>Background & ID check</span>
                  </span>
                  <span className="text-emerald-600 font-bold">Fast-tracked</span>
                </div>
              </IllustrationSlot>
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
        className="w-full scroll-mt-20 py-16 sm:py-24"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-[0.65fr_1.35fr] md:gap-20 md:items-start">
            <div className="md:sticky md:top-28 text-center md:text-left">
              <h2
                id="provider-faq-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans text-center md:text-left"
              >
                Questions,
                <br />
                answered.
              </h2>
              <p className="mt-4 max-w-xs text-sm sm:text-base leading-relaxed text-gray-600 text-pretty mx-auto md:mx-0 text-center md:text-left">
                The essentials on verification, jobs, escrow payments, and how QwikHelp works for you.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 sm:gap-4">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndices.includes(index);
                return (
                  <div
                    key={item.question}
                    className="rounded-2xl bg-white p-5 sm:p-6 transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 text-left font-sans text-sm sm:text-[16px] font-semibold text-gray-950 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                    >
                      <span>{item.question}</span>
                      <span
                        aria-hidden="true"
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-base font-medium transition-all duration-200 ${isOpen
                          ? "rotate-45 bg-blue-50 text-brand-blue"
                          : "text-gray-500 bg-gray-100 hover:bg-gray-200/80"
                          }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-3 text-sm sm:text-[15px] leading-relaxed text-gray-600 text-pretty">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
