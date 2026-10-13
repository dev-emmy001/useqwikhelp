"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  category: "all" | "domestic" | "repairs" | "installation";
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  dispatchTime: string;
  startingPrice: string;
  rating: string;
  reviewsCount: string;
}

export default function ServicesGridSection() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "domestic" | "repairs" | "installation">("all");

  const services: ServiceItem[] = [
    {
      id: "cooks",
      category: "domestic",
      emoji: "👩🏾‍🍳",
      title: "Cooks & Meal Prep",
      tagline: "Healthy daily dining",
      description: "Trained private cooks for daily family meals, meal-prep batches, or intimate weekend dinner parties.",
      dispatchTime: "Under 1 hr",
      startingPrice: "$35",
      rating: "4.96",
      reviewsCount: "340+",
    },
    {
      id: "cleaners",
      category: "domestic",
      emoji: "🧹",
      title: "Home & Deep Cleaning",
      tagline: "Spotless living spaces",
      description: "Vetted cleaners equipped for routine housekeeping, thorough move-in deep cleans, and post-event refreshes.",
      dispatchTime: "Under 30 mins",
      startingPrice: "$25",
      rating: "4.92",
      reviewsCount: "820+",
    },
    {
      id: "plumbers",
      category: "repairs",
      emoji: "🔧",
      title: "Plumbing & Piping",
      tagline: "Leak & drainage masters",
      description: "Certified plumbing specialists for bursting pipes, blocked drains, water heater installs, and bathroom fixtures.",
      dispatchTime: "Under 45 mins",
      startingPrice: "$30",
      rating: "4.94",
      reviewsCount: "610+",
    },
    {
      id: "electricians",
      category: "repairs",
      emoji: "⚡",
      title: "Electrical & Inverters",
      tagline: "Safe power solutions",
      description: "Licensed electricians for wiring diagnostics, generator changeover switches, fuse box fixes, and solar setups.",
      dispatchTime: "Under 35 mins",
      startingPrice: "$30",
      rating: "4.95",
      reviewsCount: "480+",
    },
    {
      id: "ac-repair",
      category: "installation",
      emoji: "❄️",
      title: "AC & Appliance Repair",
      tagline: "Cooling & electronics",
      description: "Diagnostic technicians for AC gas refilling, refrigerator malfunctions, washing machine errors, and maintenance.",
      dispatchTime: "Under 60 mins",
      startingPrice: "$40",
      rating: "4.89",
      reviewsCount: "520+",
    },
    {
      id: "carpentry",
      category: "installation",
      emoji: "🔨",
      title: "Carpentry & Joinery",
      tagline: "Custom woodwork & repair",
      description: "Master carpenters for door alignments, custom kitchen cabinetry, wardrobe repairs, and furniture assembly.",
      dispatchTime: "Under 90 mins",
      startingPrice: "$35",
      rating: "4.91",
      reviewsCount: "290+",
    },
  ];

  const filteredServices = selectedFilter === "all"
    ? services
    : services.filter((s) => s.category === selectedFilter);

  return (
    <section
      id="services"
      aria-label="Verified Services Directory"
      className="w-full bg-gray-50/50 py-16 sm:py-24 border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white border border-gray-200/80 shadow-2xs">
              <span className="text-xs font-semibold text-gray-700">
                Services Directory
              </span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight text-balance font-sans">
              Explore verified services
            </h2>
            <p className="mt-2 text-base text-gray-600 text-pretty">
              Every professional is identity-checked, skill-evaluated, and protected by escrow.
            </p>
          </div>

          {/* Filter Tabs: Concentric radius outer (rounded-xl) with inner (rounded-lg) */}
          <div className="inline-flex items-center p-1 rounded-xl bg-gray-100 border border-gray-200/80 self-start md:self-auto">
            {(
              [
                { label: "All services", value: "all" },
                { label: "Domestic", value: "domestic" },
                { label: "Repairs", value: "repairs" },
                { label: "Installations", value: "installation" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSelectedFilter(tab.value)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-[background-color,color] duration-150 motion-safe:enabled:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-blue ${
                  selectedFilter === tab.value
                    ? "bg-white text-gray-950 shadow-2xs font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between rounded-3xl p-6 bg-white border border-gray-200/80 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow,transform] duration-200 hover:border-gray-300 hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.08)] motion-safe:hover:-translate-y-0.5"
            >
              <div>
                {/* Top Row: Emoji & Rating */}
                <div className="flex items-center justify-between">
                  <div className="size-12 rounded-2xl bg-blue-50/80 border border-blue-100/60 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform duration-150">
                    {service.emoji}
                  </div>
                  <span className="text-xs font-semibold text-gray-700 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 flex items-center gap-1">
                    ⭐ {service.rating} <span className="text-gray-400 font-normal">({service.reviewsCount})</span>
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="mt-4 text-lg font-bold text-gray-900 font-sans">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-brand-blue mt-0.5">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="mt-2.5 text-sm text-gray-600 leading-relaxed text-pretty">
                  {service.description}
                </p>
              </div>

              {/* Bottom Meta & Action */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-400 block font-normal">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-gray-950 tabular-nums">
                      {service.startingPrice}
                    </span>
                    <span className="text-xs text-gray-500 font-normal">
                      • {service.dispatchTime}
                    </span>
                  </div>
                </div>

                <Link
                  href="#get-started"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-brand-blue hover:text-white transition-[background-color,color] duration-150 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
                >
                  Book now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
