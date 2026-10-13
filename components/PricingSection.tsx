"use client";

import React, { useState } from "react";
import { PricingCard, PricingPlan } from "./PricingCard";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans: PricingPlan[] = [
    {
      id: "payg",
      name: "Pay per job",
      badge: "Flexible",
      tagline: "Ideal for occasional repairs and one-off bookings.",
      price: "$0",
      interval: "/subscription",
      description: "Book verified cooks, cleaners, plumbers, or electricians whenever you need them with transparent flat pricing.",
      features: [
        { text: "Identity-verified and background-checked artisans", included: true },
        { text: "In-app secure escrow payment protection", included: true },
        { text: "Up to $250 property damage guarantee", included: true },
        { text: "Standard dispatch (under 2 hours)", included: true },
        { text: "Free replacement artisan if unsatisfied", included: false },
        { text: "Zero emergency weekend surcharge", included: false },
      ],
      ctaLabel: "Browse local services",
      isPopular: false,
    },
    {
      id: "household-pass",
      name: "Household Care Pass",
      badge: "Most popular",
      tagline: "Complete peace of mind for busy families and homeowners.",
      price: billingCycle === "monthly" ? "$39" : "$29",
      interval: "/month",
      description: "Everything in Pay-per-job, plus 4 included service call-outs every month, zero surge rates, and priority dispatch.",
      features: [
        { text: "Identity-verified and background-checked artisans", included: true },
        { text: "4 monthly routine maintenance or cleaning sessions", included: true },
        { text: "Priority emergency dispatch in under 30 minutes", included: true },
        { text: "Full $1,500 property & recourse coverage", included: true },
        { text: "Free instant artisan replacement guarantee", included: true },
        { text: "Zero surge pricing on evenings and weekends", included: true },
      ],
      ctaLabel: "Start home coverage",
      isPopular: true,
    },
    {
      id: "estate",
      name: "Property Care Plus",
      badge: "High coverage",
      tagline: "For property managers, landlords, and larger estates.",
      price: billingCycle === "monthly" ? "$89" : "$75",
      interval: "/month",
      description: "Comprehensive preventive inspections, quarterly electrical & plumbing audits, and dedicated account manager.",
      features: [
        { text: "Unlimited scheduled preventative home inspections", included: true },
        { text: "Dedicated maintenance supervisor for your property", included: true },
        { text: "Direct line for tenant & guest service requests", included: true },
        { text: "Quarterly plumbing, AC, and wiring audits", included: true },
        { text: "$5,000 comprehensive recourse protection", included: true },
        { text: "Consolidated monthly billing & itemized receipts", included: true },
      ],
      ctaLabel: "Cover your property",
      isPopular: false,
    },
  ];

  return (
    <section
      id="pricing"
      aria-label="Service Pricing and Plans"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 text-balance tracking-tight font-sans">
          Simple, honest pricing.
          <span className="block text-brand-blue">No surprise contractor fees.</span>
        </h2>
        <p className="mt-3.5 text-base sm:text-lg text-gray-600 text-pretty leading-relaxed">
          Pay only when work is completed to your satisfaction, or choose a monthly plan for ongoing household care and emergency coverage.
        </p>

        {/* Concentric Radius Toggle: Outer is inner (rounded-lg = 8px) + padding (p-1 = 4px) -> rounded-xl (12px) */}
        <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-gray-100 border border-gray-200/80">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-[background-color,color,box-shadow] duration-150 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:enabled:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-blue ${
              billingCycle === "monthly"
                ? "bg-white text-gray-900 shadow-2xs font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-[background-color,color,box-shadow] duration-150 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:enabled:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-blue ${
              billingCycle === "annual"
                ? "bg-white text-gray-900 shadow-2xs font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Annual billing <span className="text-brand-blue font-semibold">(Save 25%)</span>
          </button>
        </div>
      </div>

      {/* Grid of 3 Plans */}
      <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            onSelectPlan={(id) => {
              console.log("Selected plan:", id);
            }}
          />
        ))}
      </div>

      {/* Assurance / Guarantee Note under cards */}
      <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="size-9 shrink-0 rounded-full bg-brand-blue text-white flex items-center justify-center">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              The QwikHelp Recourse Guarantee
            </h4>
            <p className="text-xs text-gray-600 mt-0.5 text-pretty">
              If a service isn&apos;t done right the first time, we send another top-rated professional for free or refund your payment within 24 hours.
            </p>
          </div>
        </div>
        <a
          href="#guarantee"
          className="shrink-0 text-xs font-semibold text-brand-blue hover:underline"
        >
          Learn about protection
        </a>
      </div>
    </section>
  );
}
