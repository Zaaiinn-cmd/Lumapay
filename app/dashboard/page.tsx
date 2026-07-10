import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentWallet } from "@/lib/currentUser";
import SpendingChart from "@/components/SpendingChart";
import {
  Wallet,
  Repeat,
  CreditCard,
  Receipt,
  DollarSign,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export default async function Dashboard() {
  const wallet = await getCurrentWallet();

  const transactions = await prisma.transaction.findMany({
    where: {
      walletId: wallet.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const subscriptions = await prisma.subscription.findMany({
    where: {
      walletId: wallet.id,
      status: "ACTIVE",
    },
  });

  const card = await prisma.card.findFirst({
    where: {
      walletId: wallet.id,
    },
  });

  const chartData = [...transactions]
    .reverse()
    .map((tx) => ({
      date: new Date(tx.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      amount: tx.amount,
    }));

  const totalSpent = transactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  const totalFees = transactions.reduce(
    (sum, tx) => sum + tx.fee,
    0
  );

  const averagePayment =
    transactions.length > 0
      ? totalSpent / transactions.length
      : 0;

  const biggestPayment =
    transactions.length > 0
      ? Math.max(...transactions.map((t) => t.amount))
      : 0;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-1">
            Welcome back to LumaPay
          </p>
        </div>

        <Link
          href="/dashboard/deposit"
          className="rounded-xl bg-white px-5 py-2 text-black font-medium hover:opacity-90 transition"
        >
          Add Funds
        </Link>
      </div>

      {/* TOP STATS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex justify-between">
            <Wallet />
            <span className="text-green-400 text-sm">
              Wallet
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            ${wallet.balance.toFixed(2)}
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Available Balance
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex justify-between">
            <Receipt />
            <span className="text-blue-400 text-sm">
              Payments
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            {transactions.length}
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Total Transactions
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex justify-between">
            <Repeat />
            <span className="text-purple-400 text-sm">
              Active
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            {subscriptions.length}
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Subscriptions
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex justify-between">
            <CreditCard />

            <span
              className={`text-sm ${
                card?.frozen
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {card
                ? card.frozen
                  ? "Frozen"
                  : "Active"
                : "No Card"}
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            {card ? "1" : "0"}
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Virtual Cards
          </p>
        </div>
      </div>

      {/* ANALYTICS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <DollarSign />

          <h2 className="mt-4 text-3xl font-bold">
            ${totalSpent.toFixed(2)}
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Total Spent
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <TrendingUp />

          <h2 className="mt-4 text-3xl font-bold">
            ${totalFees.toFixed(2)}
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Total Fees Paid
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <BarChart3 />

          <h2 className="mt-4 text-3xl font-bold">
            ${averagePayment.toFixed(2)}
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Average Payment
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <Receipt />

          <h2 className="mt-4 text-3xl font-bold">
            ${biggestPayment.toFixed(2)}
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Biggest Payment
          </p>
        </div>
      </div>

      {/* SPENDING CHART */}
      <SpendingChart data={chartData} />

      {/* RECENT TRANSACTIONS */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Recent Transactions
        </h2>

        {transactions.length === 0 ? (
          <p className="text-gray-400">
            No transactions yet.
          </p>
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between rounded-xl border border-white/10 bg-black/20 p-4"
              >
                <div>
                  <p className="font-medium">
                    {t.description}
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(t.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-red-400 font-semibold">
                    -${t.amount.toFixed(2)}
                  </p>

                  <p className="text-xs text-gray-500">
                    Fee: ${t.fee.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}