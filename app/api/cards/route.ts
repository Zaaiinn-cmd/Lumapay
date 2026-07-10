import { prisma } from "@/lib/prisma";
import { getCurrentWallet } from "@/lib/currentUser";

function randomDigits(length: number) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
}

export async function GET() {
  const wallet = await getCurrentWallet();

  const cards = await prisma.card.findMany({
    where: {
      walletId: wallet.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(cards);
}

export async function POST() {
  const wallet = await getCurrentWallet();

  const existing = await prisma.card.findFirst({
    where: {
      walletId: wallet.id,
    },
  });

  if (existing) {
    return Response.json(existing);
  }

  const holderName =
    wallet.user.name ||
    wallet.user.email.split("@")[0];

  const card = await prisma.card.create({
    data: {
      walletId: wallet.id,
      holderName,
      cardNumber: "4532" + randomDigits(12),
      expiry: "12/30",
      cvv: randomDigits(3),
      brand: "VISA",
    },
  });

  return Response.json(card);
}

export async function PATCH(req: Request) {
  const { id } = await req.json();

  const wallet = await getCurrentWallet();

  const card = await prisma.card.findFirst({
    where: {
      id,
      walletId: wallet.id,
    },
  });

  if (!card) {
    return Response.json(
      { error: "Card not found" },
      { status: 404 }
    );
  }

  const updated = await prisma.card.update({
    where: {
      id: card.id,
    },
    data: {
      frozen: !card.frozen,
      status: card.frozen ? "ACTIVE" : "FROZEN",
    },
  });

  return Response.json(updated);
}