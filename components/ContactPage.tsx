"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChatCircleDotsIcon,
  EnvelopeSimpleIcon,
  PhoneCallIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  CopyIcon,
  CheckIcon,
  ArrowSquareOutIcon,
  WhatsappLogoIcon,
  UserCheckIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import IllustrationSlot from "@/components/IllustrationSlot";
import { OrangeFlower, BlueRibbon } from "@/components/DoodleBadges";

interface ContactChannel {
  id: string;
  title: string;
  description: string;
  destination: string;
  displayValue: string;
  type: "email" | "whatsapp" | "phone";
  badge: string;
  badgeColor?: string;
  actionText: string;
  icon: typeof EnvelopeSimpleIcon;
}

const contactChannels: ContactChannel[] = [
  {
    id: "whatsapp",
    title: "Direct WhatsApp Support",
    description:
      "Connect directly with our support desk on WhatsApp. Ideal for immediate questions, active booking updates, or quick queries.",
    destination:
      "https://wa.me/2348000000000?text=Hello%20QwikHelp%2C%20I%20would%20like%20assistance%20with...",
    displayValue: "+234 800 000 0000",
    type: "whatsapp",
    badge: "Fastest · < 5 min response",
    actionText: "Open WhatsApp Chat",
    icon: WhatsappLogoIcon,
  },
  {
    id: "support-email",
    title: "Customer Help & Bookings",
    description:
      "Assistance with customer accounts, escrow payments, hiring service pros, or general app inquiries.",
    destination: "mailto:support@qwikhelp.com?subject=Customer%20Support%20Inquiry",
    displayValue: "support@qwikhelp.com",
    type: "email",
    badge: "General Support",
    actionText: "Send an Email",
    icon: EnvelopeSimpleIcon,
  },
  {
    id: "provider-desk",
    title: "Provider Onboarding & Verification",
    description:
      "Need help with NIN/BVN review, facial verification, guarantor documentation, or wallet payout status?",
    destination: "mailto:providers@qwikhelp.com?subject=Provider%20Verification%20Support",
    displayValue: "providers@qwikhelp.com",
    type: "email",
    badge: "For Pros & Handymen",
    actionText: "Email Provider Desk",
    icon: UserCheckIcon,
  },
  {
    id: "disputes",
    title: "Escrow & Dispute Resolution",
    description:
      "Dedicated priority queue for active job disputes, cancellation reviews, or escrow mediation.",
    destination: "mailto:disputes@qwikhelp.com?subject=Priority%20Dispute%20Escalation",
    displayValue: "disputes@qwikhelp.com",
    type: "email",
    badge: "Priority Triage",
    actionText: "Contact Trust & Safety",
    icon: ShieldCheckIcon,
  },
];

const quickHelpItems = [
  {
    q: "How does the escrow payment guarantee work?",
    a: "When a customer books a job, funds are held securely in QwikHelp escrow. The provider starts work knowing payment is funded. Funds are only transferred to the provider's wallet when both parties confirm completion.",
  },
  {
    q: "How do providers verify their identity?",
    a: "Providers submit a valid NIN or BVN, government photo ID, real-time facial verification, and a verified guarantor. Our security team reviews every application before the profile appears in searches.",
  },
  {
    q: "What happens if there is an issue with the service?",
    a: "Do not mark the job as completed. Open the job menu in the app and select 'Raise Dispute'. Our mediation team will review chat logs, agreed terms, and evidence to resolve the issue promptly.",
  },
  {
    q: "Can I speak to someone on the phone?",
    a: "Yes! Our direct WhatsApp line supports voice calls during operating hours (Mon–Sat, 8am–8pm WAT). You can also request an urgent call-back via our support email.",
  },
];

