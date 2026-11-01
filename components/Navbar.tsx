"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  variant?: "customer" | "provider";
}

export default function Navbar({ variant = "customer" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isProviderPage = variant === "provider";

  const navLinks = [
        { label: "Services", href: `${isProviderPage ? "/" : ""}#services` },
    { label: "How it works", href: `${isProviderPage ? "/" : ""}#how-it-works` },
    { label: "FAQs", href: `${isProviderPage ? "/" : ""}#faq` },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* =========================================================================
          DESKTOP NAVIGATION (md+) — Fixed, white, flat
          ========================================================================= */}
      <header className="fixed inset-x-0 top-0 z-50 hidden w-full bg-white md:block">
        <nav
          className="mx-auto grid min-h-[68px] w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 lg:px-12 lg:py-6"
          aria-label="Primary Navigation"
        >
          {/* ── Logo ──────────────────────────────── */}
          <Link href="/">
            <Image
              src="/logo-qh.png"
              alt="QwikHelp Logo"
              width={200}
              height={100}
              loading="eager"
              className="h-auto w-[160px] lg:w-[200px]"
            />
          </Link>

          {/* ── Nav links (centred) ───────────────── */}
          <ul
            className="flex items-center gap-0.5 text-[13.5px] font-medium"
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full px-3.5 text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── CTAs (right) ─────────────────────── */}
          <div className="flex items-center justify-end gap-2.5">
            {/* Secondary flat pill */}
            <Link
              href={isProviderPage ? "/" : "/provider"}
              className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-full bg-gray-100 px-5 text-[13.5px] font-medium text-gray-800 transition-colors duration-150 hover:bg-gray-200 hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [-webkit-tap-highlight-color:transparent]"
            >
              {isProviderPage ? "For customers" : "Join as Pro"}
            </Link>

            {/* Primary filled pill */}
            <Link
              href={isProviderPage ? "#getting-started" : "#waitlist"}
              className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-full bg-brand-blue px-5 text-[13.5px] font-semibold text-white transition-colors duration-150 hover:bg-brand-blue-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [-webkit-tap-highlight-color:transparent]"
            >
              {isProviderPage ? "How to join" : "Join waitlist"}
            </Link>
          </div>
        </nav>

      </header>

      {/* =========================================================================
          MOBILE NAVIGATION (< md) — Fixed, white, flat
          ========================================================================= */}
      <header className="fixed inset-x-0 top-0 z-50 block w-full bg-white md:hidden">
        <div className="relative mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <Image
              src="/logo-qh.png"
              alt="QwikHelp Logo"
              width={140}
              height={36}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Premium Long Double Dash Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex size-11 items-center justify-center rounded-full text-gray-950 transition-colors duration-150 hover:bg-gray-100 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [-webkit-tap-highlight-color:transparent]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-navigation"
          >
            <div
              className="relative flex flex-col justify-center items-center w-7 h-5 gap-[7px]"
              aria-hidden="true"
            >
              <span
                className={`block h-[2px] w-7 rounded-full bg-gray-950 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  mobileMenuOpen
                    ? "translate-y-[4.5px] rotate-45"
                    : "translate-y-0"
                }`}
              />
              <span
                className={`block h-[2px] w-7 rounded-full bg-gray-950 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  mobileMenuOpen
                    ? "-translate-y-[4.5px] -rotate-45"
                    : "translate-y-0"
                }`}
              />
            </div>
          </button>
        </div>


        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="bg-white px-5 pb-6 pt-4 sm:px-8 transition-all"
          >
            <nav
              className="mx-auto flex w-full max-w-[1440px] flex-col gap-1"
              aria-label="Mobile Navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-3.5 text-[15px] font-medium text-gray-800 transition-colors duration-150 hover:bg-blue-50/70 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mx-auto mt-4 flex w-full max-w-[1440px] flex-col gap-2.5 pt-2 sm:flex-row">
              <Link
                href={isProviderPage ? "#getting-started" : "#waitlist"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-brand-blue px-5 text-sm font-semibold text-white transition-all hover:bg-brand-blue-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [-webkit-tap-highlight-color:transparent] sm:w-auto"
              >
                {isProviderPage ? "How to join" : "Join waitlist"}
              </Link>
              <Link
                href={isProviderPage ? "/" : "/provider"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-gray-100 px-5 text-sm font-medium text-gray-800 transition-all hover:bg-gray-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [-webkit-tap-highlight-color:transparent] sm:w-auto"
              >
                {isProviderPage ? "For customers" : "Join as a provider"}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
