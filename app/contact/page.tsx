import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact QwikHelp | Direct Human Support",
  description:
    "Direct communication channels for customer help, provider onboarding, and escrow dispute resolution. Zero forms, instant human answers.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}
