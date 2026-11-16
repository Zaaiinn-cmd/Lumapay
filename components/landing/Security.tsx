import { ShieldCheck, Lock, Database, Zap } from "lucide-react";

const securityItems = [
  { icon: ShieldCheck, title: "Account protection", description: "Authentication is handled through Clerk to help protect access to user accounts." },
  { icon: Lock, title: "Secure connections", description: "The platform is built to use secure transport and careful handling of application data." },
  { icon: Database, title: "Traceable records", description: "Wallet and transaction records are structured to support clear account activity." },
  { icon: Zap, title: "Solana infrastructure", description: "The experience is being built around Solana's fast, low-cost transaction network." },
];

export default function Security() {
  return (
    <section id="security" className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#a99cff]">BUILT WITH CARE</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">Trust starts with <span className="gradient-heading">the foundations.</span></h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/50">We are building LumaPay with security and transparency in mind at every layer.</p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {securityItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="glass-panel flex gap-5 rounded-[26px] p-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#9a8cff]/20 bg-[#7566ff]/10 text-[#bdb2ff]">
                <Icon size={23} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/45">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}