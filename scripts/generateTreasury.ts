import { Keypair } from "@solana/web3.js";
import fs from "fs";

const wallet = Keypair.generate();

console.log("PUBLIC KEY:");
console.log(wallet.publicKey.toBase58());

console.log("\nSECRET KEY:");

console.log(Buffer.from(wallet.secretKey).toString("base64"));

fs.writeFileSync(
  "treasury.json",
  JSON.stringify(Array.from(wallet.secretKey))
);

console.log("\nSaved treasury.json");