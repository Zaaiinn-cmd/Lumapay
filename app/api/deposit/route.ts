import { getCurrentWallet } from "@/lib/currentUser";

export async function GET() {
  const wallet = await getCurrentWallet();

  return Response.json({
    walletId: wallet.id,
    network: "Solana",
    address: wallet.depositAddress,
    supportedTokens: ["USDC", "USDT"],
  });
}