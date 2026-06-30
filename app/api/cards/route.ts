import { prisma } from "@/lib/prisma";

function randomDigits(length: number) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
}

export async function GET() {
  const cards = await prisma.card.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(cards);
}

export async function POST() {
  const wallet = await prisma.wallet.findFirst();

  if (!wallet) {
    return Response.json(
      { error: "Wallet not found" },
      { status: 404 }
    );
  }

  const existing = await prisma.card.findFirst({
    where: {
      walletId: wallet.id,
    },
  });

  if (existing) {
    return Response.json(existing);
  }

  const card = await prisma.card.create({
    data: {
      walletId: wallet.id,
      holderName: "Test User",
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

  const card = await prisma.card.findUnique({
    where: {
      id,
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
      id,
    },
    data: {
      frozen: !card.frozen,
      status: !card.frozen ? "FROZEN" : "ACTIVE",
    },
  });

  return Response.json(updated);
}