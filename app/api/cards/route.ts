import { prisma } from "@/lib/prisma";
import { getCurrentWallet } from "@/lib/currentUser";

export const dynamic = "force-dynamic";

function randomDigits(length: number) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
}

export async function GET() {
  try {
    const wallet = await getCurrentWallet();

    if (!wallet) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const cards = await prisma.card.findMany({
      where: {
        walletId: wallet.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(cards);
  } catch (error) {
    console.error("GET /api/cards:", error);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const wallet = await getCurrentWallet();

    if (!wallet) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
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

    const holderName =
      wallet.user.name ??
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
  } catch (error) {
    console.error("POST /api/cards:", error);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    const wallet = await getCurrentWallet();

    if (!wallet) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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
  } catch (error) {
    console.error("PATCH /api/cards:", error);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}