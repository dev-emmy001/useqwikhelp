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
        "Every pro goes through a rigorous four-stage screening process: government-issued ID validation, criminal background verification, in-person trade skill assessments, and residential guarantor confirmations. Only top-scoring artisans are granted active verified status on the platform.",
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
        "If any verified job is performed unsatisfactorily or fails within 24 hours of completion, QwikHelp immediately dispatches a senior specialist to correct the issue free of charge. In the rare event of accidental property damage during a job, our platform coverage provides reimbursement up to $1,500.",
    },
    {
      id: "faq-5",
      question: "How quickly can an artisan arrive at my location?",
      answer:
        "For emergency bookings (burst pipes, electrical outages, AC failure), verified technicians arrive in 30 to 45 minutes on average across our active metro zones. You can also schedule scheduled maintenance days or weeks in advance at your preferred time slot.",
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
      className="w-full bg-gray-50/70 py-16 sm:py-24 border-b border-gray-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white border border-gray-200/80 shadow-2xs">
            <span className="text-xs font-semibold text-gray-700 font-sans">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight text-balance font-sans">
            Everything you need to know.
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-gray-600 leading-relaxed text-pretty font-normal">
            Have questions about how verification, escrow payments, or our recourse guarantee work? Find your answers below.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-gray-200/90 shadow-2xs transition-[border-color,box-shadow] duration-150 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-gray-50/60 transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-blue [-webkit-tap-highlight-color:transparent]"
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 pr-4 font-sans text-balance">
                    {faq.question}
                  </span>
                  <div
                    className={`size-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-brand-blue text-white rotate-180"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <svg
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed text-pretty border-t border-gray-100 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-gray-200/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-bold text-gray-900">
              Still have questions about our guarantee?
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Our 24/7 client happiness team is always ready to assist you.
            </p>
          </div>
          <a
            href="mailto:support@qwikhelp.com"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl bg-gray-100 text-gray-800 hover:bg-brand-blue hover:text-white transition-[background-color,color] duration-150 motion-safe:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]"
          >
            Chat with support
          </a>
        </div>
      </div>
    </section>
  );
}
