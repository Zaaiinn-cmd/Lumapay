"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface Props { data: { date: string; amount: number }[] }

export default function SpendingChart({ data }: Props) {
  return (
    <div className="h-full rounded-2xl border border-white/[0.07] bg-[#100e18] p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between"><div><h2 className="font-semibold">Spending trend</h2><p className="mt-1 text-xs text-white/35">Your recent payment activity</p></div><span className="rounded-lg bg-violet-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300">USD</span></div>
      <div className="h-64">
        {data.length === 0 ? <div className="grid h-full place-items-center rounded-xl border border-dashed border-white/[0.08] text-center"><div><p className="text-sm text-white/55">No spending data yet</p><p className="mt-1 text-xs text-white/30">Your payment trend will appear here.</p></div></div> : <ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}><CartesianGrid stroke="#ffffff0d" strokeDasharray="4 5" vertical={false} /><XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#777184", fontSize: 11 }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#777184", fontSize: 11 }} tickFormatter={(value) => "$" + value} /><Tooltip contentStyle={{ background: "#171321", border: "1px solid #ffffff18", borderRadius: 12, color: "#fff" }} labelStyle={{ color: "#a99fba" }} formatter={(value) => [`$${Number(value).toFixed(2)}`, "Spent"]} /><Line type="monotone" dataKey="amount" stroke="#a78bfa" strokeWidth={2.5} dot={{ r: 3, fill: "#a78bfa", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#c4b5fd", stroke: "#171321", strokeWidth: 3 }} /></LineChart></ResponsiveContainer>}
      </div>
    </div>
  );
}