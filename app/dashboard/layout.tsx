import Link from "next/link";
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  Repeat,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white lg:flex">

      {/* Sidebar */}
      <aside className="border-b border-white/10 lg:border-b-0 lg:border-r lg:w-64">

        <div className="p-6">

          <div className="text-xl font-semibold mb-6">
            LumaPay
          </div>

          <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-2">

            <Link
              href="/dashboard"
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-white/10 px-3 py-2"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>

            <Link
              href="/dashboard/subscriptions"
              className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-gray-400 hover:text-white"
            >
              <Repeat size={16} />
              Subscriptions
            </Link>

            <Link
              href="/dashboard/cards"
              className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-gray-400 hover:text-white"
            >
              <CreditCard size={16} />
              Cards
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-gray-400 hover:text-white"
            >
              <Settings size={16} />
              Settings
            </Link>

          </nav>

        </div>

      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}