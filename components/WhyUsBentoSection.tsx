"use client";

import React from "react";
import {
  CurrencyCircleDollarIcon,
  ShieldCheckIcon,
  LockKeyIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";

export default function WhyUsBentoSection() {
  const bentoCards = [
    {
      title: "Transparent upfront pricing",
      subtitle: "No surprise contractor markups",
      description:
        "Every job rate is calculated based on standardized trade benchmarks before work starts. You know the exact cost upfront — no awkward bargaining at your doorstep.",
      highlight: "Fixed Quotes",
      badge: "Standardized Rates",
      icon: CurrencyCircleDollarIcon,
      iconColor: "text-brand-blue bg-blue-50",
    },
    {
      title: "Vetted background checks",
      subtitle: "100% verified identities",
      description:
        "We review government identification, verify residential address history, and test hands-on vocational proficiency before any provider is dispatched to your home.",
      highlight: "4-Stage Vetting",
      badge: "Zero Criminal Record",
      icon: ShieldCheckIcon,
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Zero-friction escrow protection",
      subtitle: "Pay only when satisfied",
      description:
        "Your payment sits safely locked in escrow during the job. When the artisan completes the service, you inspect and release the funds. If the job isn't done right, you don't pay.",
      highlight: "Escrow Locked",
      badge: "Guaranteed Recourse",
      icon: LockKeyIcon,
      iconColor: "text-brand-blue bg-blue-50",
    },
  ];

  return (
    <section
      aria-label="Why QwikHelp"
      className="w-full py-16 sm:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">


          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans">
            Home care with zero overthinking.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed text-pretty font-normal">
            Designed from the ground up to restore confidence and dignity in hiring domestic and maintenance professionals.
          </p>
        </div>

        {/* Bento Grid: 3 Pillars */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {bentoCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col justify-between rounded-3xl p-6 sm:p-8 bg-white transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`size-12 rounded-2xl ${card.iconColor} flex items-center justify-center shrink-0`}
                  >
                    <card.icon size={24} weight="fill" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F8FAFF] text-gray-700">
                    {card.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-gray-950 font-sans text-balance">
                  {card.title}
                </h3>
                <p className="text-xs font-semibold text-brand-blue mt-1">
                  {card.subtitle}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm sm:text-[15px] text-gray-600 leading-relaxed text-pretty">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-gray-800">
                <CheckCircleIcon size={16} weight="fill" className="text-emerald-500" />
                <span>{card.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
