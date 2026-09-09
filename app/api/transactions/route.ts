import { prisma } from "@/lib/prisma";
import { getCurrentWallet } from "@/lib/currentUser";

// GET the current user's transactions
export async function GET() {
  const wallet = await getCurrentWallet();

  if (!wallet) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      walletId: wallet.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(
    transactions.map((transaction) => ({
      ...transaction,
      amount: transaction.amount.toString(),
      fee: transaction.fee.toString(),
    }))
  );
}
