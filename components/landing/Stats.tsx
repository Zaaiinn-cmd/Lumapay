import {
  DollarSign,
  Globe,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

const stats = [
  {
    icon: DollarSign,
    value: "$0",
    label: "Volume Processed",
    description: "Ready for your first payment",
  },
  {
    icon: CreditCard,
    value: "0",
    label: "Virtual Cards",
    description: "Generated through LumaPay",
  },
  {
    icon: Globe,
    value: "180+",
    label: "Supported Services",
    description: "Global subscriptions",
  },
  {
    icon: ShieldCheck,
    value: "99.9%",
    label: "Platform Uptime",
    description: "Reliable infrastructure",
  },
];

export default function Stats() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="
                group
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-7
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-emerald-500/40
                hover:bg-white/[0.05]
              "
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 transition group-hover:scale-110">
                <Icon size={28} />
              </div>

              <h3 className="mt-6 text-4xl font-bold">
                {stat.value}
              </h3>

              <p className="mt-2 text-lg font-medium">
                {stat.label}
              </p>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                {stat.description}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}