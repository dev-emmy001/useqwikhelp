import React from "react";

export default function WhyUsBentoSection() {
  const bentoCards = [
    {
      title: "Transparent upfront pricing",
      subtitle: "No surprise contractor markups",
      description:
        "Every job rate is calculated based on standardized trade benchmarks before work starts. You know the exact cost upfront — no awkward bargaining at your doorstep.",
      highlight: "Fixed Quotes",
      badge: "Standardized",
      icon: (
        <svg className="size-6 text-brand-blue" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
    },
    {
      title: "Vetted background checks",
      subtitle: "100% verified identities",
      description:
        "We review government identification, verify residential address history, and test hands-on vocational proficiency before any provider is dispatched to your home.",
      highlight: "4-Stage Vetting",
      badge: "Zero Criminal History",
      icon: (
        <svg className="size-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
    },
    {
      title: "Zero-friction escrow protection",
      subtitle: "Pay only when satisfied",
      description:
        "Your payment sits safely locked in escrow during the job. When the artisan completes the service, you inspect and release the funds. If the job isn't done right, you don't pay.",
      highlight: "Escrow Locked",
      badge: "Guaranteed Recourse",
      icon: (
        <svg className="size-6 text-brand-blue" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-label="Why QwikHelp"
      className="w-full bg-white py-16 sm:py-24 border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-xs font-semibold text-brand-blue font-sans">
              Why QwikHelp?
            </span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-950 tracking-tight text-balance font-sans">
            Home care with zero overthinking.
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-gray-600 leading-relaxed text-pretty font-normal">
            Designed from the ground up to restore confidence and dignity in hiring domestic and maintenance professionals.
          </p>
        </div>

        {/* Bento Grid: 3 Pillars */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {bentoCards.map((card, i) => (
            <div
              key={i}
              className="relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 bg-white border border-gray-200/90 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.05)] transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_16px_36px_-10px_rgba(15,23,42,0.08)]"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="size-12 rounded-2xl bg-gray-50 border border-gray-200/60 flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                    {card.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-gray-900 font-sans text-balance">
                  {card.title}
                </h3>
                <p className="text-xs font-semibold text-brand-blue mt-1">
                  {card.subtitle}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-600 leading-relaxed text-pretty">
                  {card.description}
                </p>
              </div>

              {/* Bottom Visual Tag */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">Standard</span>
                <span className="font-semibold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                  {card.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
