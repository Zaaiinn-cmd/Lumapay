"use client";

import { useState } from "react";
import { Wifi, Eye, EyeOff, Copy } from "lucide-react";

type Card = {
  id: string;
  holderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  brand: string;
  status: string;
  frozen: boolean;
};

export default function VirtualCard({
  card,
}: {
  card: Card;
}) {
  const [data, setData] = useState(card);
  const [showNumber, setShowNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggleFreeze() {
    setLoading(true);

    const res = await fetch("/api/cards", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
      }),
    });

    const updated = await res.json();

    setData(updated);
    setLoading(false);
  }

  async function copyNumber() {
    await navigator.clipboard.writeText(data.cardNumber);
    alert("Card number copied!");
  }

  const masked =
    data.cardNumber.slice(0, 4) +
    " •••• •••• " +
    data.cardNumber.slice(-4);

  return (
    <div className="space-y-6">

      {/* Premium Card */}
      <div className="relative overflow-hidden max-w-md rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 p-8 text-white shadow-2xl">

        {/* Shine */}
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10">

          <div className="flex justify-between items-start">

            <div>
              <h2 className="text-2xl font-bold tracking-wide">
                LumaPay
              </h2>

              <p className="text-xs opacity-80 mt-1">
                Virtual USD Card
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <Wifi
                size={22}
                className="rotate-90"
              />

              <span className="font-bold tracking-widest">
                {data.brand}
              </span>
            </div>

          </div>

          {/* Chip */}
          <div className="mt-8 mb-6 h-12 w-16 rounded-lg border border-yellow-300 bg-gradient-to-br from-yellow-200 to-yellow-500 shadow-inner" />

          {/* Card Number */}
          <div className="flex items-center justify-between">

            <p className="text-2xl tracking-[0.25em] font-mono">
              {showNumber ? data.cardNumber : masked}
            </p>

            <button onClick={() => setShowNumber(!showNumber)}>
              {showNumber ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <div className="mt-10 flex justify-between">

            <div>
              <p className="text-xs opacity-70">
                CARD HOLDER
              </p>

              <p className="font-semibold">
                {data.holderName}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-70">
                EXPIRES
              </p>

              <p>{data.expiry}</p>
            </div>

          </div>

        </div>

      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">

        <button
          onClick={copyNumber}
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-black"
        >
          <Copy size={16} />
          Copy Number
        </button>

        <button
          onClick={toggleFreeze}
          disabled={loading}
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          {loading
            ? "Updating..."
            : data.frozen
            ? "Unfreeze Card"
            : "Freeze Card"}
        </button>

      </div>

      {/* Card Details */}
      <div className="max-w-md rounded-xl border border-white/10 bg-white/5 p-6">

        <p>
          <strong>Status:</strong>{" "}
          {data.status}
        </p>

        <p className="mt-3">
          <strong>Frozen:</strong>{" "}
          {data.frozen ? "Yes ❄️" : "No ✅"}
        </p>

        <div className="mt-3 flex items-center gap-3">

          <strong>CVV:</strong>

          <span>
            {showCVV ? data.cvv : "***"}
          </span>

          <button
            onClick={() => setShowCVV(!showCVV)}
          >
            {showCVV ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

      </div>

    </div>
  );
}