export default function ContactPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFF] flex flex-col overflow-x-hidden selection:bg-blue-100 selection:text-brand-blue">
      {/* =========================================================================
          HERO SECTION: 2-COLUMN WITH DEDICATED ILLUSTRATION STAGE
          ========================================================================= */}
      <main className="flex-1 flex flex-col items-center justify-start pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12 relative w-full">
        {/* Soft Ambient Background Highlights */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent blur-3xl rounded-full pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Hero 2-Column Layout */}
        <div className="w-full max-w-[1440px] mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Text & Action */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Main Display Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-[56px] font-extrabold tracking-[-0.03em] leading-tight sm:leading-[1.12] text-gray-950 font-sans text-balance text-center lg:text-left">
              Talk directly with{" "}
              <span className="text-brand-blue font-extrabold">real humans.</span>
              <span className="block mt-1 sm:mt-2 text-gray-950">
                Zero forms. Instant answers.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 sm:mt-6 text-[15px] sm:text-lg md:text-[18.5px] leading-relaxed text-gray-600 max-w-xl font-normal text-pretty text-center lg:text-left">
              Skip filling out 10-field web forms and waiting days for an email back.
              Choose the specific direct channel below to connect with our team right away.
            </p>

            {/* Fast Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
              <a
                href="https://wa.me/2348000000000?text=Hello%20QwikHelp%2C%20I%20would%20like%20assistance%20with..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-hover transition-all duration-150 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
              >
                <span>Chat on WhatsApp</span>
                <ArrowSquareOutIcon size={16} aria-hidden="true" />
              </a>
              <a
                href="mailto:support@qwikhelp.com?subject=Customer%20Support%20Inquiry"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-gray-800 text-sm font-semibold hover:bg-gray-100 transition-all duration-150 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
              >
                Email support team
              </a>
            </div>
          </div>

          {/* Right: Dedicated Support Illustration Stage */}
          <div className="w-full flex justify-center">
            <IllustrationSlot
              label="Direct Customer Care & Support Concierge"
              hint="Place your friendly support team / concierge illustration here"
              aspect="aspect-[4/3] sm:aspect-[16/11]"
              variant="light"
            >
              {/* Floating Doodle Accent */}
              <div className="absolute -top-4 right-6 z-20 hidden sm:block">
                <OrangeFlower />
              </div>
              <div className="absolute bottom-6 left-6 z-20 hidden sm:block">
                <BlueRibbon />
              </div>
            </IllustrationSlot>
          </div>
        </div>

        {/* =========================================================================
            CHANNELS GRID (No border, no shadow)
            ========================================================================= */}
        <div className="w-full max-w-[1440px] mx-auto mt-16 sm:mt-24 grid gap-6 md:grid-cols-2">
          {contactChannels.map((channel) => {
            const Icon = channel.icon;
            const isCopied = copiedId === channel.id;

            return (
              <div
                key={channel.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-7 sm:p-8 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-brand-blue group-hover:scale-105 transition-transform duration-200">
                      <Icon size={24} weight="fill" className="text-brand-blue" aria-hidden="true" />
                    </span>

                    <span className="inline-flex items-center rounded-full bg-blue-50/70 px-3 py-1 text-xs font-semibold text-brand-blue">
                      {channel.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-950 font-sans tracking-tight">
                    {channel.title}
                  </h2>
                  <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-gray-600 text-pretty">
                    {channel.description}
                  </p>

                  {/* Value / Address Card with Copy Action */}
                  <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-[#F8FAFF] p-3.5 sm:p-4">
                    <span className="text-sm sm:text-[15px] font-semibold text-gray-900 font-mono truncate">
                      {channel.displayValue}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(channel.id, channel.displayValue)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-100 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-blue"
                      aria-label={`Copy ${channel.displayValue}`}
                    >
                      {isCopied ? (
                        <>
                          <CheckIcon size={14} className="text-emerald-600" weight="bold" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon size={14} className="text-gray-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="mt-7">
                  <a
                    href={channel.destination}
                    target={channel.type === "whatsapp" ? "_blank" : undefined}
                    rel={channel.type === "whatsapp" ? "noopener noreferrer" : undefined}
                    className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-brand-blue px-6 text-sm sm:text-[15px] font-semibold text-white transition-all duration-150 hover:bg-brand-blue-hover motion-safe:active:scale-[0.98] [-webkit-tap-highlight-color:transparent]"
                  >
                    <span>{channel.actionText}</span>
                    <ArrowSquareOutIcon size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            HOURS & LOCATION INFO BANNER (No border, no shadow)
            ========================================================================= */}
        <div className="w-full max-w-[1440px] mx-auto mt-10 sm:mt-12">
          <div className="rounded-3xl bg-white p-7 sm:p-9 grid gap-6 sm:grid-cols-3">
            {/* Hours */}
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                <ClockIcon size={22} weight="fill" className="text-brand-blue" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-gray-950 font-sans">
                  Support Operating Hours
                </h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  Monday – Saturday: 8:00 AM – 8:00 PM (WAT)
                  <br />
                  <span className="text-xs text-gray-500">Emergency dispute hotline active 24/7</span>
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                <MapPinIcon size={22} weight="fill" className="text-brand-blue" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-gray-950 font-sans">
                  Headquarters & Operations
                </h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  Abia, Nigeria
                  <br />
                  <span className="text-xs text-gray-500">Serving neighbourhoods across major hubs</span>
                </p>
              </div>
            </div>

            {/* Escrow Guarantee */}
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                <ShieldCheckIcon size={22} weight="fill" className="text-brand-blue" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-gray-950 font-sans">
                  Escrow Protection Guarantee
                </h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  Active job dispute mediation
                  <br />
                  <span className="text-xs text-gray-500">Every Naira held safely until mutual sign-off</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            INSTANT SELF-SERVICE ACCORDION (FAQ)
            ========================================================================= */}
        <section
          aria-labelledby="faq-title"
          className="w-full max-w-[1440px] mx-auto mt-16 sm:mt-24 pt-8"
        >
          <div className="grid gap-10 md:grid-cols-[0.65fr_1.35fr] md:gap-16 items-start">
            <div className="md:sticky md:top-28 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4">
                Self-Service
              </span>
              <h2
                id="faq-title"
                className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans text-center md:text-left"
              >
                Before you reach out...
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600 text-pretty mx-auto md:mx-0 text-center md:text-left">
                You might find the exact resolution to your question right here in our frequently answered topics.
              </p>

              {/* Dedicated Illustration Slot in FAQ Sidebar */}
              <div className="mt-6 hidden md:block">
                <IllustrationSlot
                  label="Knowledge & Dispute Guidelines"
                  hint="Place FAQ / guidance illustration here"
                  aspect="aspect-[16/10]"
                  variant="white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3.5 sm:gap-4">
              {quickHelpItems.map((item, index) => {
                const isOpen = openFaqIndices.includes(index);
                return (
                  <div
                    key={item.q}
                    className="rounded-2xl bg-white p-5 sm:p-6 transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 text-left font-sans text-sm sm:text-[16px] font-semibold text-gray-950 transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                    >
                      <span>{item.q}</span>
                      <span
                        aria-hidden="true"
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-base font-medium transition-all duration-200 ${isOpen
                            ? "rotate-45 bg-blue-50 text-brand-blue"
                            : "text-gray-500 bg-gray-100 hover:bg-gray-200/80"
                          }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-3 text-sm sm:text-[15px] leading-relaxed text-gray-600 text-pretty">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
