import { CreditCard, Repeat, Wallet, ShieldCheck } from "lucide-react";

const features = [
  { icon: Wallet, title: "A wallet for digital dollars", description: "Bring your USDC and USDT balances into one simple place, with a clear view of your funds." },
  { icon: CreditCard, title: "A path to global payments", description: "LumaPay is designed to connect stablecoin funding with the online services you use every day." },
  { icon: Repeat, title: "Subscription-focused", description: "Keep your recurring digital payments and subscription activity easier to understand and manage." },
  { icon: ShieldCheck, title: "Built with care", description: "Authentication, transaction records and a security-minded architecture are part of the foundation." },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#a99cff]">THE LUMAPAY DIFFERENCE</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">Your digital dollars, <span className="gradient-heading">working smarter.</span></h2>
        <p className="mt-5 text-base leading-8 text-white/50">A more straightforward way to think about funding, managing and paying for the services that power your digital life.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="glass-panel group rounded-[28px] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#9a8cff]/35 hover:bg-white/[0.07]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#9a8cff]/20 bg-[#7566ff]/10 text-[#bdb2ff] transition group-hover:bg-[#7566ff]/20">
                <Icon size={26} />
              </div>
              <p className="mt-8 text-xs font-semibold tracking-[.18em] text-[#9f92ff]">0{index + 1}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{feature.title}</h3>
              <p className="mt-4 max-w-lg leading-7 text-white/48">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}