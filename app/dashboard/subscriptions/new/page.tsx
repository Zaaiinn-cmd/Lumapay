"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSubscriptionPage() {
  const router = useRouter();

  const [type, setType] = useState("monthly");
  const [loading, setLoading] = useState(false);

  async function createSubscription() {
    setLoading(true);

    // Get wallet
    const wallet = await fetch("/api/wallet").then((r) => r.json());

    const res = await fetch("/api/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletId: wallet.id,
        type,
      }),
    });

    if (res.ok) {
      router.push("/dashboard/subscriptions");
      router.refresh();
    } else {
      const error = await res.json();
      alert(error.error);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">
        New Subscription
      </h1>

      <div className="space-y-3">
        <label>Subscription Type</label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-lg bg-white/5 border border-white/10 p-3"
        >
          <option value="monthly">
            Monthly ($1.50)
          </option>

          <option value="card_issuance">
            Card Issuance ($3)
          </option>
        </select>
      </div>

      <button
        onClick={createSubscription}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-white text-black font-medium"
      >
        {loading ? "Creating..." : "Subscribe"}
      </button>
    </div>
  );
}