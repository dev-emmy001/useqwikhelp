import React from "react";

export default function TestimonialsSection() {
  const reviews = [
    {
      id: "rev-1",
      name: "Chidinma A.",
      role: "Working Mother & Homeowner",
      location: "Victoria Island",
      avatarBg: "bg-blue-100 text-brand-blue",
      avatarInitials: "CA",
      rating: 5,
      jobCategory: "Private Cook • Weekly Meal Prep",
      quote:
        "Finding a trustworthy cook used to be a nerve-wracking cycle of informal referrals and unpredictable hygiene standards. On QwikHelp, Chef Sarah arrived punctual, certified, and prepped healthy meals for my family all week. The escrow guarantee removed every ounce of worry.",
    },
    {
      id: "rev-2",
      name: "Tunde O.",
      role: "Software Lead",
      location: "Yaba, Lagos",
      avatarBg: "bg-emerald-100 text-emerald-700",
      avatarInitials: "TO",
      rating: 5,
      jobCategory: "AC Repair & Drainage Diagnostic",
      quote:
        "My living room AC began dripping water heavily onto my workstation on a Saturday afternoon. Within 25 minutes, a technician was at my door with proper diagnostic gauges, replaced the drain fitting, and my escrow payment only cleared after I verified freezing cold air.",
    },
    {
      id: "rev-3",
      name: "Folake D.",
      role: "Short-let Host & Property Manager",
      location: "Lekki Phase 1",
      avatarBg: "bg-amber-100 text-amber-800",
      avatarInitials: "FD",
      rating: 5,
      jobCategory: "Deep Turnover Clean + Plumbing",
      quote:
        "The Household Pass has saved our hospitality ratings. When arriving guests report an emergency toilet blockage or our turnover team needs emergency reinforcement, QwikHelp dispatches in under an hour. The 24-hour recourse protection is an absolute gamechanger.",
    },
  ];

  return (
    <section
      id="testimonials"
      aria-label="Customer Reviews and Testimonials"
      className="w-full bg-gray-50/70 py-16 sm:py-24 border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white border border-gray-200/80 shadow-2xs">
            <span className="text-xs font-semibold text-gray-700 font-sans">
              Verified Stories
            </span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-950 tracking-tight text-balance font-sans">
            Real stories. Real peace of mind.
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-gray-600 leading-relaxed text-pretty font-normal">
            See how households and property owners protect their homes and save hours every week.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between rounded-3xl p-6 sm:p-8 bg-white border border-gray-200/90 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.05)] transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_14px_36px_-10px_rgba(15,23,42,0.08)]"
            >
              <div>
                {/* Rating & Job Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Verified Job
                  </span>
                </div>

                {/* Job Category */}
                <p className="text-xs font-semibold text-brand-blue mt-3">
                  {review.jobCategory}
                </p>

                {/* Quote */}
                <p className="mt-3 text-sm text-gray-700 leading-relaxed text-pretty">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                <div
                  className={`size-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${review.avatarBg}`}
                  aria-hidden="true"
                >
                  {review.avatarInitials}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {review.role} • {review.location}
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
