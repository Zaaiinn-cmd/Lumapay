import {
  Wallet,
  CreditCard,
  Repeat,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Fund your wallet",
    description:
      "Deposit USDC or USDT on Solana into your personal LumaPay wallet.",
    icon: Wallet,
  },
  {
    number: "02",
    title: "Generate a virtual card",
    description:
      "Create a secure USD virtual card linked directly to your stablecoin balance.",
    icon: CreditCard,
  },
  {
    number: "03",
    title: "Pay subscriptions",
    description:
      "Use your virtual card to pay supported online services from one place.",
    icon: Repeat,
  },
  {
    number: "04",
    title: "Track everything",
    description:
      "Monitor transactions, subscriptions and spending analytics in real time.",
    icon: BarChart3,
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">

      <div className="text-center">

        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
          HOW IT WORKS
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          Four simple steps
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
          From stablecoins to seamless global payments.
        </p>

      </div>

      <div className="relative mt-20 grid gap-8 lg:grid-cols-4">

        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="
                relative
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-emerald-500/40
              "
            >
              <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-black">
                {step.number}
              </div>

              <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <Icon size={32} />
              </div>

              <h3 className="mt-8 text-2xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {step.description}
              </p>
            </div>
          );
        })}

      </div>

    </section>
  );
}