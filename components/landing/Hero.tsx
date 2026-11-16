import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import FloatingCard from "./FloatingCard";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[42%] top-[-180px] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#5142e8]/25 blur-[150px]" />
        <div className="absolute right-[-130px] top-[180px] h-[420px] w-[420px] rounded-full bg-[#a18aff]/10 blur-[130px]" />
        <div className="absolute bottom-[-180px] left-[-100px] h-[360px] w-[360px] rounded-full bg-[#5142e8]/10 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-28 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-36 lg:pt-28">
        <div className="relative z-10">
          <div className="glass-panel inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-[#d8d1ff] sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#9d8fff] shadow-[0_0_12px_#8b7cff]" />
            <Sparkles size={14} className="text-[#bdb2ff]" />
            Stablecoin-powered payments
          </div>

          <h1 className="mt-8 max-w-3xl text-[clamp(3.25rem,7vw,6.4rem)] font-semibold leading-[.98] tracking-[-.065em]">
            <span className="block text-white">Subscriptions,</span>
            <span className="gradient-heading block pb-2">without borders.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-white/55 sm:text-lg">
            Your stablecoins, one simple way to pay for the global internet. LumaPay brings your digital dollar wallet and online subscriptions closer together.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/sign-up" className="violet-glow inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7668ff] to-[#5b4cf0] px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110">
              Get started <ArrowUpRight size={18} />
            </Link>
            <Link href="/dashboard" className="glass-panel inline-flex items-center justify-center rounded-full px-7 py-4 font-medium text-white/85 transition hover:border-[#988bff]/40 hover:bg-white/[0.08]">
              Explore dashboard
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium tracking-wide text-white/35">
            <span>USDC</span><span className="h-1 w-1 rounded-full bg-[#7668ff]" />
            <span>USDT</span><span className="h-1 w-1 rounded-full bg-[#7668ff]" />
            <span>BUILT ON SOLANA</span>
          </div>
        </div>

        <div className="relative flex min-w-0 justify-center lg:justify-end">
          <div className="pointer-events-none absolute inset-8 rounded-full bg-[#6557ff]/20 blur-[100px]" />
          <div className="relative w-full max-w-[520px] animate-float">
            <FloatingCard />
          </div>
        </div>
      </div>
    </section>
  );
}