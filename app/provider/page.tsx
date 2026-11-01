import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProviderLandingPage from "@/components/ProviderLandingPage";

export const metadata: Metadata = {
  title: "Become a pro",
  description: "Get matched with verified customers near you. Payment is secured in escrow before you start.",
  openGraph: {
    type: "website",
    siteName: "QwikHelp",
    title: "Become a pro | QwikHelp",
    description: "Get matched with verified customers near you. Payment is secured in escrow before you start.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a pro | QwikHelp",
    description: "Get matched with verified customers near you. Payment is secured in escrow before you start.",
  },
};

export default function ProviderPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Navbar variant="provider" />
      <ProviderLandingPage />
      <Footer />
    </div>
  );
}
