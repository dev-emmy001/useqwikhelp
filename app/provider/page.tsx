import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProviderLandingPage from "@/components/ProviderLandingPage";

export const metadata: Metadata = {
  title: "Become a QwikHelp Provider",
  description:
    "Grow your service business with a verified QwikHelp profile, escrow-protected jobs, in-app communication, and wallet withdrawals.",
};

export default function ProviderPage() {
  return (
    <>
      <Navbar variant="provider" />
      <ProviderLandingPage />
      <Footer />
    </>
  );
}
