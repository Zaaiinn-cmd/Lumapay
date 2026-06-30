"use client";

import { useEffect, useState } from "react";

import BalanceCard from "../components/BalanceCard";
import VirtualCard from "../components/VirtualCard";
import TransactionList from "../components/TransactionList";
import CardOverview from "../components/CardOverview";

type Transaction = {
  name: string;
  amount: number;
};

type Subscription = {
  name: string;
  amount: number;
};

export default function Home() {
  const [balance, setBalance] = useState(1240);
  const [cardIssued, setCardIssued] = useState(false);

  const [amountInput, setAmountInput] = useState("");

  const [transactions, setTransactions] = useState<Transaction[]>([
    { name: "Netflix", amount: -15.99 },
    { name: "ChatGPT", amount: -20 },
    { name: "Deposit", amount: 100 },
  ]);

  const [subscriptions] = useState<Subscription[]>([
    { name: "Netflix", amount: 15.99 },
    { name: "Spotify", amount: 5.99 },
  ]);

  // 💳 Card issuance fee (-$3 once)
  useEffect(() => {
    if (!cardIssued) {
      setBalance((b) => b - 3);
      setCardIssued(true);
    }
  }, [cardIssued]);

  // 🔁 Monthly infra fee (-$1.50 once for MVP simulation)
  useEffect(() => {
    setBalance((b) => b - 1.5);
  }, []);

  // 🔁 Subscription billing engine (simulation loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((b) => {
        const total = subscriptions.reduce(
          (sum, sub) => sum + sub.amount,
          0
        );

        // subscription cost + $0.50 fee per subscription
        return b - total - subscriptions.length * 0.5;
      });
    }, 10000); // every 10 seconds (demo)

    return () => clearInterval(interval);
  }, [subscriptions]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        background: "#0a0a0a",
        color: "white",
        fontFamily: "system-ui",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>LumaPay</h1>
          <p style={{ color: "#888", margin: 0 }}>
            Smart payments & subscription control
          </p>
        </div>

        <button
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid #333",
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add Funds
        </button>
      </div>

      {/* TOP GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          maxWidth: 900,
        }}
      >
        <BalanceCard balance={`$${balance.toFixed(2)}`} />
        <VirtualCard />
      </div>

      {/* BOTTOM GRID */}
      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          maxWidth: 900,
        }}
      >
        {/* TRANSACTIONS */}
        <div>
          <TransactionList
            transactions={transactions}
            onTransaction={(amount) => {
              setBalance((b) => b + amount - 0.5); // fee per transaction
            }}
          />

          {/* ADD TRANSACTION */}
          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <input
              placeholder="Enter amount"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid #333",
                background: "#111",
                color: "white",
                flex: 1,
              }}
            />

            <button
              onClick={() => {
                const value = Number(amountInput);

                if (!isNaN(value) && amountInput !== "") {
                  setTransactions((t) => [
                    { name: "Manual Transaction", amount: value },
                    ...t,
                  ]);

                  setAmountInput("");
                }
              }}
              style={{
                padding: "10px 16px",
                borderRadius: 8,
                border: "1px solid #333",
                background: "#222",
                color: "white",
              }}
            >
              Add
            </button>
          </div>

          {/* SUBSCRIPTIONS */}
          <div style={{ marginTop: 30 }}>
            <h3>Subscriptions</h3>

            <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
              {subscriptions.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 10,
                    border: "1px solid #333",
                    borderRadius: 8,
                  }}
                >
                  <span>{s.name}</span>
                  <span>-${s.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CardOverview />
      </div>
    </div>
  );
}