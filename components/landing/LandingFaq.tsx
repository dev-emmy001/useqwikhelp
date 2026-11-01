import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

export type FaqItem = { q: string; a: string };

const customerFaqs: FaqItem[] = [
  {
    q: "What is QwikHelp?",
    a: "An app for booking verified cooks, cleaners, plumbers, electricians and technicians near you, with your payment protected until the job is done.",
  },
  {
    q: "How are pros verified?",
    a: "Every pro passes an ID check (NIN/BVN), a face match, a skills assessment and guarantor confirmation before they can take a job.",
  },
  {
    q: "How does escrow protect my money?",
    a: "When you book, QwikHelp holds your payment, not the pro. You release it after checking the work. If the job isn't done, you get your money back.",
  },
  {
    q: "What if something goes wrong?",
    a: "Report it within 24 hours. We'll send another pro to fix it at no cost, or refund you.",
  },
  {
    q: "Can I book the same pro again?",
    a: "Yes. Save pros you like and rebook them anytime, including recurring weekly visits.",
  },
  {
    q: "When do you launch?",
    a: "Soon, city by city. Join the waitlist and you'll be the first to know when we're live near you.",
  },
];

export default function LandingFaq({ items = customerFaqs }: { items?: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <details
          key={item.q}
          name="faq"
          style={{ "--i": i } as React.CSSProperties}
          className="faq-item reveal-item group rounded-2xl bg-gray-50 px-5 transition-[background-color] duration-150 not-open:hover:bg-gray-100 open:bg-brand-blue-light sm:px-6 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-gray-950 text-balance sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
            {item.q}
            <PlusIcon
              size={20}
              weight="bold"
              aria-hidden="true"
              className="shrink-0 text-brand-blue transition-[rotate] duration-200 ease-out group-open:rotate-45"
            />
          </summary>
          <p className="faq-answer pb-5 text-[15px] leading-relaxed text-gray-600 text-pretty">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
