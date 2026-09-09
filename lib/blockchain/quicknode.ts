import crypto from "node:crypto";
import { Connection, ParsedTransactionWithMeta } from "@solana/web3.js";

const DEFAULT_MAX_SKEW_SECONDS = 300;
const SUPPORTED_TOKEN_DECIMALS = 6;

function timingSafeHexEqual(a: string, b: string) {
  if (!/^[0-9a-f]+$/i.test(a) || !/^[0-9a-f]+$/i.test(b) || a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

function rawUnitsToDecimalString(units: bigint, decimals: number) {
  if (decimals === 0) return units.toString();

  const raw = units.toString().padStart(decimals + 1, "0");
  const whole = raw.slice(0, -decimals);
  const fraction = raw.slice(-decimals).replace(/0+$/, "");

  return fraction ? `${whole}.${fraction}` : whole;
}

export function verifyQuickNodeSignature(
  payload: string,
  nonce: string | null,
  timestamp: string | null,
  signature: string | null,
  secret = process.env.QUICKNODE_WEBHOOK_SECRET,
) {
  if (!secret || !nonce || !timestamp || !signature) return false;

  const timestampValue = Number(timestamp);
  if (!Number.isFinite(timestampValue)) return false;

  const timestampMs = timestampValue < 10_000_000_000 ? timestampValue * 1000 : timestampValue;
  const maxSkew = Number(process.env.QUICKNODE_WEBHOOK_MAX_SKEW_SECONDS ?? DEFAULT_MAX_SKEW_SECONDS);
  if (!Number.isFinite(maxSkew) || Math.abs(Date.now() - timestampMs) > maxSkew * 1000) return false;

  const signedPayload = `${nonce}${timestamp}${payload}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload, "utf8").digest("hex");
  return timingSafeHexEqual(expected, signature.trim());
}

export function getSolanaConnection() {
  const rpcUrl = process.env.SOLANA_RPC_URL;
  if (!rpcUrl) throw new Error("SOLANA_RPC_URL is not configured");
  return new Connection(rpcUrl, "confirmed");
}

export function getSupportedMints() {
  const supported = new Map<string, string>();
  if (process.env.SOLANA_USDC_MINT) supported.set(process.env.SOLANA_USDC_MINT, "USDC");
  if (process.env.SOLANA_USDT_MINT) supported.set(process.env.SOLANA_USDT_MINT, "USDT");
  return supported;
}

export function extractSignatures(payload: unknown): string[] {
  const found = new Set<string>();
  const signatureKeys = new Set([
    "signature",
    "transactionSignature",
    "transaction_signature",
    "txSignature",
    "tx_signature",
  ]);

  const visit = (value: unknown) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    for (const [key, child] of Object.entries(value)) {
      if (key === "signatures" && Array.isArray(child)) {
        child.forEach((item) => {
          if (typeof item === "string" && item.length >= 80) found.add(item);
        });
      }
      if (signatureKeys.has(key) && typeof child === "string" && child.length >= 80) found.add(child);
      visit(child);
    }
  };

  visit(payload);
  return [...found];
}

type VerifiedTransfer = {
  walletId: string;
  amount: string;
  token: string;
  signature: string;
  blockTime: Date | null;
};

export async function verifySolanaDeposit(
  signature: string,
  wallets: Array<{ id: string; depositAddress: string | null }>,
): Promise<VerifiedTransfer | null> {
  const connection = getSolanaConnection();
  const supportedMints = getSupportedMints();
  if (supportedMints.size === 0) throw new Error("No supported Solana token mints are configured");

  const transaction: ParsedTransactionWithMeta | null = await connection.getParsedTransaction(signature, {
    commitment: "confirmed",
    maxSupportedTransactionVersion: 0,
  });

  if (!transaction?.meta || transaction.meta.err) return null;

  const pre = new Map<string, bigint>();
  const post = new Map<string, { amount: bigint; decimals: number; mint: string; owner?: string }>();

  for (const balance of transaction.meta.preTokenBalances ?? []) {
    pre.set(balance.accountIndex.toString(), BigInt(balance.uiTokenAmount.amount));
  }

  for (const balance of transaction.meta.postTokenBalances ?? []) {
    post.set(balance.accountIndex.toString(), {
      amount: BigInt(balance.uiTokenAmount.amount),
      decimals: balance.uiTokenAmount.decimals,
      mint: balance.mint,
      owner: balance.owner,
    });
  }

  for (const [accountIndex, after] of post) {
    const before = pre.get(accountIndex) ?? 0n;
    const delta = after.amount - before;
    const token = supportedMints.get(after.mint);
    if (delta <= 0n || !token) continue;

    if (after.decimals !== SUPPORTED_TOKEN_DECIMALS) continue;

    const wallet = wallets.find(
      (candidate) => candidate.depositAddress && candidate.depositAddress === after.owner,
    );
    if (!wallet) continue;

    return {
      walletId: wallet.id,
      amount: rawUnitsToDecimalString(delta, after.decimals),
      token,
      signature,
      blockTime: transaction.blockTime ? new Date(transaction.blockTime * 1000) : null,
    };
  }

  return null;
}
