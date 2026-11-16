import { Sparkles, Music2, Film, Code2, Cloud, MessageCircle, PenTool, Globe } from "lucide-react";

const services = [
  { name: "ChatGPT", icon: Sparkles }, { name: "Spotify", icon: Music2 },
  { name: "Netflix", icon: Film }, { name: "GitHub", icon: Code2 },
  { name: "AWS", icon: Cloud }, { name: "Discord", icon: MessageCircle },
  { name: "Figma", icon: PenTool }, { name: "And more", icon: Globe },
];

export default function SupportedServices() {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#a99cff]">MADE FOR YOUR DIGITAL LIFE</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">The services you love. <span className="gradient-heading">One payment hub.</span></h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/50">From creative tools to entertainment and developer platforms, LumaPay is built around the global internet.</p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.name} className="glass-panel flex min-h-32 flex-col items-center justify-center gap-4 rounded-3xl px-3 py-7 transition duration-300 hover:-translate-y-1 hover:border-[#9a8cff]/40 hover:bg-white/[0.07]">
              <Icon size={28} className="text-[#bdb2ff]" />
              <span className="text-sm font-medium text-white/80">{service.name}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-center text-xs text-white/30">Service availability and payment support depend on launch integrations.</p>
    </section>
  );
}