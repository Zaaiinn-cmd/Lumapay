"use client";

import { CreditCard, Wifi } from "lucide-react";

export default function FloatingCard() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Emerald Glow */}
      <div className="absolute h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px]" />

      {/* Card */}
      <div className="group relative h-[290px] w-[470px] overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-[#232b27] via-[#1b2520] to-[#111] p-8 shadow-[0_25px_80px_rgba(16,185,129,0.18)] transition-all duration-500 hover:-translate-y-2 hover:rotate-1">

        {/* Animated Shine */}
        <div className="absolute -left-32 top-0 h-full w-24 rotate-12 bg-white/10 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />

        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] bg-[size:12px_12px]" />

        {/* Header */}
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              LumaPay
            </h2>

            <p className="text-sm text-gray-400">
              Virtual USD Card
            </p>
          </div>

          <Wifi
            className="text-white/80 rotate-90"
            size={28}
          />
        </div>

        {/* Chip */}
        <div className="relative mt-10 h-16 w-20 rounded-xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 shadow-lg" />

        {/* Card Number */}
        <div className="relative mt-12 flex items-center justify-between font-mono text-3xl tracking-[6px]">
          <span>4829</span>
          <span>••••</span>
          <span>••••</span>
          <span>9182</span>
        </div>

        {/* Footer */}
        <div className="relative mt-10 flex items-end justify-between">

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Card Holder
            </p>

            <p className="mt-1 text-lg font-semibold">
              LumaPay User
            </p>
          </div>

          <div className="flex items-center gap-2">
            <CreditCard className="text-white/70" />

            <span className="text-xl font-bold italic">
              VISA
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}