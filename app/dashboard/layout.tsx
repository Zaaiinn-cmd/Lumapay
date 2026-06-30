import Link from "next/link";
import { LayoutDashboard, CreditCard, Settings, Repeat } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 p-6 space-y-6">

        <div className="text-xl font-semibold">LumaPay</div>

        <nav className="space-y-2 text-sm">

          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-white px-3 py-2 rounded-lg bg-white/10"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>

          <Link
            href="/dashboard/subscriptions"
            className="flex items-center gap-2 text-gray-400 hover:text-white px-3 py-2 rounded-lg"
          >
            <Repeat size={16} />
            Subscriptions
          </Link>

          <Link
            href="/dashboard/cards"
            className="flex items-center gap-2 text-gray-400 hover:text-white px-3 py-2 rounded-lg"
          >
            <CreditCard size={16} />
            Cards
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 text-gray-400 hover:text-white px-3 py-2 rounded-lg"
          >
            <Settings size={16} />
            Settings
          </Link>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}