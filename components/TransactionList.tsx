type Transaction = {
  name: string;
  amount: number;
};

export default function TransactionList({
  transactions,
  onTransaction,
}: {
  transactions: Transaction[];
  onTransaction?: (amount: number) => void;
}) {
  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>Transactions</h3>

      <div style={{ display: "grid", gap: 10 }}>
        {transactions.map((t, i) => (
          <div
            key={i}
            onClick={() => onTransaction?.(t.amount)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
              border: "1px solid #333",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <span>{t.name}</span>
            <span>{t.amount > 0 ? `+$${t.amount}` : `-$${Math.abs(t.amount)}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}