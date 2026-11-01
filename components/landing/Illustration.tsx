import Image from "next/image";

interface IllustrationProps {
  /** Path in /public. Omit to render a placeholder until the vector art is ready. */
  src?: string;
  /** Alt text for real art; also the brief shown on the placeholder. */
  label: string;
  width?: number;
  height?: number;
  /** Frame sizing, e.g. "aspect-[4/3]". */
  className?: string;
  /** Frame background. */
  tone?: "gray" | "blue" | "white";
  /** Gentle idle float (runs only while on screen, inside <Reveal>). */
  float?: boolean;
  /** Mark as decorative when the adjacent heading already says what it shows. */
  decorative?: boolean;
}

const tones = {
  gray: "bg-gray-50 text-gray-500",
  blue: "bg-brand-blue-light text-brand-blue",
  white: "bg-white text-gray-500",
};

/** Flat frame for vector illustrations, with a labelled placeholder state. */
export default function Illustration({
  src,
  label,
  width = 400,
  height = 400,
  className = "aspect-[4/3]",
  tone = "gray",
  float = false,
  decorative = false,
}: IllustrationProps) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-3xl p-8 ${tones[tone]} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={decorative ? "" : label}
          width={width}
          height={height}
          // Frames are at most ~half the 1440px container on desktop, full width on mobile.
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 600px"
          className={`h-full max-h-full w-auto max-w-full object-contain ${float ? "float-art" : ""}`}
        />
      ) : (
        <p
          className={`max-w-[22ch] text-center text-sm font-medium text-pretty ${float ? "float-art" : ""}`}
          aria-hidden={decorative || undefined}
        >
          {label}
        </p>
      )}
    </div>
  );
}
