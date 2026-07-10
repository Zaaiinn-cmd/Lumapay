import { Keypair } from "@solana/web3.js";

export function generateDepositWallet() {
  const keypair = Keypair.generate();

  return {
    depositAddress: keypair.publicKey.toBase58(),
    secretKey: Buffer.from(keypair.secretKey).toString("base64"),
  };
}