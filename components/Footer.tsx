"use client";
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

const navItems = [
  { label: "Our Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Facebook", href: "#facebook", icon: FacebookLogoIcon },
  { label: "Instagram", href: "#instagram", icon: InstagramLogoIcon },
  { label: "LinkedIn", href: "#linkedin", icon: LinkedinLogoIcon },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a60d9] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start gap-5 py-6 md:flex-row md:items-center md:justify-between md:gap-6 md:py-7">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-label="QwikHelp Home"
          >
            <Image
              src="/QwikHelp-logo.png"
              alt=""
              width={200}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-white/90 sm:gap-x-6 md:gap-x-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-white/25 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-sm text-white/85">
            Trusted hands, everyday help. Right near you.
          </p>

          <nav aria-label="Social media" className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <social.icon size={18} weight="fill" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-4 text-sm text-white/85 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p>© 2026 QwikHelp. All rights reserved.</p>

          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <Link
              href="#privacy"
              className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
