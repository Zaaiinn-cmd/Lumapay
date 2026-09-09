import { Prisma, prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type ProcessDepositInput = {
  walletId: string;
  amount: string;
  token: string;
  signature: string;
  blockTime?: Date | null;
};

const MAX_TRANSACTION_RETRIES = 3;

export async function processDeposit({
  walletId,
  amount,
  token,
  signature,
  blockTime = null,
}: ProcessDepositInput) {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid deposit amount");
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.deposit.findUnique({
        where: { signature },
      });

      if (existing) return existing;

      const deposit = await tx.deposit.create({
        data: {
          walletId,
          amount,
          token,
          signature,
          status: "CONFIRMED",
          blockTime,
        },
      });

      await tx.wallet.update({
        where: { id: walletId },
        data: {
          balance: { increment: amount },
        },
      });

      await tx.transaction.create({
        data: {
          walletId,
          amount,
          fee: 0,
          type: "DEPOSIT",
          description: `${token} deposit confirmed (${signature.slice(0, 8)}...)`,
        },
      });

      return deposit;
    });
  } catch (error) {
    // Deposit.signature is unique.
    // If two webhook deliveries race, only one should credit the wallet.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const existing = await prisma.deposit.findUnique({
        where: { signature },
      });

      if (existing) {
        return existing;
      }
    }

    throw error;
  }
}
