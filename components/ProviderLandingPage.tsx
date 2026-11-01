import Image from "next/image";
import Link from "next/link";
import Illustration from "@/components/landing/Illustration";
import LandingFaq, { type FaqItem } from "@/components/landing/LandingFaq";
import Reveal from "@/components/landing/Reveal";
import WaitlistForm from "@/components/landing/WaitlistForm";

/* ── Content ──────────────────────────────────────────────────────── */

const steps = [
  {
    title: "Get verified",
    text: "Submit your NIN or BVN, photo ID and a guarantor.",
    art: { src: "/assets/images/provider-step-get-verified.png", width: 1200, height: 1200 },
  },
  {
    title: "Go live",
    text: "We review your details and your profile goes live.",
    art: { src: "/assets/images/provider-step-go-live.png", width: 1200, height: 1200 },
  },
  {
    title: "Meet nearby clients",
    text: "Households near you find and book you directly.",
    art: { src: "/assets/images/provider-step-meet-clients.png", width: 1200, height: 1200 },
  },
  {
    title: "Do the work, get paid",
    text: "Payment is released to your wallet when the job is done.",
    art: { src: "/assets/images/provider-step-get-paid.png", width: 1200, height: 1200 },
  },
];

const ranking = [
  { title: "Customer ratings", text: "Shaped by real feedback on your work." },
  { title: "Jobs completed", text: "A visible record of what you deliver." },
  { title: "Response time", text: "How quickly you reply to requests." },
];

const crafts = [
  { label: "Cooking", art: "Illustration: cook" },
  { label: "Cleaning", art: "Illustration: cleaner" },
  { label: "Plumbing", art: "Illustration: plumber" },
  { label: "Electrical", art: "Illustration: electrician" },
  { label: "AC servicing", art: "Illustration: AC technician" },
  { label: "Carpentry", art: "Illustration: carpenter" },
];

const requirements = ["NIN or BVN", "Valid photo ID", "Face verification", "A guarantor"];

const providerFaqs: FaqItem[] = [
  {
    q: "What do I need to sign up?",
    a: "An NIN or BVN, a valid photo ID, a quick face check and a guarantor. We review every account before it goes live.",
  },
  {
    q: "When should I start a job?",
    a: "Only after the app shows the customer's payment is secured in escrow.",
  },
  {
    q: "How do I get paid?",
    a: "Once you and the customer confirm the job is done, the money lands in your wallet. Withdraw to any Nigerian bank account.",
  },
  {
    q: "Can I pay to rank higher?",
    a: "No. Your position is earned through ratings, completed jobs and response time.",
  },
  {
    q: "Do I have to share my phone number?",
    a: "No. Chat, voice notes and calls all happen inside the app.",
  },
];

/* ── Shared styles ────────────────────────────────────────────────── */

const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";
const sectionY = "py-20 lg:py-28";
const h2 = "text-3xl font-extrabold leading-[1.1] text-gray-950 text-balance sm:text-4xl lg:text-5xl";
const lead = "text-lg leading-relaxed text-gray-600 text-pretty";
const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/* ── Page ─────────────────────────────────────────────────────────── */

