"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSubscriptionPage() {
  const router = useRouter();

  const [type, setType] = useState("monthly");
  const [loading, setLoading] = useState(false);

  async function createSubscription() {
    setLoading(true);

    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create subscription.");
        return;
      }

      router.push("/dashboard/subscriptions");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">
        New Subscription
      </h1>

      <div className="space-y-3">
        <label className="block font-medium">
          Subscription Type
        </label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 p-3"
        >
          <option value="monthly">
            Monthly ($1.50)
          </option>

          <option value="card_issuance">
            Card Issuance ($3.00)
          </option>
        </select>
      </div>

      <button
        onClick={createSubscription}
        disabled={loading}
        className="rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Subscribe"}
      </button>
    </div>
  );
}