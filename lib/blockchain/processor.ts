import { prisma } from "@/lib/prisma";
import { verifySolanaDeposit } from "@/lib/blockchain/quicknode";
import { processDeposit } from "@/lib/processDeposit";

export async function processTransaction(signature: string) {
  console.log(`🔍 Processing ${signature}`);

  const wallets = await prisma.wallet.findMany({
    where: { depositAddress: { not: null } },
    select: { id: true, depositAddress: true },
  });

  const verifiedDeposit = await verifySolanaDeposit(signature, wallets);

  if (!verifiedDeposit) {
    console.log(`ℹ️ Transaction ${signature} was not a verified LumaPay deposit.`);
    return null;
  }

  const deposit = await processDeposit(verifiedDeposit);

  console.log(
    `💰 Verified ${verifiedDeposit.amount} ${verifiedDeposit.token} deposit for wallet ${verifiedDeposit.walletId}`,
  );

  return deposit;
}
