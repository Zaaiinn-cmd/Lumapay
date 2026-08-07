import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import SupportedServices from "@/components/landing/SupportedServices";
import HowItWorks from "@/components/landing/HowItWorks";
import Security from "@/components/landing/Security";
import CTA from "@/components/landing/CTA";
import FAQ from "@/components/landing/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-white">

      <Navbar />

      <Hero />

      <Stats />

      <Features />

      <SupportedServices />

      <HowItWorks />

      <Security />

      <CTA />

      <FAQ />

      

    </main>
  );
}