import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact QwikHelp",
  description: "Questions, feedback or partnerships? Email the QwikHelp team.",
};

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Navbar />
      <ContactPage />
      <Footer />
    </div>
  );
}
