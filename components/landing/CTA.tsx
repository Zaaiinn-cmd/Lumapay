import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="mx-auto mt-32 mb-32 max-w-7xl px-6 lg:px-8">
      <div
        className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-emerald-500/20
          bg-gradient-to-br
          from-emerald-500/15
          via-black
          to-emerald-500/10
          px-8
          py-20
          text-center
        "
      >
        {/* Glow */}
        <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
            START TODAY
          </p>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Pay for global subscriptions with stablecoins.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Fund your wallet, generate a virtual USD card and manage your
            recurring payments from one beautiful dashboard.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-emerald-500
                px-8
                py-4
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-105
                hover:bg-emerald-400
              "
            >
              Launch Dashboard
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/dashboard/deposit"
              className="
                rounded-2xl
                border
                border-white/10
                px-8
                py-4
                font-medium
                transition
                hover:border-white/30
                hover:bg-white/5
              "
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}