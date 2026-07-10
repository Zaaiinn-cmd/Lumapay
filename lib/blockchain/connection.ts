import { Connection, Commitment } from "@solana/web3.js";

const RPC_URL =
  process.env.SOLANA_RPC_URL ??
  "https://snowy-responsive-mound.solana-devnet.quiknode.pro/d500f494dbf233f2e3909e3da8a5df8285d4a660/";

const COMMITMENT: Commitment = "confirmed";

export const connection = new Connection(
  RPC_URL,
  COMMITMENT
);

console.log("🟢 Solana RPC:", RPC_URL);