import { processTransaction } from "@/lib/blockchain/processor";
import { PublicKey } from "@solana/web3.js";
import { prisma } from "@/lib/prisma";
import { connection } from "@/lib/blockchain/connection";

let started = false;

// Prevent duplicate processing
const processedSignatures = new Set<string>();

export async function startDepositListener() {
  if (started) return;

  started = true;

  console.log("🚀 Deposit log listener started");

  const wallets = await prisma.wallet.findMany({
    where: {
      depositAddress: {
        not: null,
      },
    },
  });

  if (wallets.length === 0) {
    console.log("⚠️ No deposit wallets found.");
    return;
  }

  console.log(
    `👀 Watching ${wallets.length} deposit wallet(s)`
  );

  for (const wallet of wallets) {
    if (!wallet.depositAddress) continue;

    const publicKey = new PublicKey(wallet.depositAddress);

    connection.onLogs(
      publicKey,
      async ({ signature, err }) => {
        try {
          if (err) return;

          if (!signature) return;

          if (
            processedSignatures.has(signature)
          ) {
            return;
          }

          processedSignatures.add(signature);

          console.log("");
          console.log(
            "━━━━━━━━━━━━━━━━━━━━━━━━━━"
          );
          console.log(
            `📥 Deposit activity detected`
          );
          console.log(
            `Wallet: ${wallet.depositAddress}`
          );
          console.log(
            `Signature: ${signature}`
          );

          await processTransaction(signature);
        } catch (error) {
          console.error(
            "❌ Deposit listener error:",
            error
          );
        }
      },
      "confirmed"
    );

    console.log(
      `✅ Listening to ${wallet.depositAddress}`
    );
  }
}