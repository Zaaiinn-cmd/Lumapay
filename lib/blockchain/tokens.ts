export const SUPPORTED_TOKENS = {
  devnet: {
    USDC: "Gh9ZwEmdLJ8DscKNTkqPbNwLNNBjuSzaG9Vp2KGtKJr",
  },

  mainnet: {
    USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  },
};

export function isSupportedMint(mint: string) {
  const network =
    process.env.SOLANA_NETWORK === "mainnet"
      ? SUPPORTED_TOKENS.mainnet
      : SUPPORTED_TOKENS.devnet;

  return Object.values(network).includes(mint);
}

export function getTokenSymbol(mint: string) {
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
