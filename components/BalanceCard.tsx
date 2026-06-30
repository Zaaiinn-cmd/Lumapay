export default function BalanceCard({ balance }: { balance: string }) {
  return (
    <div style={{
      padding: 20,
      borderRadius: 16,
      background: "linear-gradient(135deg, #111, #1a1a1a)",
      border: "1px solid #222"
    }}>
      <p style={{ color: "#888" }}>Available Balance</p>
      <h2 style={{ fontSize: 36, margin: "10px 0" }}>{balance}</h2>
      <p style={{ color: "#555" }}>USD Wallet • Instant Settlement</p>
    </div>
  );
}