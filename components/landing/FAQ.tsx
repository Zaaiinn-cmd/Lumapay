"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "What is LumaPay?", answer: "LumaPay is being built to make stablecoin-powered online payments and subscription management easier to navigate." },
  { question: "Which stablecoins are supported?", answer: "The initial product direction supports USDC and USDT on Solana." },
  { question: "Can I use LumaPay for every subscription today?", answer: "Not yet. Payment and card capabilities depend on integrations that are still being developed and validated." },
  { question: "How do I get started?", answer: "Create an account to explore the LumaPay experience as features become available." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto mb-32 mt-32 max-w-4xl px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#a99cff]">FAQ</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">A few things you might <span className="gradient-heading">be wondering.</span></h2>
      </div>
      <div className="mt-12 space-y-3">
        {faqs.map((faq, index) => (
          <div key={faq.question} className="glass-panel overflow-hidden rounded-2xl">
            <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left">
              <span className="font-medium text-white/90">{faq.question}</span>
              <ChevronDown size={19} className={`shrink-0 text-[#bdb2ff] transition-transform duration-300 ${open === index ? "rotate-180" : ""}`} />
            </button>
            {open === index && <div className="px-6 pb-6 text-sm leading-7 text-white/50">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}