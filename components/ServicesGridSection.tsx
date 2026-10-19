"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BroomIcon,
  CookingPotIcon,
  HammerIcon,
  LightningIcon,
  SnowflakeIcon,
  StarIcon,
  WrenchIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";

interface ServiceItem {
  id: string;
  category: "all" | "domestic" | "repairs" | "installation";
  icon: typeof BroomIcon;
  iconBg: string;
  title: string;
  tagline: string;
  description: string;
  dispatchTime: string;
  startingPrice: string;
  rating: string;
  reviewsCount: string;
}

export default function ServicesGridSection() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "domestic" | "repairs" | "installation"
  >("all");

  const services: ServiceItem[] = [
    {
      id: "cooks",
      category: "domestic",
      icon: CookingPotIcon,
      iconBg: "bg-red-50 text-red-600",
      title: "Cooks & Meal Prep",
      tagline: "Healthy daily dining",
      description:
        "Trained private cooks for routine family meals, batch meal prep, and weekend gatherings.",
      dispatchTime: "Under 1 hr",
      startingPrice: "₦15,000",
      rating: "4.96",
      reviewsCount: "340+",
    },
    {
      id: "cleaners",
      category: "domestic",
      icon: BroomIcon,
      iconBg: "bg-amber-50 text-amber-600",
      title: "Home & Deep Cleaning",
      tagline: "Spotless living spaces",
      description:
        "Vetted cleaners equipped for routine housekeeping, move-in deep cleaning, and post-event refreshes.",
      dispatchTime: "Under 30 mins",
      startingPrice: "₦12,000",
      rating: "4.92",
      reviewsCount: "820+",
    },
    {
      id: "plumbers",
      category: "repairs",
      icon: WrenchIcon,
      iconBg: "bg-blue-50 text-brand-blue",
      title: "Plumbing & Drainage",
      tagline: "Leak & drainage masters",
      description:
        "Certified plumbing specialists for bursting pipes, blocked drains, water pumps, and fixture installs.",
      dispatchTime: "Under 45 mins",
      startingPrice: "₦10,000",
      rating: "4.94",
      reviewsCount: "610+",
    },
    {
      id: "electricians",
      category: "repairs",
      icon: LightningIcon,
      iconBg: "bg-emerald-50 text-emerald-600",
      title: "Electrical & Inverters",
      tagline: "Safe power solutions",
      description:
        "Licensed electricians for wiring diagnostics, generator changeover switches, fuse boxes, and solar setups.",
      dispatchTime: "Under 35 mins",
      startingPrice: "₦12,000",
      rating: "4.95",
      reviewsCount: "480+",
    },
    {
      id: "ac-repair",
      category: "installation",
      icon: SnowflakeIcon,
      iconBg: "bg-cyan-50 text-cyan-600",
      title: "AC & Appliance Repair",
      tagline: "Cooling & diagnostics",
      description:
        "Diagnostic technicians for AC gas refilling, refrigerator malfunctions, washing machine errors, and maintenance.",
      dispatchTime: "Under 45 mins",
      startingPrice: "₦15,000",
      rating: "4.89",
      reviewsCount: "520+",
    },
    {
      id: "carpentry",
      category: "installation",
      icon: HammerIcon,
      iconBg: "bg-purple-50 text-purple-600",
      title: "Carpentry & Joinery",
      tagline: "Custom woodwork & repair",
      description:
        "Master carpenters for door alignments, custom kitchen cabinetry, wardrobe repairs, and furniture assembly.",
      dispatchTime: "Under 60 mins",
      startingPrice: "₦15,000",
      rating: "4.91",
      reviewsCount: "290+",
    },
  ];

  const filteredServices =
    selectedFilter === "all"
      ? services
      : services.filter((s) => s.category === selectedFilter);

  return (
    <section
      id="services"
      aria-label="Verified Services Directory"
      className="w-full py-16 sm:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans">
              Explore verified services
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed text-pretty">
              Every pro is identity-checked, skill-evaluated, and protected by escrow.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-white self-center md:self-auto gap-1">
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
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-150 motion-safe:enabled:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] ${selectedFilter === tab.value
                  ? "bg-brand-blue text-white"
                  : "text-gray-600 hover:text-gray-950 hover:bg-gray-50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between rounded-3xl p-6 sm:p-7 bg-white transition-all duration-200 hover:-translate-y-1"
            >
              <div>
                {/* Top Row: Icon & Rating */}
                <div className="flex items-center justify-between">
                  <div
                    className={`size-12 rounded-2xl ${service.iconBg} flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105`}
                  >
                    <service.icon size={24} weight="fill" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800 bg-[#F8FAFF] px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <StarIcon size={14} weight="fill" className="text-amber-400" />
                    <span>{service.rating}</span>
                    <span className="text-gray-400 font-normal">
                      ({service.reviewsCount})
                    </span>
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="mt-5 text-lg sm:text-xl font-bold text-gray-950 font-sans">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-brand-blue mt-0.5">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="mt-2.5 text-sm text-gray-600 leading-relaxed text-pretty">
                  {service.description}
                </p>
              </div>

              {/* Bottom Meta & Action */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-400 block font-normal">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base sm:text-lg font-bold text-gray-950 tabular-nums">
                      {service.startingPrice}
                    </span>
                    <span className="text-xs text-gray-500 font-normal flex items-center gap-1">
                      <ClockIcon size={12} weight="fill" />
                      {service.dispatchTime}
                    </span>
                  </div>
                </div>

                <Link
                  href="#get-started"
                  className="inline-flex items-center gap-1.5 justify-center px-4 py-2.5 rounded-full text-xs font-semibold bg-blue-50 text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-150 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
                >
                  <span>Book now</span>
                  <ArrowRightIcon size={12} weight="bold" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
