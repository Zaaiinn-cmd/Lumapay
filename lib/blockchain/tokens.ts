export const SUPPORTED_TOKENS = {
  devnet: {
    USDC: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
  },

  mainnet: {
    USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",

    USDT: "Es9vMFrzaCERmJfrF4H2JY3Y6sVvZzK5x2D8hFQ9wJf",
  },
};

export function isSupportedMint(
  mint: string
) {
  const network =
    process.env.SOLANA_NETWORK === "mainnet"
      ? SUPPORTED_TOKENS.mainnet
      : SUPPORTED_TOKENS.devnet;

  return Object.values(network).includes(mint);
}

export function getTokenSymbol(
  mint: string
) {
  const network =
    process.env.SOLANA_NETWORK === "mainnet"
      ? SUPPORTED_TOKENS.mainnet
      : SUPPORTED_TOKENS.devnet;

  return (
    Object.entries(network).find(
      ([, value]) => value === mint
    )?.[0] ?? null
  );
}