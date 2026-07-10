"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Copy, CheckCircle2 } from "lucide-react";

type Props = {
  address: string;
  network: string;
  supportedTokens: string[];
};

export default function DepositCard({
  address,
  network,
  supportedTokens,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    await navigator.clipboard.writeText(address);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 space-y-8">

      <div>
        <h2 className="text-2xl font-bold">
          Deposit Crypto
        </h2>

        <p className="text-gray-400 mt-2">
          Deposit USDC or USDT on the Solana network.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">

        <div className="rounded-2xl bg-white p-4">
          <QRCode
            value={address}
            size={220}
          />
        </div>

        <div className="text-center">

          <p className="text-gray-400 text-sm">
            Network
          </p>

          <p className="font-semibold">
            {network}
          </p>

        </div>

      </div>

      <div>

        <p className="text-sm text-gray-400 mb-2">
          Deposit Address
        </p>

        <div className="flex items-center justify-between rounded-xl bg-black/30 border border-white/10 p-4 gap-4">

          <span className="font-mono break-all">
            {address}
          </span>

          <button
            onClick={copyAddress}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-black"
          >
            {copied ? (
              <>
                <CheckCircle2 size={18} />
                Copied
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}
          </button>

        </div>

      </div>

      <div>

        <p className="text-sm text-gray-400 mb-2">
          Supported Assets
        </p>

        <div className="flex gap-3">

          {supportedTokens.map((token) => (
            <div
              key={token}
              className="rounded-full bg-green-500/20 border border-green-500/30 px-4 py-2"
            >
              {token}
            </div>
          ))}

        </div>

      </div>

      <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/30 p-4">

        <p className="text-yellow-300 font-medium">
          Important
        </p>

        <p className="mt-2 text-sm text-gray-300">
          Only send USDC or USDT using the Solana network.
          Deposits sent on other networks may be permanently lost.
        </p>

      </div>

    </div>
  );
}