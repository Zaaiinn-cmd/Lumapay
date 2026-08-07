import {
  ShieldCheck,
  Lock,
  Database,
  Zap,
} from "lucide-react";

const securityItems = [
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Protected with Clerk authentication and modern identity management.",
  },
  {
    icon: Lock,
    title: "Encrypted Infrastructure",
    description:
      "Sensitive data is transmitted securely with industry-standard encryption.",
  },
  {
    icon: Database,
    title: "Reliable Storage",
    description:
      "Wallets and payment records are backed by a robust database architecture.",
  },
  {
    icon: Zap,
    title: "Powered by Solana",
    description:
      "Fast settlement, low fees and scalable blockchain infrastructure.",
  },
];

export default function Security() {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">

      <div className="text-center">

        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
          SECURITY
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          Built with security first
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
          LumaPay is designed with security, reliability and transparency at every layer.
        </p>

      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">

        {securityItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                group
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-white/[0.04]
                to-white/[0.02]
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-emerald-500/40
                hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)]
              "
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <Icon size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {item.description}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}