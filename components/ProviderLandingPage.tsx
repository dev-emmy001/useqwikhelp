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
    number: "01",
    title: "Get verified",
    description:
      "Create your profile with your NIN or BVN, photo ID, face verification, and a guarantor.",
    icon: IdentificationCardIcon,
  },
  {
    number: "02",
    title: "Get approved",
    description:
      "The QwikHelp team reviews your details. When your account is approved, your profile goes live.",
    icon: UserCheckIcon,
  },
  {
    number: "03",
    title: "Meet nearby customers",
    description:
      "Go online to appear in proximity search. Receive direct requests or respond to broadcast jobs.",
    icon: MagnifyingGlassIcon,
  },
  {
    number: "04",
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
    <main className="overflow-hidden bg-[#0d0d0b] text-white">

      {/* HERO */}
      <section
        id="provider"
        aria-labelledby="provider-title"
        className="relative isolate min-h-[85dvh] overflow-hidden px-5 pb-0 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32 flex flex-col"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-[-12%] h-[480px] w-[480px] rounded-full bg-[#c8ec00] opacity-[0.12] blur-[120px]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8%] bottom-[10%] h-[320px] w-[320px] rounded-full bg-[#13a768] opacity-[0.14] blur-[100px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1200px] flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8">
            <span className="flex size-2 rounded-full bg-[#c8ec00]" />
            <span className="text-xs font-semibold tracking-wide text-[#c8ec00] uppercase">
              For service professionals
            </span>
          </div>

          <h1
            id="provider-title"
            className="max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold leading-[1.0] text-balance text-white"
          >
            Good work deserves
            <br />
            <span className="text-[#13a768]">to be seen.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-white/60 text-pretty sm:text-lg">
            Find customers beyond your usual circle. Agree on the job in-app.
            Know payment is protected before you begin.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#getting-started"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#13a768] px-8 text-sm font-semibold text-white transition-[background-color,transform] duration-150 [@media(hover:hover)]:hover:bg-[#0f9059] motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#13a768]"
            >
              Join as a provider
            </Link>
            <Link
              href="#provider-journey"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-semibold text-white/80 transition-[border-color,color,transform] duration-150 [@media(hover:hover)]:hover:border-white/30 [@media(hover:hover)]:hover:text-white motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
            >
              See how it works
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap gap-3 pb-2">
            {[
              { label: "Escrow-protected", value: "Every job" },
              { label: "Verified identities", value: "All providers" },
              { label: "Merit-based ranking", value: "No paid slots" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-sm"
              >
                <span className="text-[11px] font-medium text-white/45">{s.label}</span>
                <span className="mt-0.5 text-sm font-bold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-14 w-full max-w-[1200px] flex justify-center">
          <div className="relative w-full max-w-[960px]">
            <span
              aria-hidden="true"
              className="absolute inset-x-[4%] bottom-0 h-[62%] rounded-t-[48%] bg-[#13a768]"
            />
            <Image
              src="/hero-workers.png"
              alt="QwikHelp professionals: chef, electrician, plumber, carpenter ready to work"
              width={1670}
              height={940}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 960px"
              className="relative z-10 h-auto w-full object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      {/* WHY QWIKHELP */}
      <section
        aria-labelledby="provider-intro-title"
        className="bg-white px-5 py-20 text-[#0d0d0b] sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-2 md:items-center lg:gap-24">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#13a768] uppercase mb-4">
              Why QwikHelp
            </p>
            <h2
              id="provider-intro-title"
              className="text-4xl font-extrabold leading-[1.05] text-balance sm:text-5xl lg:text-[56px]"
            >
              Less chasing work.
              <br />
              More doing what
              <br />
              you do best.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#55564f] text-pretty">
              Skilled people should not need a perfect word-of-mouth network to
              find customers. QwikHelp gives you a verified profile, proximity
              search visibility, and a clearer process for every booking.
            </p>
            <Link
              href="#provider-journey"
              className="mt-8 inline-flex min-h-11 items-center rounded-full border border-[#d4d3ca] px-6 text-sm font-semibold text-[#181914] transition-[background-color,transform] duration-150 [@media(hover:hover)]:hover:bg-[#f6f5ed] motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#13a768]"
            >
              See how it works
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                title: "Get discovered",
                description:
                  "Show up for customers searching for skilled help in your area. Your profile does the work when you're offline.",
                icon: MagnifyingGlassIcon,
                accent: "bg-[#13a768] text-white",
              },
              {
                title: "Keep the details clear",
                description:
                  "Discuss the job in-app before you accept. No misunderstandings, no chasing calls.",
                icon: ChatCircleDotsIcon,
                accent: "bg-[#c8ec00] text-[#122d20]",
              },
              {
                title: "Grow your reputation",
                description:
                  "Build a visible record through ratings and completed jobs that attract more work.",
                icon: StarIcon,
                accent: "bg-[#0d0d0b] text-white",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="flex items-start gap-4 rounded-2xl border border-[#e8e7df] bg-[#fafaf7] p-5 sm:p-6 transition-[border-color] duration-150 [@media(hover:hover)]:hover:border-[#c8ec00]"
              >
                <span
                  className={`mt-0.5 flex shrink-0 size-10 items-center justify-center rounded-xl ${b.accent}`}
                >
                  <b.icon size={20} weight="fill" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#0d0d0b]">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#5f6058] text-pretty">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section
        id="provider-journey"
        aria-labelledby="provider-journey-title"
        className="scroll-mt-20 bg-[#0d0d0b] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <header className="mx-auto max-w-2xl">
            <h2
              id="provider-journey-title"
              className="text-4xl font-extrabold leading-[1.05] text-balance text-white sm:text-5xl"
            >
              From profile
              <br />
              to payday.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/50 text-pretty">
              A straightforward path to getting discovered, doing the work, and
              receiving your earnings.
            </p>
          </header>

          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.number}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold tabular-nums text-white/10 select-none leading-none">
                    {step.number}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#c8ec00] text-[#0d2a1a]">
                    <step.icon size={22} weight="fill" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="text-base font-bold text-white text-balance">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50 text-pretty">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ESCROW */}
      <section
        aria-labelledby="provider-escrow-title"
        className="bg-white px-5 py-20 text-[#0d0d0b] sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative overflow-hidden rounded-3xl bg-[#0b8753] p-8 text-white sm:p-10 min-h-[360px] flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
                Before work begins
              </p>
              <h3 className="mt-3 text-3xl font-extrabold leading-tight text-balance sm:text-4xl">
                The payment
                <br />
                is already there.
              </h3>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-5 text-[#171812] shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-[#e8f7cf] text-[#138a54]">
                    <ShieldCheckIcon size={20} weight="fill" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">Payment secured</span>
                    <span className="block mt-0.5 text-xs text-[#66675f]">
                      Held safely until the job is confirmed
                    </span>
                  </span>
                </div>
                <CheckCircleIcon
                  className="shrink-0 text-[#13a768]"
                  size={22}
                  weight="fill"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[#55564f]">
                <span className="rounded-full bg-[#e8f7cf] px-2.5 py-1 text-[#13683f]">
                  Customer confirms
                </span>
                <span className="h-px flex-1 bg-[#d8d8cf]" />
                <span className="rounded-full bg-[#e8f7cf] px-2.5 py-1 text-[#13683f]">
                  You confirm
                </span>
              </div>
            </div>

            <span
              aria-hidden="true"
              className="absolute -right-12 -bottom-16 size-48 rounded-full bg-[#c8ec00] opacity-60"
            />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-[#13a768] uppercase mb-4">
              Protection for your work
            </p>
            <h2
              id="provider-escrow-title"
              className="text-4xl font-extrabold leading-[1.05] text-balance sm:text-5xl"
            >
              No more starting
              <br />a job on a promise.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#55564f] text-pretty">
              Customers pay through QwikHelp. Funds stay in escrow while the
              work is underway, then move to your wallet after both sides
              confirm the job is complete.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Check escrow payment before you begin.",
                "Confirm the finished job together.",
                "Use the formal dispute process if something goes wrong.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircleIcon
                    className="mt-0.5 shrink-0 text-[#13a768]"
                    size={18}
                    weight="fill"
                    aria-hidden="true"
                  />
                  <span className="text-[#3e3f39] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* REPUTATION */}
      <section
        aria-labelledby="provider-reputation-title"
        className="bg-[#0d0d0b] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-[#c8ec00] uppercase mb-4">
              A fairer way to be found
            </p>
            <h2
              id="provider-reputation-title"
              className="text-4xl font-extrabold leading-[1.05] text-balance text-white sm:text-5xl"
            >
              Your place is earned,
              <br />
              never bought.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/50 text-pretty">
              There is no paid shortcut to the top. Provider visibility is
              based on how customers experience your work and how reliably you
              respond.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Customer ratings",
                description: "A reputation shaped by real customer feedback.",
                icon: StarIcon,
                bg: "bg-[#c8ec00]",
                fg: "text-[#0d2a1a]",
              },
              {
                title: "Job completion",
                description: "A record of the work you see through.",
                icon: CalendarCheckIcon,
                bg: "bg-[#13a768]",
                fg: "text-white",
              },
              {
                title: "Response time",
                description: "How promptly you reply to opportunities.",
                icon: ChatCircleDotsIcon,
                bg: "bg-white/10",
                fg: "text-white",
              },
            ].map((s) => (
              <article
                key={s.title}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 transition-[border-color] duration-150 [@media(hover:hover)]:hover:border-white/20"
              >
                <span
                  className={`flex size-11 items-center justify-center rounded-xl ${s.bg} ${s.fg}`}
                >
                  <s.icon size={22} weight="fill" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-base font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50 text-pretty">
                  {s.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        aria-labelledby="provider-categories-title"
        className="bg-white px-5 py-20 text-[#0d0d0b] sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#13a768] uppercase mb-3">
                Your skills have a place here
              </p>
              <h2
                id="provider-categories-title"
                className="text-4xl font-extrabold leading-[1.05] text-balance sm:text-5xl"
              >
                Bring your craft
                <br />
                to the neighbourhood.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#55564f] text-pretty sm:text-right">
              QwikHelp connects customers with home-service professionals across
              everyday household needs and skilled trades.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ label, icon: Icon }, index) => (
              <li
                key={label}
                className={`flex min-h-[120px] flex-col justify-between rounded-2xl p-4 sm:p-5 transition-transform duration-150 motion-safe:[@media(hover:hover)]:hover:-translate-y-1 ${
                  index === 1 || index === 4
                    ? "bg-[#c8ec00] text-[#0d2a1a]"
                    : index === 2 || index === 5
                    ? "bg-[#0d0d0b] text-white"
                    : "bg-[#13a768] text-white"
                }`}
              >
                <Icon size={24} weight="fill" aria-hidden="true" />
                <span className="text-sm font-bold">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GETTING STARTED */}
      <section
        id="getting-started"
        aria-labelledby="getting-started-title"
        className="scroll-mt-20 bg-[#0d0d0b] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#c8ec00] uppercase mb-4">
              Start with the right details
            </p>
            <h2
              id="getting-started-title"
              className="text-4xl font-extrabold leading-[1.05] text-balance text-white sm:text-5xl"
            >
              Get ready to build
              <br />a profile people
              <br />
              can trust.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/50 text-pretty">
              Provider accounts are reviewed before they go live. Keep these
              ready for the identity verification process.
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
                  className="flex items-center gap-2.5 text-sm font-semibold text-white"
                >
                  <CheckCircleIcon
                    className="shrink-0 text-[#13a768]"
                    size={18}
                    weight="fill"
                    aria-hidden="true"
                  />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#e8f7cf] text-[#138a54]">
                <IdentificationCardIcon size={22} weight="fill" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Identity review</p>
                <p className="mt-0.5 text-xs text-white/40">
                  A required step before your profile goes live
                </p>
              </div>
            </div>

            <div className="mt-7 divide-y divide-white/[0.08]">
              {[
                "Identity details submitted",
                "Photo and face checked",
                "Profile reviewed by QwikHelp",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-4 py-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#c8ec00] text-xs font-bold text-[#0d2a1a] tabular-nums">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-white/80">{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-white/30">
              Submit identity documents through the official in-app process
              when provider registration is available. Do not send documents
              by email.
            </p>
            <Link
              href="mailto:support@qwikhelp.com?subject=Provider%20onboarding"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#13a768] px-6 text-sm font-semibold text-white transition-[background-color,transform] duration-150 [@media(hover:hover)]:hover:bg-[#0f9059] motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#13a768]"
            >
              Ask about joining
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="provider-faq-title"
        className="bg-white px-5 py-20 text-[#0d0d0b] sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[0.65fr_1.35fr] md:gap-20 md:items-start">
          <div className="md:sticky md:top-24">
            <p className="text-xs font-semibold tracking-widest text-[#13a768] uppercase mb-4">
              Good to know
            </p>
            <h2
              id="provider-faq-title"
              className="text-4xl font-extrabold leading-[1.05] text-balance sm:text-5xl"
            >
              Questions,
              <br />
              answered.
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#55564f] text-pretty">
              The essentials on verification, jobs, payments, and how QwikHelp
              works for providers.
            </p>
          </div>

          <div className="divide-y divide-[#e8e7df] border-t border-[#e8e7df]">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-sm font-semibold text-[#20211c] marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13a768] sm:text-[15px] [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#d4d3ca] text-[#55564f] transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-2 pr-10 pt-3 text-sm leading-relaxed text-[#5f6058] text-pretty">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        aria-labelledby="provider-final-cta-title"
        className="bg-[#0d0d0b] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl bg-[#13a768] px-8 py-16 text-center text-white sm:rounded-[2rem] sm:px-16 sm:py-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 top-1/2 size-56 -translate-y-1/2 rounded-full bg-[#c8ec00] opacity-40 blur-2xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-[#c8ec00] opacity-30 blur-3xl"
          />
          <div className="relative">
            <h2
              id="provider-final-cta-title"
              className="text-4xl font-extrabold leading-[1.05] text-balance sm:text-5xl lg:text-6xl"
            >
              Ready to let
              <br />
              your work speak?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/75 text-pretty">
              Learn about provider onboarding and what you will need to get
              verified and go live.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="mailto:support@qwikhelp.com?subject=Provider%20onboarding"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0d0d0b] px-8 text-sm font-semibold text-white transition-[background-color,transform] duration-150 [@media(hover:hover)]:hover:bg-[#1e1e1a] motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
              >
                Talk to QwikHelp
              </Link>
              <Link
                href="#getting-started"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition-[border-color,transform] duration-150 [@media(hover:hover)]:hover:border-white/60 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
              >
                What you need
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
