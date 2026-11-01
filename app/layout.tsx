import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";

// Variable font (weights 1–1000), so font-extrabold/font-black render true weights.
// Next has no fallback metrics for Google Sans, so skip auto-adjust and list system fallbacks.
const googleSans = Google_Sans_Flex({
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const description =
  "Book verified cooks, cleaners, plumbers and electricians near you. Your money is held safely until the job is done.";

// Absolute base for OG/Twitter image URLs. Set NEXT_PUBLIC_SITE_URL to the live domain
// (on Vercel, Next falls back to the production URL automatically when this is unset).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "QwikHelp | Verified home help near you",
    template: "%s | QwikHelp",
  },
  description,
  applicationName: "QwikHelp",
  authors: [{ name: "TeamCobuild" }],
  creator: "TeamCobuild",
  publisher: "TeamCobuild",
  openGraph: {
    type: "website",
    siteName: "QwikHelp",
    title: "QwikHelp | Verified home help near you",
    description,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "QwikHelp | Verified home help near you",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${googleSans.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white tracking-tighter text-gray-900 selection:bg-blue-100 selection:text-blue-900"
      >
        {children}
      </body>
    </html>
  );
}
