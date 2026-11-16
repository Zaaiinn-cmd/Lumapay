"use client";

import { ArrowUpRight, CircleDollarSign, Wallet } from "lucide-react";

export default function FloatingCard() {
  return (
    <div className="relative mx-auto w-full max-w-[470px]">
      <div className="absolute -inset-5 rounded-[38px] bg-[#6557ff]/15 blur-3xl" />
      <div className="glass-panel relative overflow-hidden rounded-[32px] p-6 shadow-[0_35px_100px_rgba(31,22,99,.42)] sm:p-8">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#8274ff]/20 blur-[70px]" />
        <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#b7aaff]/10 blur-[70px]" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9185ff] to-[#5545ed] text-white">
              <Wallet size={21} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">LumaPay wallet</p>
              <p className="mt-0.5 text-xs text-white/40">A clearer view of your digital dollars</p>
            </div>
          </div>
          <span className="rounded-full border border-[#a99cff]/20 bg-[#796aff]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#c5bcff]">Preview</span>
        </div>

        <div className="relative mt-9 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.12] to-white/[0.035] p-6">
          <div className="flex items-center justify-between text-sm text-white/50">
            <span>Available balance</span>
            <CircleDollarSign size={18} className="text-[#bdb2ff]" />
          </div>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">••••••</p>
          <p className="mt-2 text-xs text-white/35">Your balance appears here</p>
          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[.2em] text-white/35">Wallet assets</p>
              <div className="mt-2 flex gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/80">USDC</span>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/80">USDT</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6b5cff] text-white shadow-[0_0_24px_rgba(101,87,255,.45)]">
              <ArrowUpRight size={19} />
            </div>
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
            <p className="text-xs text-white/40">Stablecoin wallet</p>
            <p className="mt-2 text-sm font-semibold text-white">One place to manage</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
            <p className="text-xs text-white/40">Global payments</p>
            <p className="mt-2 text-sm font-semibold text-white">Made more accessible</p>
          </div>
        </div>
      </div>
    </div>
  );
}