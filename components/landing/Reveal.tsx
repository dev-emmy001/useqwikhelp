"use client";

import { createElement, useEffect, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}

/**
 * Scroll-aware wrapper (motion rules live in app/globals.css):
 * - `data-seen`: set once on first view → `.reveal-item` children fade in (staggered by `--i`) and stay.
 * - `data-inview`: toggles with visibility → looping `.float-art` only runs on screen.
 */
export default function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [el]);

  return createElement(
    as,
    {
      ref: setEl,
      className,
      "data-inview": inView ? "" : undefined,
      "data-seen": seen ? "" : undefined,
    },
    children
  );
}
