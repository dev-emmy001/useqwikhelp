"use client";

import { useId, useState } from "react";
import { CheckCircleIcon } from "@phosphor-icons/react";

interface WaitlistFormProps {
  className?: string;
  /** `onBlue` for use on the solid brand-blue band. */
  tone?: "default" | "onBlue";
}

export default function WaitlistForm({ className = "", tone = "default" }: WaitlistFormProps) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const onBlue = tone === "onBlue";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send `email` to the waitlist backend (API route, Supabase, Mailchimp, etc.).
    // Nothing is stored yet — this only shows the confirmation state.
    setJoined(true);
  }

  if (joined) {
    return (
      <p
        role="status"
        className={`enter-once inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-[15px] font-semibold ${
          onBlue ? "bg-white text-gray-950" : "bg-emerald-50 text-emerald-800"
        } ${className}`}
      >
        <CheckCircleIcon size={20} weight="fill" aria-hidden="true" className={onBlue ? "text-emerald-600" : ""} />
        You&apos;re on the list. We&apos;ll email you at launch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex w-full max-w-md flex-col gap-2.5 sm:flex-row ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`min-h-12 w-full flex-1 rounded-full px-5 text-base text-gray-950 placeholder:text-gray-500 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
          onBlue ? "bg-white focus-visible:outline-white" : "bg-gray-100 focus-visible:outline-brand-blue"
        }`}
      />
      <button
        type="submit"
        className={`inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full px-6 text-[15px] font-semibold text-white transition-[background-color,scale] duration-150 ease-out motion-safe:active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 [-webkit-tap-highlight-color:transparent] ${
          onBlue
            ? "bg-gray-950 hover:bg-gray-800 focus-visible:outline-white"
            : "bg-brand-blue hover:bg-brand-blue-hover focus-visible:outline-brand-blue"
        }`}
      >
        Join the waitlist
      </button>
    </form>
  );
}
