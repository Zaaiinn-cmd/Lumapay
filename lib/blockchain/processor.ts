import { connection } from "@/lib/blockchain/connection";

export async function processTransaction(
  signature: string
) {
  console.log(
    `🔍 Processing transaction ${signature}`
  );

  const transaction =
    await connection.getParsedTransaction(
      signature,
      {
        maxSupportedTransactionVersion: 0,
      }
    );

  if (!transaction) {
    console.log("Transaction not found.");

    return;
  }

  console.log("Transaction loaded.");

  return transaction;
}