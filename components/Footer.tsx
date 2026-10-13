import React from "react";
import Link from "next/link";

export default function Footer() {
  const footerLinks = {
    services: [
      { label: "Private Cooks", href: "#services" },
      { label: "House & Deep Cleaning", href: "#services" },
      { label: "Plumbing & Piping", href: "#services" },
      { label: "Electrical & Inverters", href: "#services" },
      { label: "AC Repair & Servicing", href: "#services" },
      { label: "Carpentry & Assembly", href: "#services" },
    ],
    platform: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing & Passes", href: "#pricing" },
      { label: "Escrow Protection", href: "#about" },
      { label: "Recourse Guarantee", href: "#about" },
      { label: "Download App", href: "#download" },
    ],
    providers: [
      { label: "Join as an Artisan", href: "#provider" },
      { label: "Vetting Standards", href: "#about" },
      { label: "Artisan Benefits", href: "#provider" },
      { label: "Safety & Community", href: "#about" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Customer Reviews", href: "#testimonials" },
      { label: "Frequently Asked Questions", href: "#faq" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Contact Support", href: "mailto:support@qwikhelp.com" },
    ],
  };

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-gray-100">
          {/* Brand Info Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="QwikHelp Home"
            >
              <div className="size-7 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-xs">
                <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h7v8l10-12h-7l0-8z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-950 font-sans">
                Qwik<span className="text-brand-blue font-extrabold">Help</span>
              </span>
            </Link>

            <p className="mt-3.5 text-xs sm:text-sm text-gray-500 leading-relaxed text-pretty">
              The verified trades and domestic services platform with escrow protection and complete recourse guarantee.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-gray-600 font-medium">
                All systems normal • 24/7 Dispatch active
              </span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
              {footerLinks.services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-brand-blue transition-colors duration-150">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
              {footerLinks.platform.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-brand-blue transition-colors duration-150">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Providers Column */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">
              For Providers
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
              {footerLinks.providers.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-brand-blue transition-colors duration-150">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-brand-blue transition-colors duration-150">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © 2026 QwikHelp Technologies Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>Identity Vetted</span>
            <span>•</span>
            <span>Escrow Protected</span>
            <span>•</span>
            <span>Recourse Backed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
