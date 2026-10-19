"use client";

import Image from "next/image";
import { ImageSquareIcon, SparkleIcon } from "@phosphor-icons/react";

interface IllustrationSlotProps {
  label?: string;
  hint?: string;
  imageSrc?: string;
  imageAlt?: string;
  aspect?: string;
  className?: string;
  variant?: "light" | "blue" | "white";
  objectFit?: "contain" | "cover";
  children?: React.ReactNode;
}

export default function IllustrationSlot({
  label = "Illustration",
  hint = "Drop illustration / SVG here",
  imageSrc,
  imageAlt,
  aspect = "aspect-[4/3]",
  className = "",
  variant = "light",
  objectFit = "contain",
  children,
}: IllustrationSlotProps) {
  // Pre-configured aesthetic variant backgrounds
  const variantStyles = {
    light:
      " text-gray-700",
    white: "bg-white text-gray-700",
    blue: "bg-gradient-to-br from-blue-600 to-brand-blue text-white",
  }[variant];

  // If a real illustration image is provided, render the image cleanly inside the frame
  if (imageSrc && imageSrc.trim() !== "") {
    return (
      <div
        className={`relative w-full ${aspect} overflow-hidden rounded-[28px] sm:rounded-[36px] flex items-center justify-center ${variantStyles} ${className}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt || label}
          fill
          className={`p-2 sm:p-4 ${objectFit === "cover" ? "object-cover p-0" : "object-contain"}`}
          sizes="(max-width: 768px) 100vw, 600px"
        />
        {children}
      </div>
    );
  }


  return (
    <div
      className={`group relative w-full ${aspect} overflow-hidden rounded-[28px] sm:rounded-[36px] ${variantStyles} flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-300 hover:scale-[1.01] ${className}`}
    >
      {/* Decorative concentric background watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" className="size-[120%] text-blue-200/50" fill="none">
          <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="110" stroke="currentColor" strokeWidth="2" />
          <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Ambient soft glow */}
      <div
        className="pointer-events-none absolute size-48 rounded-full bg-blue-200/30 blur-2xl"
        aria-hidden="true"
      />

      {/* Central Illustration Placeholder Badge & Label */}
      <div className="relative z-10 flex flex-col items-center gap-2 max-w-xs px-4">
        <div
          className={`flex size-14 items-center justify-center rounded-2xl ${variant === "blue"
              ? "bg-white/20 text-white"
              : "bg-blue-50 text-brand-blue"
            } transition-transform duration-200 group-hover:scale-110`}
        >
          <ImageSquareIcon size={28} weight="fill" aria-hidden="true" />
        </div>

        <div className="mt-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue">
            <SparkleIcon size={13} weight="fill" />
            <span>Illustration Slot</span>
          </div>
          <p
            className={`text-sm sm:text-[15px] font-bold font-sans mt-0.5 ${variant === "blue" ? "text-white" : "text-gray-900"
              }`}
          >
            {label}
          </p>
          <p
            className={`text-xs mt-1 ${variant === "blue" ? "text-blue-100/70" : "text-gray-400"
              }`}
          >
            {hint}
          </p>
        </div>
      </div>

      {/* Any overlaid floating badges */}
      {children}
    </div>
  );
}
