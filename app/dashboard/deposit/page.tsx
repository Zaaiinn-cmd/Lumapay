import DepositCard from "@/components/DepositCard";
import { getCurrentWallet } from "@/lib/currentUser";

export default async function DepositPage() {
  const wallet = await getCurrentWallet();

  if (!wallet) {
    return (
      <div>
        <h1 className="text-2xl font-bold">
          Wallet not found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Deposit
        </h1>

        <p className="mt-2 text-gray-400">
          Fund your LumaPay wallet using stablecoins.
        </p>
      </div>

      <DepositCard
        address={wallet.depositAddress ?? ""}
        network="Solana"
        supportedTokens={["USDC", "USDT"]}
      />
    </div>
  );
}