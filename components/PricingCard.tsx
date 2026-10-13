import React from "react";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  price: string;
  interval: string;
  description: string;
  features: PricingFeature[];
  ctaLabel: string;
  isPopular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan?: (planId: string) => void;
}

/**
 * PricingCard component strictly following UI polish skills:
 * - better-ui:
 *   • Outer radius = inner radius + padding (concentric geometry)
 *   • Shadows for elevation + structural border for forced-colors mode
 *   • Press scales to exact 0.96 with motion-safe and disabled exclusion
 *   • Specific CSS property transitions, never transition-all
 *   • Icons using currentColor with stroke/fill matching typography weight
 *   • [-webkit-tap-highlight-color:transparent] to prevent mobile touch doubling
 * - baseline-ui:
 *   • text-balance for headings, text-pretty for body text
 *   • tabular-nums for numeric pricing values
 *   • size-* for square elements (no w-* + h-*)
 *   • Accessible focus-visible ring
 * - frontend-design:
 *   • Grounded in QwikHelp verified trades & home services subject matter
 *   • Sentence case, conversational tone, active voice CTAs
 *   • No cliché all-caps labels or tracked-out eyebrows
 */
export function PricingCard({ plan, onSelectPlan }: PricingCardProps) {
  const {
    id,
    name,
    badge,
    tagline,
    price,
    interval,
    description,
    features,
    ctaLabel,
    isPopular = false,
  } = plan;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-[border-color,box-shadow] duration-200 ${
        isPopular
          ? "bg-white border-2 border-brand-blue shadow-[0_16px_40px_-8px_rgba(30,91,247,0.12)] ring-1 ring-brand-blue/20"
          : "bg-white border border-gray-200/90 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] hover:border-gray-300"
      }`}
    >
      {/* Popular Highlight Badge */}
      {isPopular && badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-blue text-white shadow-xs">
            {badge}
          </span>
        </div>
      )}

      {/* Plan Header */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-gray-900 text-balance font-sans">
            {name}
          </h3>
          {!isPopular && badge && (
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>

        <p className="mt-1 text-sm text-gray-500 text-pretty font-normal">
          {tagline}
        </p>

        {/* Pricing Display */}
        <div className="mt-5 pb-5 border-b border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl sm:text-[42px] font-extrabold text-gray-950 tabular-nums tracking-tight">
              {price}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {interval}
            </span>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 text-pretty leading-relaxed">
            {description}
          </p>
        </div>

        {/* Feature List */}
        <ul className="mt-6 space-y-3.5" role="list">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div
                className={`size-5 shrink-0 rounded-full flex items-center justify-center mt-0.5 ${
                  feature.included
                    ? "bg-blue-50 text-brand-blue"
                    : "bg-gray-100 text-gray-400"
                }`}
                aria-hidden="true"
              >
                {feature.included ? (
                  /* Optical stroke weight matching semi-bold text */
                  <svg
                    className="size-3.5 text-brand-blue"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="size-3 text-gray-400"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm leading-snug text-pretty ${
                  feature.included ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA Container */}
      <div className="mt-8 pt-2">
        <button
          type="button"
          onClick={() => onSelectPlan?.(id)}
          className={`w-full inline-flex items-center justify-center h-11 px-5 rounded-xl font-medium text-sm transition-[background-color,border-color,color] duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:enabled:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] disabled:opacity-50 disabled:pointer-events-none ${
            isPopular
              ? "bg-brand-blue text-white shadow-[0_4px_14px_0_rgba(30,91,247,0.35)] hover:bg-brand-blue-hover"
              : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
