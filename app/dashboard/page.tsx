import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentWallet } from "@/lib/currentUser";
import SpendingChart from "@/components/SpendingChart";
import { Wallet, Repeat, CreditCard, ArrowDownLeft, ArrowUpRight, Plus, Activity, Receipt, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default async function Dashboard() {
  const wallet = await getCurrentWallet();
  if (!wallet) return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"><h1 className="text-2xl font-semibold">Sign in required</h1><p className="mt-2 text-sm text-white/45">Please sign in to access your LumaPay dashboard.</p></div>;

  const [transactions, subscriptions, card] = await Promise.all([
    prisma.transaction.findMany({ where: { walletId: wallet.id }, orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.subscription.findMany({ where: { walletId: wallet.id, status: "ACTIVE" } }),
    prisma.card.findFirst({ where: { walletId: wallet.id } }),
  ]);

  const payments = transactions.filter((tx) => tx.type === "PAYMENT").map((tx) => ({ ...tx, amountNumber: Number(tx.amount), feeNumber: Number(tx.fee) }));
  const chartData = [...payments].reverse().map((tx) => ({ date: new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }), amount: tx.amountNumber }));
  const totalSpent = payments.reduce((sum, tx) => sum + tx.amountNumber, 0);
  const totalFees = payments.reduce((sum, tx) => sum + tx.feeNumber, 0);
  const stats = [
    { label: "Available balance", value: money(Number(wallet.balance)), detail: "Your wallet balance", icon: Wallet, accent: "text-violet-300", tint: "bg-violet-400/10" },
    { label: "Total transactions", value: String(transactions.length), detail: "All wallet activity", icon: Activity, accent: "text-sky-300", tint: "bg-sky-400/10" },
    { label: "Active subscriptions", value: String(subscriptions.length), detail: "Currently active", icon: Repeat, accent: "text-fuchsia-300", tint: "bg-fuchsia-400/10" },
    { label: "Virtual cards", value: card ? "1" : "0", detail: card ? (card.frozen ? "Card frozen" : "Card available") : "No card issued", icon: CreditCard, accent: "text-emerald-300", tint: "bg-emerald-400/10" },
  ];

  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-violet-300"><Sparkles size={13} /> Your money, moving globally</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">Overview</h1>
          <p className="mt-2 text-sm text-white/40">Here’s what’s happening with your LumaPay wallet.</p>
        </div>
        <Link href="/dashboard/deposit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.2)] transition hover:bg-violet-400"><Plus size={17} /> Add funds</Link>
      </header>

      <section className="relative overflow-hidden rounded-[26px] border border-violet-300/15 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.24),transparent_48%),linear-gradient(120deg,#191329,#100e19_58%,#151020)] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full border border-violet-300/10" />
        <div className="pointer-events-none absolute -right-5 -top-14 size-44 rounded-full border border-violet-300/10" />
        <div className="relative flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div><p className="text-sm text-violet-100/60">Total wallet balance</p><p className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{money(Number(wallet.balance))}</p><p className="mt-3 text-xs text-white/40">Stablecoin wallet balance</p></div>
          <div className="flex flex-wrap gap-2">
            <Link href="/dashboard/deposit" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-medium hover:bg-white/10"><ArrowDownLeft size={16} /> Deposit</Link>
            <Link href="/dashboard/cards" className="inline-flex items-center gap-2 rounded-xl border border-violet-300/20 bg-violet-400/15 px-4 py-3 text-sm font-medium text-violet-100 hover:bg-violet-400/20"><CreditCard size={16} /> View cards</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, detail, icon: Icon, accent, tint }) => (
          <div key={label} className="rounded-2xl border border-white/[0.07] bg-[#100e18] p-5 transition hover:border-violet-300/20">
            <div className="flex items-start justify-between"><span className="text-xs font-medium text-white/45">{label}</span><span className={`grid size-9 place-items-center rounded-xl ${tint} ${accent}`}><Icon size={17} /></span></div>
            <p className="mt-5 text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-white/30">{detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="min-w-0"><SpendingChart data={chartData} /></div>
        <div className="rounded-2xl border border-white/[0.07] bg-[#100e18] p-5 sm:p-6">
          <div className="flex items-center justify-between"><div><h2 className="font-semibold">Payment insights</h2><p className="mt-1 text-xs text-white/35">Based on recorded payments</p></div><span className="grid size-9 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><Receipt size={17} /></span></div>
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between"><span className="text-sm text-white/45">Total spent</span><span className="font-semibold">{money(totalSpent)}</span></div>
            <div className="h-px bg-white/[0.06]" />
            <div className="flex items-center justify-between"><span className="text-sm text-white/45">Fees paid</span><span className="font-semibold">{money(totalFees)}</span></div>
            <div className="h-px bg-white/[0.06]" />
            <div className="flex items-center justify-between"><span className="text-sm text-white/45">Average payment</span><span className="font-semibold">{money(payments.length ? totalSpent / payments.length : 0)}</span></div>
          </div>
          <Link href="/dashboard/subscriptions" className="mt-7 flex items-center justify-between rounded-xl border border-violet-300/15 bg-violet-400/[0.07] px-4 py-3 text-sm text-violet-200 transition hover:bg-violet-400/10"><span>Manage subscriptions</span><ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section className="rounded-2xl border border-white/[0.07] bg-[#100e18] p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3"><div><h2 className="font-semibold">Recent activity</h2><p className="mt-1 text-xs text-white/35">Your latest wallet transactions</p></div><span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/40">{transactions.length} shown</span></div>
        {transactions.length === 0 ? <div className="rounded-xl border border-dashed border-white/10 px-4 py-10 text-center"><span className="mx-auto grid size-10 place-items-center rounded-xl bg-white/[0.04] text-white/40"><Activity size={18} /></span><p className="mt-3 text-sm font-medium text-white/70">No activity yet</p><p className="mt-1 text-xs text-white/35">Your deposits and payments will appear here.</p><Link href="/dashboard/deposit" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200">Make your first deposit <ArrowUpRight size={15} /></Link></div> : <div className="divide-y divide-white/[0.06]">{transactions.map((tx) => { const isDeposit = tx.type === "DEPOSIT"; return <div key={tx.id} className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1"><div className="flex min-w-0 items-center gap-3"><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${isDeposit ? "bg-emerald-400/10 text-emerald-300" : "bg-violet-400/10 text-violet-300"}`}>{isDeposit ? <ArrowDownLeft size={17} /> : <ArrowUpRight size={17} />}</span><div className="min-w-0"><p className="truncate text-sm font-medium text-white/85">{tx.description}</p><p className="mt-1 text-xs text-white/35">{new Date(tx.createdAt).toLocaleString()}</p></div></div><div className="shrink-0 text-right"><p className={`text-sm font-semibold ${isDeposit ? "text-emerald-300" : "text-white/85"}`}>{isDeposit ? "+" : "-"}{money(Number(tx.amount))}</p><p className="mt-1 text-[11px] text-white/30">Fee {money(Number(tx.fee))}</p></div></div>; })}</div>}
      </section>
    </div>
  );
}