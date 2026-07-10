import { prisma } from "@/lib/prisma";
import { getCurrentWallet } from "@/lib/currentUser";

export async function GET() {
  const wallet = await getCurrentWallet();

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
  const { type } = await req.json();

  const wallet = await getCurrentWallet();

  let fee = 0;

  if (type === "card_issuance") fee = 3;
  if (type === "monthly") fee = 1.5;

  if (wallet.balance < fee) {
    return Response.json(
      { error: "Insufficient balance" },
      { status: 400 }
    );
  }

  const updatedWallet = await prisma.wallet.update({
    where: {
      id: wallet.id,
    },
    data: {
      balance: wallet.balance - fee,
    },
  });

  const nextBill = new Date();

  if (type === "monthly") {
    nextBill.setMonth(nextBill.getMonth() + 1);
  } else {
    nextBill.setFullYear(nextBill.getFullYear() + 100);
  }

  const subscription = await prisma.subscription.create({
    data: {
      walletId: wallet.id,
      type,
      name:
        type === "card_issuance"
          ? "Card Issuance Fee"
          : "Monthly Subscription",
      amount: fee,
      status: "ACTIVE",
      nextBill,
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      walletId: wallet.id,
      amount: fee,
      fee: 0,
      description:
        type === "card_issuance"
          ? "Virtual Card Issuance"
          : "Monthly Subscription Payment",
    },
  });

  return Response.json({
    wallet: updatedWallet,
    subscription,
    transaction,
  });
}