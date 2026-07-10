import { prisma } from "@/lib/prisma";
import { getCurrentWallet } from "@/lib/currentUser";
import VirtualCard from "@/components/VirtualCard";
import CardOverview from "@/components/CardOverview";

export default async function CardsPage() {
  const wallet = await getCurrentWallet();

  const card = await prisma.card.findFirst({
    where: {
      walletId: wallet.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Virtual Card
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your LumaPay virtual USD card.
        </p>
      </div>

      {card ? (
        <>
          <VirtualCard card={card} />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span
                className={
                  card.frozen
                    ? "text-red-400 font-medium"
                    : "text-green-400 font-medium"
                }
              >
                {card.frozen ? "Frozen" : "Active"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Brand</span>
              <span>{card.brand}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Card Holder</span>
              <span>{card.holderName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Expiry</span>
              <span>{card.expiry}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">CVV</span>
              <span>{card.cvv}</span>
            </div>
          </div>

          <CardOverview />
        </>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Virtual Card Yet
          </h2>

          <p className="mt-2 text-gray-400">
            Generate your first LumaPay virtual card to start
            paying for subscriptions worldwide.
          </p>

          <button className="mt-6 rounded-xl bg-white px-6 py-3 text-black font-medium hover:opacity-90">
            Generate Card
          </button>
        </div>
      )}
    </div>
  );
}