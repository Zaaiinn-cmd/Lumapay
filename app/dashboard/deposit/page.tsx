import DepositCard from "@/components/DepositCard";
import { getCurrentWallet } from "@/lib/currentUser";

export default async function DepositPage() {
  const wallet = await getCurrentWallet();

  const deposit = {
    address: "7xKXy1J6Zr2hF8V4vP9nLmQ3aBcDeFgHiJkLmNoPqRs",
    network: "Solana",
    supportedTokens: ["USDC", "USDT"],
  };

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
        address={deposit.address}
        network={deposit.network}
        supportedTokens={deposit.supportedTokens}
      />
    </div>
  );
}