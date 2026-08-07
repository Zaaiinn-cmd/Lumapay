import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { generateDepositWallet } from "@/lib/solana";

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Already exists?
  let user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.emailAddresses.length) {
      return null;
    }

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name:
          `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
          null,
      },
    });
  }

  return user;
}

export async function getCurrentWallet() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  let wallet = await prisma.wallet.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  if (!wallet) {
    const { depositAddress } = generateDepositWallet();

    wallet = await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0,
        depositAddress,
      },
      include: {
        user: true,
      },
    });
  }

  return wallet;
}