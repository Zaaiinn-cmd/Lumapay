import { processTransaction } from "@/lib/blockchain/processor";

export async function GET() {
  await processTransaction(
    "tyboWZSveQmFjxWVcLdAFDngauwfzjuK4vpU3D5XqQYQ9VdgpyxQRaHHFYvadC35rjir39PtFkHxWNXDvDvq87V"
  );

  return Response.json({
    success: true,
  });
}