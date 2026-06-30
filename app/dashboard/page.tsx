import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const wallet = await prisma.wallet.findFirst();

  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <button className="px-4 py-2 rounded-lg bg-white text-black hover:opacity-90">
          Add Funds
        </button>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BALANCE */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <p className="text-sm text-gray-400">Balance</p>
          <h2 className="text-4xl font-bold">
            ${wallet?.balance?.toFixed(2) ?? "0.00"}
          </h2>
        </div>

        {/* CARD UI */}
        <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/20 to-blue-600/10">
          <p className="text-sm text-gray-300">Virtual Card</p>

          <div className="mt-6">
            <p className="tracking-widest">•••• •••• •••• 4821</p>
            <p className="text-sm text-gray-400">LumaPay Card</p>
          </div>
        </div>

      </div>

      {/* TRANSACTIONS */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Transactions</h2>

        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-gray-400">No transactions yet</p>
          ) : (
            transactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between p-4 border border-white/10 rounded-xl bg-white/5"
              >
                <span>{t.description}</span>

                <span className="text-red-400">
                  -${t.amount.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}