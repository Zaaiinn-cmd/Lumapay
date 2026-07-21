import { prisma } from "@/lib/prisma";
import {
  ParsedInstruction,
  PublicKey,
} from "@solana/web3.js";
import { connection } from "@/lib/blockchain/connection";
import {
  isSupportedMint,
  getTokenSymbol,
} from "@/lib/blockchain/tokens";

export async function processTransaction(
  signature: string
) {
  console.log(`🔍 Processing ${signature}`);

  const transaction =
    await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });

  if (!transaction) {
    console.log("❌ Transaction not found.");
    return;
  }

  if (transaction.meta?.err) {
    console.log(
      `❌ Transaction ${signature} failed.`
    );
    return;
  }

  console.log(
    "📌 Confirmation Status:",
    transaction.meta?.status
  );

  if (
    !transaction.meta?.postTokenBalances ||
    transaction.meta.postTokenBalances.length === 0
  ) {
    console.log("⚠️ No SPL token balances changed.");
    return;
  }

  const instructions =
    transaction.transaction.message.instructions;

  console.log(
    `📦 Found ${instructions.length} instruction(s)`
  );

  for (const instruction of instructions) {
    if (!("parsed" in instruction)) continue;

    const parsedInstruction =
      instruction as ParsedInstruction;

    console.log(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );
    console.log(
      "Program:",
      parsedInstruction.program
    );

    if (parsedInstruction.program !== "spl-token") {
      console.log("Skipping non-token instruction");
      continue;
    }

    const parsed = parsedInstruction.parsed;

    console.log(
      "Instruction Type:",
      parsed.type
    );

    console.log(
      "Instruction Info:"
    );
    console.dir(parsed.info, {
      depth: null,
    });

    if (
      parsed.type !== "transfer" &&
      parsed.type !== "transferChecked"
    ) {
      console.log(
        "Skipping unsupported instruction type"
      );
      continue;
    }

    const mint = parsed.info.mint;

    console.log("Mint:", mint);

    if (!mint) {
      console.log(
        "❌ No mint found in instruction."
      );
      continue;
    }

    if (!isSupportedMint(mint)) {
      console.log(
        `❌ Unsupported token: ${mint}`
      );
      continue;
    }

    const symbol = getTokenSymbol(mint);

    console.log(
      `✅ Supported token: ${symbol}`
    );

    const destination =
      parsed.info.destination;

    console.log(
      "Destination ATA:",
      destination
    );

    const accountInfo =
      await connection.getParsedAccountInfo(
        new PublicKey(destination)
      );

    console.log("Parsed ATA:");
    console.dir(accountInfo.value, {
      depth: null,
    });

    const owner =
      (
        accountInfo.value?.data as any
      )?.parsed?.info?.owner;

    if (!owner) {
      console.log(
        "❌ Could not resolve ATA owner."
      );
      return;
    }

    console.log(
      `Resolved owner wallet: ${owner}`
    );

    const wallet =
      await prisma.wallet.findFirst({
        where: {
          depositAddress: owner,
        },
      });

    if (!wallet) {
      console.log(
        `❌ No wallet found for owner ${owner}`
      );
      return;
    }

    console.log(
      `✅ Matched wallet ${wallet.id}`
    );

    const existingDeposit =
      await prisma.deposit.findUnique({
        where: {
          signature,
        },
      });

    if (existingDeposit) {
      console.log(
        `⚠️ Deposit ${signature} already processed.`
      );
      return;
    }

    console.log("Amount fields:");
    console.dir(parsed.info, {
      depth: null,
    });

    const amount = Number(
      parsed.info.tokenAmount?.uiAmount ??
        parsed.info.amount
    );

    console.log(
      `Amount parsed: ${amount}`
    );

    await prisma.$transaction([
      prisma.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      }),

      prisma.deposit.create({
        data: {
          walletId: wallet.id,
          signature,
          amount,
          token: symbol ?? "UNKNOWN",
        },
      }),

      prisma.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          fee: 0,
          description: `${symbol} Deposit`,
          type: "DEPOSIT",
        },
      }),
    ]);

    console.log(
      `💰 Credited ${amount} ${symbol} to wallet ${wallet.id}`
    );
  }
}