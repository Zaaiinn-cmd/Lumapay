import { getCurrentWallet } from "@/lib/currentUser";

export async function GET() {
  const wallet = await getCurrentWallet();

  if (!wallet) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return Response.json({
    walletId: wallet.id,
    network: "Solana",
    address: wallet.depositAddress,
    supportedTokens: ["USDC", "USDT"],
  });
}