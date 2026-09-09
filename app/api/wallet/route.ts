import { getCurrentUser } from "@/lib/currentUser";
import { ensureWalletExists } from "@/lib/wallet";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const wallet = await ensureWalletExists(user.id);

  return Response.json({
    ...wallet,
    balance: wallet.balance.toString(),
  });
}
