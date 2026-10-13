"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
      {/* =========================================================================
          DESKTOP NAVIGATION (Floating Pill — md+)
          ========================================================================= */}
      <header
        className={`hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300 ${
          scrolled
            ? "shadow-[0_16px_40px_-8px_rgba(15,23,42,0.12)]"
            : "shadow-[0_8px_28px_-6px_rgba(15,23,42,0.07)]"
        }`}
      >
        <nav
          className="w-full flex items-center justify-between px-5 py-2 rounded-full bg-white/96 backdrop-blur-xl border border-gray-200/70"
          aria-label="Primary Navigation"
        >
          {/* Brand Logo — Left */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0 [-webkit-tap-highlight-color:transparent]"
            aria-label="QwikHelp Home"
          >
            <div className="relative flex items-center justify-center size-8 rounded-full bg-brand-blue text-white shadow-sm transition-transform duration-150 group-hover:scale-105">
              <svg
                className="size-4 fill-current"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13 2L3 14h7v8l10-12h-7l0-8z" />
              </svg>
            </div>
            <span className="text-[19px] font-bold tracking-tight text-gray-900 font-sans">
              Qwik<span className="text-brand-blue font-extrabold">Help</span>
            </span>
          </Link>

          {/* Centered Nav Links */}
          <ul
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 text-[13.5px] font-medium"
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-full text-gray-600 hover:text-gray-950 hover:bg-gray-100/80 transition-[color,background-color] duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right CTAs */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="#provider"
              className="text-[13.5px] font-medium text-gray-600 hover:text-gray-950 transition-colors duration-150 px-2"
            >
              Join as Pro
            </Link>
            <Link
              href="#get-started"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-brand-blue rounded-full shadow-[0_4px_14px_0_rgba(30,91,247,0.32)] transition-[background-color,box-shadow,transform] duration-150 hover:bg-brand-blue-hover hover:shadow-[0_6px_20px_0_rgba(30,91,247,0.42)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* =========================================================================
          MOBILE NAVIGATION (Non-Floating Full-Width Bar — < md)
          ========================================================================= */}
      <header className="block md:hidden sticky top-0 z-50 w-full bg-white/97 backdrop-blur-md border-b border-gray-100/90 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
        <div className="relative flex items-center justify-center px-4 py-3.5">
          {/* Centered Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 [-webkit-tap-highlight-color:transparent]"
            aria-label="QwikHelp Home"
          >
            <div className="flex items-center justify-center size-7 rounded-full bg-brand-blue text-white shadow-sm">
              <svg
                className="size-3.5 fill-current"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13 2L3 14h7v8l10-12h-7l0-8z" />
              </svg>
            </div>
            <span className="text-[17px] font-bold tracking-tight text-gray-900">
              Qwik<span className="text-brand-blue font-extrabold">Help</span>
            </span>
          </Link>

          {/* Hamburger — absolute right */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="absolute right-4 inline-flex items-center justify-center size-9 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-blue transition-colors duration-150 [-webkit-tap-highlight-color:transparent]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-5 pt-4 pb-6 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.08)] animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-3 rounded-xl text-[15px] font-medium text-gray-700 hover:text-brand-blue hover:bg-blue-50/60 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col gap-3">
              <Link
                href="#get-started"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3 px-5 text-sm font-semibold text-white bg-brand-blue rounded-2xl shadow-[0_4px_14px_0_rgba(30,91,247,0.35)] motion-safe:active:scale-[0.96] transition-[transform] duration-150 [-webkit-tap-highlight-color:transparent]"
              >
                Get Started
              </Link>
              <Link
                href="#provider"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3 px-5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl motion-safe:active:scale-[0.96] transition-[transform] duration-150 [-webkit-tap-highlight-color:transparent]"
              >
                Join as a Provider
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
