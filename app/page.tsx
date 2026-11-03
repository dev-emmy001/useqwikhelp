import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/landing/WaitlistForm";
import Illustration from "@/components/landing/Illustration";
import LandingFaq from "@/components/landing/LandingFaq";
import Reveal from "@/components/landing/Reveal";

/* ── Content ──────────────────────────────────────────────────────── */

const services = [
  { title: "Cooks", text: "Daily meals, meal prep or a party.", art: "/assets/images/service-cook.svg" },
  { title: "Cleaners", text: "Regular, deep or move-out cleans.", art: "/assets/images/service-cleaner.svg" },
  { title: "Plumbers", text: "Leaks, blocked drains, new fittings.", art: "/assets/images/service-plumber.svg" },
  { title: "Electricians", text: "Wiring, sockets and inverters.", art: "/assets/images/service-electrician.svg" },
  { title: "AC & appliances", text: "Servicing, gas top-ups and repairs.", art: "/assets/images/service-ac.svg" },
  { title: "Carpenters", text: "Furniture, doors and fittings.", art: "/assets/images/service-carpenter.svg" },
];

const steps = [
  {
    title: "Find a pro near you",
    text: "Pick a service and see verified pros in your area.",
    art: { src: "/assets/images/step-find-nearby-pro.svg", width: 1600, height: 1200 },
  },
  {
    title: "Book and pay safely",
    text: "Choose a time. Your payment waits in escrow.",
    art: { src: "/assets/images/step-book-pay-escrow.svg", width: 1600, height: 1200 },
  },
  {
    title: "Approve, then they get paid",
    text: "Happy with the work? Release payment in one tap.",
    art: { src: "/assets/images/step-approve-release-payment.svg", width: 1600, height: 1200 },
  },
];

const promises = [
  {
    title: "Every pro is verified",
    text: "ID, face match, skills check and a guarantor, before their first job.",
    art: { src: "/assets/images/trust-verified-identity.svg", width: 1200, height: 1200 },
  },
  {
    title: "Your money is protected",
    text: "Pros are never paid upfront. Payment is released only when you approve.",
    art: { src: "/assets/images/trust-escrow-protection.svg", width: 1200, height: 1200 },
  },
  {
    title: "We've got your back",
    text: "If a job goes wrong, we send someone to fix it or refund you.",
    art: { src: "/assets/images/trust-recourse-guarantee.svg", width: 1200, height: 1200 },
  },
];

const proPerks = [
  { title: "Jobs near you", text: "No more chasing referrals." },
  { title: "Guaranteed pay", text: "Every completed job pays out." },
  { title: "A verified profile", text: "Reviews that grow your business." },
];

/* ── Shared styles ────────────────────────────────────────────────── */

