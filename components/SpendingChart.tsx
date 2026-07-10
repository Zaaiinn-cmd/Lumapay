"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    date: string;
    amount: number;
  }[];
}

export default function SpendingChart({ data }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-semibold mb-6">
        Spending Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8b5cf6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}