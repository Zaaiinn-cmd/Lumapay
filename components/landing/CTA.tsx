import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="mx-auto mb-32 mt-32 max-w-7xl px-6 lg:px-8">
      <div className="glass-panel relative isolate overflow-hidden rounded-[36px] px-7 py-20 text-center sm:px-12">
        <div className="absolute -left-20 -top-36 -z-10 h-80 w-80 rounded-full bg-[#6557ff]/25 blur-[100px]" />
        <div className="absolute -bottom-40 -right-20 -z-10 h-80 w-80 rounded-full bg-[#a18aff]/15 blur-[100px]" />
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#a99cff]/25 bg-[#7566ff]/15 text-[#c8c0ff]">
          <Sparkles size={22} />
        </div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[.3em] text-[#b5aaff]">YOUR NEXT PAYMENT EXPERIENCE</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-.05em] text-white sm:text-6xl">Make the global internet feel <span className="gradient-heading">closer.</span></h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/50">Explore a simpler approach to stablecoin-powered payments and subscription management.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/sign-up" className="violet-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7668ff] to-[#5b4cf0] px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110">Get started <ArrowUpRight size={18} /></Link>
          <Link href="/dashboard" className="glass-panel rounded-full px-7 py-4 font-medium text-white/85 transition hover:bg-white/[0.08]">Explore LumaPay</Link>
        </div>
      </div>
    </section>
  );
}