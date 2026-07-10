import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import { generateDepositWallet } from "@/lib/solana";

export async function GET() {
  const user = await getCurrentUser();

  let wallet = await prisma.wallet.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  // Create wallet if it doesn't exist
  if (!wallet) {
    const { depositAddress } = generateDepositWallet();

    wallet = await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 5000,
        depositAddress,
      },
      include: {
        user: true,
      },
    });

    return Response.json(wallet);
  }

  // Existing wallet without a deposit address
  if (!wallet.depositAddress) {
    const { depositAddress } = generateDepositWallet();

    wallet = await prisma.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        depositAddress,
      },
      include: {
        user: true,
      },
    });
  }

  return Response.json(wallet);
}