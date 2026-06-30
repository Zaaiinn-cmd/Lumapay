import { prisma } from "@/lib/prisma";

export async function GET() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(subscriptions);
}

export async function POST(req: Request) {
  const { walletId, type } = await req.json();

  console.log("SUB REQUEST:", { walletId, type });

  // Debug: list wallets
  const allWallets = await prisma.wallet.findMany();
  console.log("ALL WALLETS:", allWallets);

  // Use findFirst temporarily
  const wallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
    },
  });

  console.log("FOUND WALLET:", wallet);

  if (!wallet) {
    return Response.json(
      { error: "Wallet not found" },
      { status: 404 }
    );
  }

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

  return Response.json({
    wallet: updatedWallet,
    subscription,
  });
}