import Navbar from "@/components/Navbar";
import HeroImageStage from "@/components/HeroImageStage";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PhilosophyBanner from "@/components/PhilosophyBanner";
import ServicesGridSection from "@/components/ServicesGridSection";
import WhyUsBentoSection from "@/components/WhyUsBentoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import AppCtaBanner from "@/components/AppCtaBanner";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col overflow-x-hidden selection:bg-blue-100 selection:text-brand-blue">
      {/* =========================================================================
          NAVIGATION BAR
          - Floating pill on Desktop (md+)
          - Non-floating docked top bar on Mobile (< md)
          ========================================================================= */}
      <Navbar />

      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <main className="flex-1 flex flex-col items-center justify-start pt-8 md:pt-28 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 relative">
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
              href="#get-started"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand-blue text-white text-sm sm:text-[15px] font-semibold shadow-[0_4px_16px_0_rgba(30,91,247,0.38)] transition-[background-color,box-shadow,transform] duration-150 hover:bg-brand-blue-hover hover:shadow-[0_8px_24px_0_rgba(30,91,247,0.48)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
            >
              <span>Get Started</span>
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
              href="#provider"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-gray-800 text-sm sm:text-[15px] font-medium border border-gray-200/90 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-[background-color,border-color,transform] duration-150 hover:bg-gray-50/80 hover:border-gray-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
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
          2. ABOUT / WHAT IS QWIKHELP (Modeled after bimm.app #what-is-bimm)
          ========================================================================= */}
      <AboutSection />

      {/* =========================================================================
          3. HOW IT WORKS 3-STEP FLOW (Modeled after bimm.app #how-it-works)
          ========================================================================= */}
      <HowItWorksSection />

      {/* =========================================================================
          4. CORE PHILOSOPHY / IMPACT BANNER (Modeled after bimm.app statement banner)
          ========================================================================= */}
      <PhilosophyBanner />

      {/* =========================================================================
          5. SERVICES DIRECTORY & CATEGORIES (Modeled after bimm.app #deals)
          ========================================================================= */}
      <ServicesGridSection />

      {/* =========================================================================
          6. WHY US BENTO GRID (Modeled after bimm.app why section)
          ========================================================================= */}
      <WhyUsBentoSection />

      {/* =========================================================================
          7. VERIFIED REVIEWS & STORIES (Modeled after bimm.app reviews section)
          ========================================================================= */}
      <TestimonialsSection />

      {/* =========================================================================
          8. PRICING & PASSES (Concentric radii, strict skill compliance)
          ========================================================================= */}
      <PricingSection />

      {/* =========================================================================
          9. APP DOWNLOAD & PROVIDER CTA (Modeled after bimm.app download banner)
          ========================================================================= */}
      <AppCtaBanner />

      {/* =========================================================================
          10. FREQUENTLY ASKED QUESTIONS ACCORDION (Modeled after bimm.app FAQ)
          ========================================================================= */}
      <FaqSection />

      {/* =========================================================================
          11. COMPREHENSIVE MULTI-COLUMN FOOTER
          ========================================================================= */}
      <Footer />
    </div>
  );
}
