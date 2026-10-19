"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheckIcon,
  UserCheckIcon,
  WalletIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@phosphor-icons/react";
import IllustrationSlot from "@/components/IllustrationSlot";

export default function AboutSection() {
  const highlights = [
    {
      icon: UserCheckIcon,
      title: "100% Verified Identity",
      description:
        "Every pro completes multi-tier identity review: NIN/BVN validation, government photo ID, face matching, and physical guarantor confirmation.",
    },
    {
      icon: WalletIcon,
      title: "Escrow Payment Vault",
      description:
        "Your money is held safely in escrow. Artisans never get paid upfront, and funds are only disbursed after you inspect the finished work and sign off.",
    },
    {
      icon: ShieldCheckIcon,
      title: "24-Hour Recourse Guarantee",
      description:
        "If a job isn't completed to your satisfaction, our support team dispatches a senior specialist to correct the issue or facilitates a full refund.",
    },
  ];

  return (
    <section
      id="about"
      aria-label="About QwikHelp"
      className="w-full py-16 sm:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* =========================================================================
            TOP ROW: 2-COLUMN LAYOUT (Text Left, Visual Stage Right)
            ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          {/* LEFT COLUMN: ABOUT HEADLINE & DESCRIPTION */}
          <div className="flex-1 flex flex-col items-center lg:items-start max-w-xl text-center lg:text-left">


            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans">
              Reliable help shouldn&apos;t be a gamble.
            </h2>

            {/* Description Paragraph */}
            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed text-pretty font-normal">
              QwikHelp is the modern domestic and home maintenance platform connecting
              busy homeowners and households with thoroughly screened cooks, cleaners,
              plumbers, electricians, and technicians.
            </p>

            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed text-pretty font-normal">
              We eliminated the endless referral chains, unpredictable pricing, and
              poor accountability. On QwikHelp, you get upfront fixed rates, verified
              professionals nearby, and complete escrow protection on every single task.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-row items-center justify-center lg:justify-start gap-3.5 flex-wrap">
              <Link
                href="#services"
                className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full bg-brand-blue text-white font-semibold text-sm transition-all hover:bg-brand-blue-hover active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
              >
                Browse Services
              </Link>
              <Link
                href="/provider"
                className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-white text-gray-800 font-medium text-sm transition-all hover:bg-gray-50 active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
              >
                Join as a Provider
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: DEDICATED ILLUSTRATION STAGE */}
          <div className="flex-1 w-full max-w-xl mx-auto lg:max-w-none">
            <IllustrationSlot
              label="Verified Home Help In Action"
              hint="Illustration showing vetted pro arriving to assist homeowner"
              variant="white"
              aspect="aspect-[4/3] sm:aspect-[16/11]"
              imageSrc="/illustrations/proximity.svg"
            >
              {/* Floating Stat Pill Overlay */}
              <div className="absolute bottom-6 inset-x-6 z-20 flex items-center justify-between rounded-2xl bg-[#F8FAFF] p-4 text-xs font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <CheckCircleIcon size={18} weight="fill" className="text-brand-blue" />
                  <span>100% Escrow Protected</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <ClockIcon size={15} weight="fill" />
                  <span>30–45 min dispatch</span>
                </span>
              </div>
            </IllustrationSlot>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM ROW: 3 PILLAR CARDS (No harsh borders, no heavy shadows)
            ========================================================================= */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="size-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 mb-5">
                  <item.icon size={24} weight="fill" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-950 font-sans">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-[15px] text-gray-600 leading-relaxed text-pretty">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
