import React from "react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Choose service & describe the task",
      tagline: "Instant fixed quotes",
      description:
        "Select your service category (cook, cleaner, plumber, electrician, AC tech) and specify what you need done. Receive transparent, upfront pricing with no hidden contractor add-ons.",
      visualBadge: "Step 1: Booking",
      visualPreview: {
        title: "Selected: Deep Cleaning + AC Service",
        meta: "Scheduled for Tomorrow, 10:00 AM",
        tag: "Fixed Quote: $45",
      },
    },
    {
      number: "02",
      title: "Match pro & lock funds in escrow",
      tagline: "Zero prepayment risk",
      description:
        "An identity-verified, background-checked professional accepts your job. Your payment is held securely in escrow — the artisan never receives payout until you inspect the finished work.",
      visualBadge: "Step 2: Safe Escrow",
      visualPreview: {
        title: "Funds Held Securely in Vault",
        meta: "Artisan dispatched with verified ID",
        tag: "Escrow Locked",
      },
    },
    {
      number: "03",
      title: "Inspect work & release payment",
      tagline: "Backed by Recourse Guarantee",
      description:
        "Once the service is completed, inspect the results. Approve in the app to release funds. If anything isn't right, our 24-hour guarantee sends a fix-it specialist free of charge or refunds you.",
      visualBadge: "Step 3: Peace of Mind",
      visualPreview: {
        title: "Job Approved & Guaranteed",
        meta: "Coverage active for 24 hours",
        tag: "100% Satisfied",
      },
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-label="How QwikHelp Works"
      className="w-full bg-white py-16 sm:py-24 border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100/80">
            <span className="text-xs font-semibold text-brand-blue font-sans">
              How It Works
            </span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-950 tracking-tight text-balance font-sans">
            Three simple steps to verified help.
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-gray-600 leading-relaxed text-pretty font-normal">
            No roadside haggling, no unverified strangers, and no fear of unfinished jobs. Here is how QwikHelp protects every booking.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 bg-white border border-gray-200/90 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.05)] transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_14px_36px_-10px_rgba(15,23,42,0.09)]"
            >
              <div>
                {/* Step Number & Tagline */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <span className="text-3xl font-extrabold text-brand-blue tabular-nums tracking-tight">
                    {step.number}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-blue border border-blue-100">
                    {step.tagline}
                  </span>
                </div>

                {/* Step Title & Description */}
                <h3 className="mt-4 text-lg sm:text-xl font-bold text-gray-900 text-balance font-sans">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm text-gray-600 leading-relaxed text-pretty">
                  {step.description}
                </p>
              </div>

              {/* Visual Simulation Block inside step */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/70 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-500">
                      {step.visualBadge}
                    </span>
                    <span className="text-[11px] font-bold text-brand-blue bg-white px-2 py-0.5 rounded-md border border-gray-200/60 shadow-2xs">
                      {step.visualPreview.tag}
                    </span>
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-gray-900 truncate">
                    {step.visualPreview.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {step.visualPreview.meta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
