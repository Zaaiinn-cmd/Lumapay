import { Wallet, Coins, CreditCard, ChartNoAxesCombined } from "lucide-react";

const steps = [
  { number: "01", title: "Fund your wallet", description: "Start with supported USDC or USDT on Solana.", icon: Wallet },
  { number: "02", title: "Keep your funds together", description: "See your stablecoin wallet activity in one place.", icon: Coins },
  { number: "03", title: "Pay online", description: "Use the payment options available as LumaPay integrations roll out.", icon: CreditCard },
  { number: "04", title: "Stay in control", description: "Follow your activity and understand where your money goes.", icon: ChartNoAxesCombined },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#a99cff]">HOW IT WORKS</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">A simpler way to <span className="gradient-heading">move through payments.</span></h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/50">The experience is designed to make stablecoin-powered online payments feel less complicated.</p>
      </div>
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.number} className="glass-panel relative rounded-[26px] p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[.2em] text-[#a99cff]">{step.number}</span>
                <Icon size={22} className="text-[#bdb2ff]" />
              </div>
              <h3 className="mt-12 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/45">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}