export default function ProviderLandingPage() {
  return (
    <main className="flex-1 bg-white">
      {/* 1. HERO */}
      <section id="provider" aria-labelledby="provider-title" className={`${container} pt-28 pb-20 md:pt-36 lg:pb-28`}>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1
            id="provider-title"
            style={i(0)}
            className="enter-once text-[40px] font-extrabold leading-[1.05] text-gray-950 text-balance sm:text-6xl lg:text-7xl"
          >
            Good work deserves to be seen.
          </h1>

          <p style={i(1)} className={`enter-once mt-6 max-w-xl ${lead} sm:text-xl`}>
            Get matched with verified customers near you. Payment is secured in escrow before you start.
          </p>

          <div
            style={i(2)}
            className="enter-once mt-8 flex w-full flex-col items-center justify-center gap-2.5 sm:w-auto sm:flex-row"
          >
            <Link
              href="#getting-started"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-blue px-7 text-[15px] font-semibold text-white transition-[background-color,scale] duration-150 ease-out hover:bg-brand-blue-hover motion-safe:active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:w-auto [-webkit-tap-highlight-color:transparent]"
            >
              Join as a provider
            </Link>
            <Link
              href="#provider-journey"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gray-100 px-7 text-[15px] font-semibold text-gray-800 transition-[background-color,scale] duration-150 ease-out hover:bg-gray-200 motion-safe:active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:w-auto [-webkit-tap-highlight-color:transparent]"
            >
              See how it works
            </Link>
          </div>

          <ul style={i(3)} className="enter-once mt-8 flex flex-wrap items-center justify-center gap-2">
            {["Verified profile", "Escrow-protected jobs", "Payouts to your bank"].map((item) => (
              <li key={item} className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Flat stage; the cut-out photo sits flush on the bottom edge */}
        <div
          style={i(4)}
          className="enter-once enter-soft mx-auto mt-12 w-full max-w-[1100px] overflow-hidden rounded-[32px] bg-brand-blue-light px-4 pt-10 sm:mt-16 sm:rounded-[48px] sm:px-10 sm:pt-16"
        >
          <div className="relative mx-auto w-full max-w-[900px]">
            <Image
              src="/hero-workers.png"
              alt="QwikHelp pros: a chef, an electrician, a plumber holding a phone, and a carpenter"
              width={1672}
              height={941}
              priority
              sizes="(max-width: 640px) 92vw, (max-width: 1200px) 80vw, 900px"
              className="block h-auto w-full select-none"
            />
            {/* Fills the plumber's blank phone screen (positioned in % of the image box) */}
            <div
              aria-hidden="true"
              className="absolute top-[34.5%] left-[47.8%] flex h-[18.4%] w-[4.6%] items-center justify-center rounded-[22%/10%] bg-brand-blue"
            >
              <svg viewBox="0 0 24 24" className="w-1/2 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY */}
      <section aria-labelledby="why-title" className="bg-gray-50">
        <Reveal className={`${container} ${sectionY} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <h2 id="why-title" className={`reveal-item ${h2}`}>
              Less chasing work. More doing what you do best.
            </h2>
            <p style={i(1)} className={`reveal-item mt-6 max-w-lg ${lead}`}>
              QwikHelp puts your verified skills in front of nearby households looking for help right now.
            </p>
          </div>
          <Illustration
            src="/assets/images/provider-nearby-matching.png"
            width={1600}
            height={1200}
            label="Pros matched to nearby homes"
            decorative
            tone="white"
            float
            className="reveal-item aspect-[4/3]"
          />
        </Reveal>
      </section>

      {/* 3. JOURNEY */}
      <section id="provider-journey" aria-labelledby="journey-title" className={`${container} ${sectionY}`}>
        <Reveal>
          <h2 id="journey-title" className={`reveal-item ${h2}`}>
            From profile to payday.
          </h2>
        </Reveal>

        <Reveal as="ol" className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {steps.map((step, n) => (
            <li key={step.title} style={i(n)} className="reveal-item">
              <Illustration {...step.art} label={step.title} decorative tone="blue" float className="aspect-square" />
              <p className="mt-6 text-sm font-bold text-brand-blue">Step {n + 1}</p>
              <h3 className="mt-1 text-xl font-bold text-gray-950 text-balance">{step.title}</h3>
              <p className="mt-2 text-[15px] text-gray-600 text-pretty">{step.text}</p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* 4. ESCROW */}
      <section aria-labelledby="escrow-title" className="bg-gray-50">
        <Reveal className={`${container} ${sectionY} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
          <Illustration
            src="/assets/images/provider-escrow-before-start.png"
            width={1600}
            height={1200}
            label="Payment held in escrow"
            decorative
            tone="white"
            float
            className="reveal-item aspect-[4/3] lg:order-2"
          />
          <div>
            <h2 id="escrow-title" style={i(1)} className={`reveal-item ${h2}`}>
              No more starting a job on a promise.
            </h2>
            <p style={i(2)} className={`reveal-item mt-6 max-w-lg ${lead}`}>
              Customers pay into escrow before you start. You&apos;re paid as soon as you both confirm the job is done.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 5. RANKING */}
      <section aria-labelledby="ranking-title" className={`${container} ${sectionY}`}>
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 id="ranking-title" className={`reveal-item ${h2}`}>
            Your place is earned, never bought.
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {ranking.map((r, n) => (
              <li key={r.title} style={i(n + 1)} className="reveal-item rounded-3xl bg-gray-50 p-6">
                <h3 className="text-lg font-bold text-gray-950">{r.title}</h3>
                <p className="mt-2 text-[15px] text-gray-600 text-pretty">{r.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* 6. CRAFTS */}
      <section id="services" aria-labelledby="crafts-title" className={`${container} pb-20 lg:pb-28`}>
        <Reveal>
          <h2 id="crafts-title" className={`reveal-item max-w-2xl ${h2}`}>
            Bring your craft to the neighbourhood.
          </h2>
        </Reveal>

        <Reveal as="ul" className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {crafts.map((c, n) => (
            <li key={c.label} style={i(n)} className="reveal-item rounded-[28px] bg-gray-50 p-2.5">
              <Illustration label={c.art} tone="white" className="aspect-square !rounded-[20px] !p-4" />
              <p className="px-2 pt-3 pb-2 text-base font-bold text-gray-950">{c.label}</p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* 7. GETTING STARTED */}
      <section id="getting-started" aria-labelledby="start-title" className="px-3 sm:px-5 lg:px-8">
        <Reveal className="mx-auto grid w-full max-w-[1440px] items-center gap-12 rounded-[40px] bg-brand-blue px-6 py-14 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:rounded-[56px] lg:px-16 lg:py-20">
          <div>
            <h2
              id="start-title"
              className="reveal-item text-3xl font-extrabold leading-[1.1] text-white text-balance sm:text-4xl lg:text-5xl"
            >
              Be among the first verified pros.
            </h2>
            <p style={i(1)} className="reveal-item mt-4 text-lg text-white text-pretty">
              Join the waitlist. Have these ready for your verification:
            </p>
            <ul style={i(2)} className="reveal-item mt-6 flex flex-wrap gap-2">
              {requirements.map((req) => (
                <li key={req} className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                  {req}
                </li>
              ))}
            </ul>
            <div style={i(3)} className="reveal-item mt-8">
              <WaitlistForm tone="onBlue" />
            </div>
          </div>

          <Illustration
            src="/assets/images/provider-verification-checklist.png"
            width={1600}
            height={1200}
            label="ID verification"
            decorative
            tone="blue"
            float
            className="reveal-item aspect-[4/3] lg:aspect-square"
          />
        </Reveal>
      </section>

      {/* 8. FAQ */}
      <section id="faq" aria-labelledby="provider-faq-title" className={`${container} ${sectionY}`}>
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 id="provider-faq-title" className={`reveal-item ${h2} lg:sticky lg:top-32 lg:self-start`}>
            Questions, answered.
          </h2>
          <LandingFaq items={providerFaqs} />
        </Reveal>
      </section>
    </main>
  );
}
