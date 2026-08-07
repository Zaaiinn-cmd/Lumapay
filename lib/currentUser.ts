import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { generateDepositWallet } from "@/lib/solana";

export async function getCurrentUser() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (user) {
      return user;
    }

    // Fetch Clerk profile
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return null;
    }

    // Create Prisma user
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      },
    });

    // Generate deposit wallet
    const { depositAddress } = generateDepositWallet();

    // Create wallet automatically
    await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0,
        depositAddress,
      },
    });

    return user;
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

    return prisma.wallet.findUnique({
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