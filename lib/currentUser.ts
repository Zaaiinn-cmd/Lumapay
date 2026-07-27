import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    return await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
  } catch (error) {
    console.error("getCurrentUser:", error);
    return null;
  }
}

export async function getCurrentWallet() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    return await prisma.wallet.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    console.error("getCurrentWallet:", error);
    return null;
  }
}