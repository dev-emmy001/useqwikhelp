"use client";

import { useActionState, useId } from "react";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";

interface WaitlistFormProps {
  className?: string;
  /** `onBlue` for use on the solid brand-blue band. */
  tone?: "default" | "onBlue";
  /** Saved with the signup so customers and pros can be told apart in the sheet. */
  role?: "customer" | "provider";
  /** Where on the site the signup happened, e.g. "home-hero". */
  source?: string;
}

const initialState: WaitlistState = { status: "idle" };

export default function WaitlistForm({
  className = "",
  tone = "default",
  role = "customer",
  source = "",
}: WaitlistFormProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);
  const onBlue = tone === "onBlue";
  const hasError = state.status === "error";

  if (state.status === "success") {
    return (
      <p
        role="status"
        className={`enter-once inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-[15px] font-semibold ${
          onBlue ? "bg-white text-gray-950" : "bg-emerald-50 text-emerald-800"
        } ${className}`}
      >
        <CheckCircleIcon size={20} weight="fill" aria-hidden="true" className={onBlue ? "text-emerald-600" : ""} />
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className={`w-full max-w-md ${className}`}>
      <div className="flex w-full flex-col gap-2.5 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={`min-h-12 w-full flex-1 rounded-full px-5 text-base text-gray-950 placeholder:text-gray-500 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
            onBlue ? "bg-white focus-visible:outline-white" : "bg-gray-100 focus-visible:outline-brand-blue"
          }`}
        />
        <input type="hidden" name="role" value={role} />
        <input type="hidden" name="source" value={source} />
        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={pending}
          className={`inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full px-6 text-[15px] font-semibold text-white transition-[background-color,scale] duration-150 ease-out enabled:motion-safe:active:scale-[0.96] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 [-webkit-tap-highlight-color:transparent] ${
            onBlue
              ? "bg-gray-950 hover:bg-gray-800 focus-visible:outline-white"
              : "bg-brand-blue hover:bg-brand-blue-hover focus-visible:outline-brand-blue"
          }`}
        >
          {pending ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {hasError && (
        <p
          id={errorId}
          role="alert"
          className={`mt-2 px-5 text-sm font-medium ${onBlue ? "text-white" : "text-red-700"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
