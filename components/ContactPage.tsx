"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import Illustration from "@/components/landing/Illustration";
import Reveal from "@/components/landing/Reveal";

// Single contact address — swap for a QwikHelp domain address when one exists.
const CONTACT_EMAIL = "celestialzenny@gmail.com";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context): the mailto link still works.
    }
  }

  return (
    <main className="flex-1 bg-white">
      <section className="mx-auto grid min-h-dvh w-full max-w-[1440px] items-center gap-12 px-5 pt-28 pb-20 sm:px-8 md:pt-36 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12 lg:pb-28">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1
            style={i(0)}
            className="enter-once text-[40px] font-extrabold leading-[1.05] text-gray-950 text-balance sm:text-6xl lg:text-7xl"
          >
            Say hello.
          </h1>

          <p style={i(1)} className="enter-once mt-6 max-w-md text-lg leading-relaxed text-gray-600 text-pretty sm:text-xl">
            Questions, feedback or partnerships? Send us an email and we&apos;ll get back to you.
          </p>

          <div style={i(2)} className="enter-once mt-10 flex w-full max-w-md flex-col gap-2.5 sm:flex-row">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Hello%20QwikHelp`}
              className="inline-flex min-h-14 flex-1 items-center justify-center truncate rounded-full bg-brand-blue px-6 text-base font-semibold text-white transition-[background-color,scale] duration-150 ease-out hover:bg-brand-blue-hover motion-safe:active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [-webkit-tap-highlight-color:transparent]"
            >
              {CONTACT_EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gray-100 px-6 text-[15px] font-semibold text-gray-800 transition-[background-color,scale] duration-150 ease-out hover:bg-gray-200 motion-safe:active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [-webkit-tap-highlight-color:transparent]"
            >
              {copied ? (
                <CheckIcon size={18} weight="bold" className="text-emerald-600" aria-hidden="true" />
              ) : (
                <CopyIcon size={18} aria-hidden="true" />
              )}
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <p style={i(3)} className="enter-once mt-6 text-sm text-gray-500">
            Looking for quick answers?{" "}
            <Link
              href="/#faq"
              className="font-semibold text-brand-blue underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Read the FAQs
            </Link>
          </p>
        </div>

        <Reveal>
          <div style={i(4)} className="enter-once enter-soft">
            <Illustration
              label="Illustration: friendly person reading a message on their phone"
              tone="blue"
              float
              className="aspect-square sm:aspect-[5/4] lg:aspect-square"
            />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