const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";
const sectionY = "py-20 lg:py-28";
const h2 = "text-3xl font-extrabold leading-[1.1] text-gray-950 text-balance sm:text-4xl lg:text-5xl";
const lead = "text-lg leading-relaxed text-gray-600 text-pretty";
const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/* ── Page ─────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO ─ the one orchestrated entrance on the page */}
        <section className={`${container} grid items-center gap-12 pt-28 pb-20 md:pt-36 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28`}>
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1
              style={i(1)}
              className="enter-once mt-6 text-[40px] font-extrabold leading-[1.05] text-gray-950 text-balance sm:text-6xl lg:text-7xl"
            >
              Based on our calculations, you need QwikHelp!
            </h1>

            <p style={i(2)} className={`enter-once mt-6 max-w-lg ${lead} sm:text-xl`}>
              Book verified cooks, cleaners and fixers near you. Your money is held safely until the job is done.
            </p>

            <div style={i(3)} className="enter-once mt-8 flex w-full flex-col items-center lg:items-start">
              <WaitlistForm source="home-hero" />
              <p className="mt-3 text-xs text-gray-300">Free to join. We&apos;ll email you when we launch in your city.</p>
            </div>
          </div>

          <Reveal>
            <div style={i(4)} className="enter-once enter-soft">
              <Illustration
                src="/assets/images/hero-pro-arriving-with-phone.svg"
                photo
                label="Illustration of a QwikHelp pro at a front door, showing a confirmed booking on his phone"
                tone="blue"
                className="aspect-square sm:aspect-[5/4] lg:aspect-square"
              />
            </div>
          </Reveal>
        </section>

        {/* 2. THE PROBLEM / WHAT QWIKHELP IS */}
        <section id="about" aria-labelledby="about-title" className="">
          <Reveal className={`${container} ${sectionY} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
            <Illustration
              src="/assets/images/about-cautious-homeowner.svg"
              photo
              label="Illustration of a woman looking unsure at a message asking for money upfront"
              tone="white"
              className="reveal-item aspect-[4/3]"
            />
            <div>
              <h2 id="about-title" style={i(1)} className={`reveal-item ${h2}`}>
                Finding good help shouldn&apos;t feel like a gamble.
              </h2>
              <p style={i(2)} className={`reveal-item mt-6 max-w-xl ${lead}`}>
                Right now it&apos;s referrals, cash upfront and hope. QwikHelp checks every pro, holds your payment, and
                steps in if anything goes wrong.
              </p>
            </div>
          </Reveal>
        </section>

        {/* 3. SERVICES */}
        <section id="services" aria-labelledby="services-title" className={`${container} ${sectionY} scroll-mt-20`}>
          <Reveal>
            <h2 id="services-title" className={`reveal-item max-w-2xl ${h2}`}>
              Help for every corner of your home.
            </h2>
          </Reveal>

          <Reveal as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, n) => (
              <li key={s.title} style={i(n % 3)} className="reveal-item group rounded-[32px] bg-gray-50 p-3">
                <div className="transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-1">
                  <Illustration src={s.art} photo label={s.title} decorative tone="white" className="aspect-[4/3]" />
                </div>
                <div className="px-4 pt-5 pb-4">
                  <h3 className="text-xl font-bold text-gray-950">{s.title}</h3>
                  <p className="mt-1 text-[15px] text-gray-600 text-pretty">{s.text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </section>

        {/* 4. HOW IT WORKS */}
        <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20">
          <div className={`${container} ${sectionY}`}>
            <Reveal>
              <h2 id="how-title" className={`reveal-item ${h2}`}>
                How it works
              </h2>
            </Reveal>

            <Reveal as="ol" className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
              {steps.map((step, n) => (
                <li key={step.title} style={i(n)} className="reveal-item">
                  <Illustration {...step.art} label={step.title} decorative tone="blue" float className="aspect-[4/3]" />
                  <p className="mt-6 text-sm font-bold text-brand-blue">Step {n + 1}</p>
                  <h3 className="mt-1 text-2xl font-bold text-gray-950 text-balance">{step.title}</h3>
                  <p className="mt-2 text-[15px] text-gray-600 text-pretty">{step.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* 5. TRUST */}
        <section aria-labelledby="trust-title" className={`${container} ${sectionY}`}>
          <Reveal>
            <h2 id="trust-title" className={`reveal-item max-w-2xl ${h2}`}>
              Built on trust, not hope.
            </h2>
          </Reveal>

          <Reveal className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
            {promises.map((p, n) => (
              <div key={p.title} style={i(n)} className="reveal-item">
                <Illustration {...p.art} label={p.title} decorative tone="blue" float className="aspect-square" />
                <h3 className="mt-6 text-2xl font-bold text-gray-950 text-balance">{p.title}</h3>
                <p className="mt-2 text-[15px] text-gray-600 text-pretty">{p.text}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* 6. FOR PROS */}
        {/* <section aria-labelledby="pros-title" className="px-3 sm:px-5 lg:px-8">
          <Reveal className="mx-auto grid w-full max-w-[1440px] items-center gap-12 rounded-[40px] bg-brand-blue px-6 py-14 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:rounded-[56px] lg:px-16 lg:py-20">
            <div>
              <h2
                id="pros-title"
                className="reveal-item text-3xl font-extrabold leading-[1.1] text-white text-balance sm:text-4xl lg:text-5xl"
              >
                Good at what you do? Get paid for it, every time.
              </h2>

              <ul className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {proPerks.map((perk, n) => (
                  <li key={perk.title} style={i(n + 1)} className="reveal-item">
                    <p className="text-lg font-bold text-white">{perk.title}</p>
                    <p className="mt-1 text-[15px] text-white">{perk.text}</p>
                  </li>
                ))}
              </ul>

              <Link
                href="/provider"
                style={i(4)}
                className="reveal-item mt-10 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-[15px] font-semibold text-gray-950 transition-[background-color,scale] duration-150 ease-out hover:bg-brand-blue-light motion-safe:active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Join as a Pro
              </Link>
            </div>

            <Illustration
              src="/illustrations/users.svg"
              width={334}
              height={367}
              label="QwikHelp pros"
              decorative
              tone="white"
              float
              className="reveal-item aspect-[4/3] lg:aspect-square"
            />
          </Reveal>
        </section> */}

        {/* 7. FAQ */}
        <section id="faq" aria-labelledby="faq-title" className={`${container} ${sectionY} scroll-mt-20`}>
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <h2 id="faq-title" className={`reveal-item ${h2}`}>
              Questions, answered.
            </h2>
            <LandingFaq />
          </Reveal>
        </section>

        {/* 8. FINAL WAITLIST CTA */}
        {/* <section id="waitlist" aria-labelledby="waitlist-title" className="scroll-mt-24 px-3 pb-8 sm:px-5 lg:px-8">
          <Reveal className="mx-auto grid w-full max-w-[1440px] items-center gap-10 rounded-[40px] bg-brand-blue-light px-6 py-14 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:rounded-[56px] lg:px-16 lg:py-20">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2
                id="waitlist-title"
                className="reveal-item text-4xl font-extrabold leading-[1.05] text-gray-950 text-balance sm:text-5xl lg:text-6xl"
              >
                Be first in line.
              </h2>
              <p style={i(1)} className={`reveal-item mt-4 ${lead}`}>
                Get early access when QwikHelp launches in your city. Coming to iOS and Android.
              </p>
              <div style={i(2)} className="reveal-item mt-8 w-full">
                <WaitlistForm className="mx-auto lg:mx-0" source="home-final-cta" />
              </div>
            </div>

            <Illustration
              label="Illustration: phone with the QwikHelp app, confetti"
              tone="white"
              float
              className="reveal-item aspect-[4/3]"
            />
          </Reveal>
        </section> */}
        {/* Scroll-fade overlay — sticky so it stops before the footer */}
        <div
          aria-hidden="true"
          style={{
            position: "sticky",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            marginTop: "-120px",
            pointerEvents: "none",
            zIndex: 40,
            background:
              "linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.15) 70%, transparent 100%)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            maskImage: "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
