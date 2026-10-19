"use client";

import React, { useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      question: "What is QwikHelp and how does it protect homeowners?",
      answer:
        "QwikHelp is an on-demand verified trades marketplace connecting you with thoroughly screened cooks, cleaners, plumbers, electricians, and technicians. Every job is covered by our secure escrow system — meaning artisans are never paid upfront, and funds are only disbursed after you inspect the finished work and approve.",
    },
    {
      id: "faq-2",
      question: "How does QwikHelp verify and vet each service professional?",
      answer:
        "Every pro goes through a rigorous four-stage screening process: government-issued ID validation (NIN/BVN), face biometric checks, in-person trade skill assessments, and residential guarantor confirmations. Only top-scoring artisans are granted active verified status on the platform.",
    },
    {
      id: "faq-3",
      question: "How does the escrow payment system protect my funds?",
      answer:
        "When you schedule a task, your payment is safely deposited into a secure digital vault rather than paid directly to the artisan. Once the service is completed, you perform a walk-through inspection and authorize payout with a single tap in the app. If a pro fails to arrive or doesn't complete the agreed scope, your deposit is refunded.",
    },
    {
      id: "faq-4",
      question: "What is covered under the QwikHelp Recourse Guarantee?",
      answer:
        "If any verified job is performed unsatisfactorily or fails within 24 hours of completion, QwikHelp immediately dispatches a senior specialist to correct the issue free of charge. In the rare event of accidental property damage during a job, our platform coverage provides reimbursement.",
    },
    {
      id: "faq-5",
      question: "How quickly can an artisan arrive at my location?",
      answer:
        "For urgent bookings (burst pipes, electrical outages, AC drainage failures), verified technicians arrive in 30 to 45 minutes on average across our active metro zones. You can also schedule days or weeks in advance at your preferred time slot.",
    },
    {
      id: "faq-6",
      question: "Can I hire the same trusted cook or cleaner on an ongoing basis?",
      answer:
        "Yes! Once you find a cook or cleaner who understands your household preferences, you can save them as a 'Favorite Pro' and automatically assign recurring daily, weekly, or bi-weekly bookings directly to their calendar.",
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="w-full py-16 sm:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[0.65fr_1.35fr] md:gap-20 md:items-start">
          {/* Left Column: Heading & Subtitle */}
          <div className="md:sticky md:top-28 text-center md:text-left">
            <h2
              id="customer-faq-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance font-sans text-center md:text-left"
            >
              Frequently asked questions.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed text-pretty text-center md:text-left">
              Everything you need to know about booking, escrow protection, and our vetting standards.
            </p>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-3xl bg-white p-6 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left font-sans text-base sm:text-lg font-bold text-gray-950 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [-webkit-tap-highlight-color:transparent]"
                  >
                    <span>{faq.question}</span>
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
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-3 text-sm sm:text-[15px] leading-relaxed text-gray-600 text-pretty">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
