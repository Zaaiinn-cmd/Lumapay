import { prisma } from "@/lib/prisma";
import VirtualCard from "@/components/VirtualCard";

export default async function CardsPage() {
  const card = await prisma.card.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!card) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Virtual Card</h1>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          No virtual card found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Virtual Card</h1>

      <VirtualCard card={card} />
    </div>
  );
}