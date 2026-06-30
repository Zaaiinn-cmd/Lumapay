export default function CardOverview() {
  return (
    <div
      style={{
        marginTop: 20,
        padding: 20,
        border: "1px solid #333",
        borderRadius: 12,
        color: "white",
      }}
    >
      <h3>Card & Fee Overview</h3>

      <ul style={{ marginTop: 10, lineHeight: "1.8" }}>
        <li>💳 Card Issuance Fee: $3.00 (one-time)</li>
        <li>🔁 Monthly Card Infra Fee: $1.50</li>
        <li>💸 Transaction Fee: $0.50 per payment</li>
      </ul>
    </div>
  );
}