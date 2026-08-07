"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is LumaPay?",
    answer:
      "LumaPay is a stablecoin-powered platform that lets you fund a wallet, generate virtual cards, and manage recurring online payments.",
  },
  {
    question: "Which stablecoins are supported?",
    answer:
      "The initial release focuses on USDC and USDT on Solana, with support for additional assets planned.",
  },
  {
    question: "Are my funds secure?",
    answer:
      "Authentication is handled through Clerk, while wallet and transaction data are securely managed on our backend.",
  },
  {
    question: "Can I cancel subscriptions anytime?",
    answer:
      "Yes. You can pause or cancel supported subscriptions directly from your dashboard.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto mt-32 max-w-5xl px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
          FAQ
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          Frequently asked questions
        </h2>
      </div>

      <div className="mt-14 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="rounded-2xl border border-white/10 bg-white/[0.03]"
          >
            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-semibold">
                {faq.question}
              </span>

              <ChevronDown
                className={`transition-transform duration-300 ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === index && (
              <div className="px-6 pb-6 text-gray-400 leading-7">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}