import {
  Sparkles,
  Music2,
  Film,
  Code2,
  Cloud,
  MessageCircle,
  PenTool,
  Globe,
} from "lucide-react";

const services = [
  {
    name: "ChatGPT",
    icon: Sparkles,
  },
  {
    name: "Spotify",
    icon: Music2,
  },
  {
    name: "Netflix",
    icon: Film,
  },
  {
    name: "GitHub",
    icon: Code2,
  },
  {
    name: "AWS",
    icon: Cloud,
  },
  {
    name: "Discord",
    icon: MessageCircle,
  },
  {
    name: "Figma",
    icon: PenTool,
  },
  {
    name: "More",
    icon: Globe,
  },
];

export default function Services() {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">

      <div className="text-center">

        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
          BUILT FOR THE INTERNET
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          Use LumaPay for your favorite online services
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
          Manage payments for digital services from one secure stablecoin wallet.
        </p>

      </div>

      <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-4">

        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.name}
              className="
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                py-10
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-emerald-500/40
                hover:bg-white/[0.05]
              "
            >
              <Icon
                size={34}
                className="text-emerald-400 transition group-hover:scale-110"
              />

              <span className="mt-4 text-lg font-medium">
                {service.name}
              </span>
            </div>
          );
        })}

      </div>

    </section>
  );
}