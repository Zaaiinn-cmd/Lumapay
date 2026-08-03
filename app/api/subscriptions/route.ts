import { prisma } from "@/lib/prisma";
import { getCurrentWallet } from "@/lib/currentUser";

export async function GET() {
  const wallet = await getCurrentWallet();

  if (!wallet) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const subscriptions = await prisma.subscription.findMany({
    where: {
      walletId: wallet.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(subscriptions);
}

export async function POST(req: Request) {
  const wallet = await getCurrentWallet();

  if (!wallet) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const subscription = await prisma.subscription.create({
    data: {
      walletId: wallet.id,
      ...body,
    },
  });

  return Response.json(subscription);
}