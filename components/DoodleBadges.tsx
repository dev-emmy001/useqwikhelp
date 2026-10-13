import React from "react";

/**
 * Playful doodle badges matching the exact visual accents in the QwikHelp hero mockup:
 * - Top Left: Orange 4-petal flower
 * - Bottom Left: Blue folded ribbon badge
 * - Top Right: Vibrant green 8-petal daisy
 * - Bottom Right: Golden yellow sunburst / asterisk
 */

export function OrangeFlower({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-doodle-float-1 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 text-accent-orange drop-shadow-xs"
        viewBox="0 0 48 48"
        fill="currentColor"
      >
        {/* 4-petal organic rounded flower */}
        <circle cx="24" cy="14" r="9" />
        <circle cx="24" cy="34" r="9" />
        <circle cx="14" cy="24" r="9" />
        <circle cx="34" cy="24" r="9" />
        <circle cx="24" cy="24" r="7" />
      </svg>
    </div>
  );
}

export function BlueRibbon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-doodle-float-2 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-7 h-7 sm:w-9 sm:h-9 text-brand-blue drop-shadow-xs rotate-[-15deg]"
        viewBox="0 0 40 40"
        fill="currentColor"
      >
        {/* Angled ribbon / folded bookmark badge */}
        <path d="M8 8 L32 14 L24 34 L8 26 Z" />
        <path d="M14 12 L28 16 L22 30 L8 24 Z" opacity="0.85" />
      </svg>
    </div>
  );
}

export function GreenDaisy({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-doodle-float-2 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-9 h-9 sm:w-11 sm:h-11 text-accent-green drop-shadow-xs"
        viewBox="0 0 52 52"
        fill="currentColor"
      >
        {/* 8-petal vibrant daisy star */}
        <g transform="translate(26,26)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <path
              key={angle}
              d="M -4.5 -18 C -4.5 -22, 4.5 -22, 4.5 -18 L 3.5 0 L -3.5 0 Z"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="7" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}

export function YellowSunburst({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-doodle-pulse select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 text-accent-yellow drop-shadow-xs"
        viewBox="0 0 48 48"
        fill="currentColor"
      >
        {/* 8-point rounded asterisk with central negative circle */}
        <g transform="translate(24,24)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="-3"
              y="-18"
              width="6"
              height="11"
              rx="3"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="9" />
          <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
