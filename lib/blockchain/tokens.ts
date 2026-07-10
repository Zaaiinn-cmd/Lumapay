// Devnet token mints
export const DEVNET_TOKENS = {
  USDC: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
};

// Mainnet token mints
export const MAINNET_TOKENS = {
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  USDT: "Es9vMFrzaCERmJfrF4H2FYDutLhJw6B9P4s3L8M6kM4",
};

const isMainnet =
  process.env.SOLANA_RPC_URL?.includes("mainnet") ?? false;

export const SUPPORTED_TOKENS = isMainnet
  ? MAINNET_TOKENS
  : DEVNET_TOKENS;

export function isSupportedMint(mint: string) {
  return Object.values(SUPPORTED_TOKENS).includes(mint);
}