import Link from "next/link";
import { LayoutDashboard, CreditCard, Settings, Repeat, ArrowUpRight, Wallet } from "lucide-react";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/deposit", label: "Add funds", icon: Wallet },
  { href: "/dashboard/subscriptions", label: "Subscriptions", icon: Repeat },
  { href: "/dashboard/cards", label: "Cards", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09080f] text-white lg:flex">
      <aside className="relative z-10 border-b border-white/[0.07] bg-[#0d0b15] lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[248px] lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-5 lg:px-7 lg:py-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-violet-500 text-lg font-black shadow-[0_0_28px_rgba(139,92,246,0.35)]">L</span>
            <span className="text-lg font-semibold tracking-tight">Luma<span className="text-violet-400">Pay</span></span>
          </Link>
          <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">Beta</span>
        </div>
        <div className="px-5 pb-2 pt-3 lg:px-4">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Workspace</p>
          <nav className="mt-3 flex gap-1 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
            {navigation.map(({ href, label, icon: Icon }, index) => (
              <Link key={href} href={href} className={`group flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${index === 0 ? "bg-violet-500/15 font-medium text-violet-200 ring-1 ring-inset ring-violet-400/15" : "text-white/50 hover:bg-white/[0.05] hover:text-white"}`}>
                <Icon size={17} strokeWidth={1.8} className={index === 0 ? "text-violet-300" : "text-white/40 group-hover:text-white"} />
                {label}
                {index === 0 && <span className="ml-auto hidden size-1.5 rounded-full bg-violet-400 lg:block" />}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto hidden p-4 lg:block">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-white/70"><span className="size-2 rounded-full bg-emerald-400" /> Wallet infrastructure</div>
            <p className="text-xs leading-5 text-white/35">Your stablecoin wallet, subscriptions and cards in one place.</p>
            <Link href="/dashboard/settings" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-violet-300 hover:text-violet-200">Account settings <ArrowUpRight size={13} /></Link>
          </div>
          <p className="px-2 pt-4 text-[10px] text-white/20">LumaPay · Built for the global internet</p>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-9">{children}</div>
      </main>
    </div>
  );
}