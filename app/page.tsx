import Navbar from "@/components/Navbar";
import HeroImageStage from "@/components/HeroImageStage";
import AboutSection from "@/components/AboutSection";
import ServicesGridSection from "@/components/ServicesGridSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyUsBentoSection from "@/components/WhyUsBentoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import AppCtaBanner from "@/components/AppCtaBanner";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFF] flex flex-col overflow-x-hidden selection:bg-blue-100 selection:text-brand-blue">
      {/* =========================================================================
          NAVIGATION BAR
          - Floating pill on Desktop (md+)
          - Non-floating docked top bar on Mobile (< md)
          ========================================================================= */}
      <Navbar />

      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <main className="flex-1 flex flex-col items-center justify-start pt-24 sm:pt-28 md:pt-28 lg:pt-32 pb-8 sm:pb-12 px-5 sm:px-8 lg:px-12 relative w-full">
        {/* Soft Ambient Background Highlights */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent blur-3xl rounded-full pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Hero Text Content Container */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Main Display Headline */}
          <h1 className="text-[34px] sm:text-5xl md:text-[56px] lg:text-[62px] font-extrabold tracking-[-0.03em] leading-[1.12] text-gray-950 font-sans text-balance">
            Based on our Calculations,
            <span className="block mt-1 sm:mt-2">
              You Need{" "}
              <span className="text-brand-blue font-extrabold">
                Qwikhelp!
              </span>
            </span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="mt-5 sm:mt-6 text-[15px] sm:text-lg md:text-[18.5px] leading-relaxed text-gray-600 max-w-2xl font-normal text-pretty px-2">
            Find verified cooks, cleaners, plumbers, and more near you; pay
            securely, communicate in-app, and get real recourse if anything goes
            wrong.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-row items-center justify-center gap-3.5 sm:gap-4 flex-wrap">
            {/* Primary CTA */}
            <Link
              href="#services"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand-blue text-white text-sm sm:text-[15px] font-semibold transition-all duration-150 hover:bg-brand-blue-hover motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
            >
              <span>Explore Services</span>
              <svg
                className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/provider"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-gray-800 text-sm sm:text-[15px] font-medium transition-all duration-150 hover:bg-gray-50 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
            >
              Join as a Provider
            </Link>
          </div>
        </div>

        {/* HERO IMAGE STAGE */}
        <section
          aria-label="Verified Service Professionals"
          className="w-full flex justify-center"
        >
          <HeroImageStage
            imageSrc="/hero-workers.png"
            imageAlt="QwikHelp verified team: chef, electrician, plumber, and carpenter"
          />
        </section>
      </main>

      {/* =========================================================================
          2. ABOUT / WHAT IS QWIKHELP
          ========================================================================= */}
      <AboutSection />

      {/* =========================================================================
          3. VERIFIED SERVICES DIRECTORY (Cooks, Cleaners, Plumbers, Electricians...)
          ========================================================================= */}
      <ServicesGridSection />

      {/* =========================================================================
          4. HOW IT WORKS 3-STEP FLOW
          ========================================================================= */}
      <HowItWorksSection />

      {/* =========================================================================
          5. WHY QWIKHELP / TRUST PILLARS
          ========================================================================= */}
      <WhyUsBentoSection />

      {/* =========================================================================
          6. VERIFIED STORIES / TESTIMONIALS
          ========================================================================= */}
      <TestimonialsSection />

      {/* =========================================================================
          7. FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <FaqSection />

      {/* =========================================================================
          8. APP CTA BANNER (iOS & Android)
          ========================================================================= */}
      <AppCtaBanner />

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <Footer />
    </div>
  );
}
