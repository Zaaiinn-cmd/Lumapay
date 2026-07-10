import { processTransaction } from "@/lib/blockchain/processor";
import { PublicKey } from "@solana/web3.js";
import { prisma } from "@/lib/prisma";
import { connection } from "@/lib/blockchain/connection";

let started = false;

export async function startDepositListener() {
  if (started) return;

  started = true;

  console.log("🚀 Deposit listener started");

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

  for (const wallet of wallets) {
    if (!wallet.depositAddress) continue;

    const publicKey = new PublicKey(wallet.depositAddress);

    connection.onAccountChange(
      publicKey,
      async () => {
        console.log(
          `📥 Activity detected for ${wallet.depositAddress}`
        );

        try {
          const signatures =
            await connection.getSignaturesForAddress(
              publicKey,
              {
                limit: 5,
              }
            );

          if (signatures.length === 0) {
            console.log("No recent transactions.");
            return;
          }

          console.log(
            `Found ${signatures.length} recent transaction(s)`
          );

          for (const sig of signatures) {
            console.log(
              "Transaction Signature:",
              sig.signature
            );

            await processTransaction(sig.signature);

            console.log("Parsed Transaction:");
            console.dir(tx, {
              depth: null,
            });

            // ✅ Next step:
            // Extract SPL token transfer details
            // Verify USDC/USDT mint
            // Call processDeposit()
          }
        } catch (error) {
          console.error(
            "Deposit listener error:",
            error
          );
        }
      },
      "confirmed"
    );

    console.log(`👀 Watching ${wallet.depositAddress}`);
  }
}