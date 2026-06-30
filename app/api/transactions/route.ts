import { prisma } from "@/lib/prisma";

// GET all transactions
export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(transactions);
}