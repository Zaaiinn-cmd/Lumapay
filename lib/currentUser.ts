import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getCurrentWallet() {
  const user = await getCurrentUser();

  const wallet = await prisma.wallet.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  return wallet;
}