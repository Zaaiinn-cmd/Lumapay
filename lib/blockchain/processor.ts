import { prisma } from "@/lib/prisma";
import { ParsedInstruction } from "@solana/web3.js";
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
    console.log("Transaction not found.");
    return;
  }

  const instructions =
    transaction.transaction.message.instructions;

  for (const instruction of instructions) {
    if (!("parsed" in instruction)) continue;

    const parsedInstruction =
      instruction as ParsedInstruction;

    if (parsedInstruction.program !== "spl-token") {
      continue;
    }

    const parsed = parsedInstruction.parsed;

    if (
      parsed.type !== "transfer" &&
      parsed.type !== "transferChecked"
    ) {
      continue;
    }

    const mint = parsed.info.mint;

    if (!mint) {
      continue;
    }

    if (!isSupportedMint(mint)) {
      console.log("❌ Unsupported token:", mint);
      continue;
    }

    const symbol = getTokenSymbol(mint);

    const destination = parsed.info.destination;

    const wallet = await prisma.wallet.findFirst({
      where: {
        depositAddress: destination,
      },
    });

    if (!wallet) {
      console.log("❌ Wallet not found.");
      return;
    }

    console.log("✅ Matched wallet:", wallet.id);

    // Prevent duplicate credits
    const existingDeposit = await prisma.deposit.findUnique({
      where: {
        signature,
      },
    });

    if (existingDeposit) {
      console.log(
        `⚠️ Deposit ${signature} has already been processed.`
      );
      return;
    }

    console.log("✅ Deposit is new.");

    console.log({
      signature,
      token: symbol,
      walletId: wallet.id,
      amount:
        parsed.info.tokenAmount?.uiAmount ??
        parsed.info.amount,
    });

    const amount = Number(
  parsed.info.tokenAmount?.uiAmount ??
    parsed.info.amount
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
  `✅ Credited ${amount} ${symbol} to wallet ${wallet.id}`
);