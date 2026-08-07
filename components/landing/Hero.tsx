import Link from "next/link";
import FloatingCard from "./FloatingCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

        <div className="absolute right-0 top-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[140px]" />

      </div>

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          -z-20
          opacity-[0.05]
          [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-20 px-6 py-24 lg:flex-row lg:px-8">

        {/* LEFT */}

        <div className="flex-1">

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">

            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

            Powered by Solana

          </div>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">

            Stablecoin
            <br />

            payments

            <span className="block bg-gradient-to-r from-white via-emerald-300 to-cyan-300 bg-clip-text text-transparent">

              for the modern internet.

            </span>

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">

            Pay for ChatGPT, Netflix, Spotify, Claude,
            GitHub, Google and hundreds of online
            services using USDC and USDT.

            No banks.

            No borders.

            Just stablecoins.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              href="/sign-up"
              className="
                rounded-xl
                bg-white
                px-8
                py-4
                text-center
                font-semibold
                text-black
                transition
                hover:scale-105
              "
            >
              Get Started
            </Link>

            <Link
              href="/dashboard"
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-8
                py-4
                text-center
                transition
                hover:bg-white/10
              "
            >
              View Dashboard
            </Link>

          </div>

          {/* Trust */}

          <div className="mt-12 flex flex-wrap gap-6 text-sm text-gray-500">

            <span>USDC</span>

            <span>USDT</span>

            <span>Virtual Cards</span>

            <span>Subscriptions</span>

            <span>Instant Deposits</span>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex flex-1 justify-center">

          <FloatingCard />

        </div>

      </div>

    </section>
  );
}