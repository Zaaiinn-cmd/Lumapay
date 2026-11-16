import { Coins, Wallet, Globe2, Zap } from "lucide-react";

const items = [
  { icon: Coins, value: "USDC + USDT", label: "Stablecoin choice", description: "Support for both digital dollars" },
  { icon: Wallet, value: "One wallet", label: "A simpler experience", description: "Bring your payment activity together" },
  { icon: Globe2, value: "Global", label: "Internet-first", description: "Designed around online services" },
  { icon: Zap, value: "Solana", label: "Built for speed", description: "Low-cost blockchain infrastructure" },
];

export default function Stats() {
  return (
    <section className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
      <div className="glass-panel grid overflow-hidden rounded-[28px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`p-6 sm:p-7 ${index > 0 ? "border-t border-white/[0.08] sm:border-l sm:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}>
              <div className="flex items-center gap-3 text-[#bdb2ff]">
                <Icon size={19} />
                <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/40">{item.label}</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">{item.value}</h3>
              <p className="mt-2 text-sm text-white/40">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}