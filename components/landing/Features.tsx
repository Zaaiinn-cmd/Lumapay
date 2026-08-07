import {
  CreditCard,
  Repeat,
  Wallet,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Virtual USD Cards",
    description:
      "Create secure virtual cards funded by USDC and use them for global online payments.",
  },
  {
    icon: Wallet,
    title: "Instant Stablecoin Deposits",
    description:
      "Fund your wallet in seconds with Solana-based USDC and USDT.",
  },
  {
    icon: Repeat,
    title: "Subscription Automation",
    description:
      "Manage recurring payments for supported subscription services from one dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Authentication with Clerk, encrypted backend APIs and modern infrastructure built for reliability.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto mt-28 max-w-7xl px-6 lg:px-8">
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold">
          Why choose LumaPay?
        </h2>

        <p className="mt-4 text-lg text-gray-400">
          Everything you need to pay for global subscriptions using stablecoins.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="
                group
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-white/[0.05]
                to-white/[0.02]
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-emerald-500/40
                hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)]
              "
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 transition duration-300 group-hover:scale-110">
                <Icon size={32} />
              </div>

              <h3 className="mt-8 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}