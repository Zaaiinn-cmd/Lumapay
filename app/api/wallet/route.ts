import { prisma } from "@/lib/prisma";

export async function GET() {
  let wallet = await prisma.wallet.findFirst({
    include: {
      user: true,
    },
  });

  if (!wallet) {
    let user = await prisma.user.findFirst();

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "test@example.com",
          name: "Test User",
        },
      });
    }

    wallet = await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 5000,
      },
      include: {
        user: true,
      },
    });
  }

  return Response.json(wallet);
}