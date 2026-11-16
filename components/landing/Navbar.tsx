"use client";

import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#how", label: "How it works" },
    { href: "#security", label: "Security" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#050509]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-2xl font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#9185ff] to-[#5545ed] text-white shadow-[0_0_28px_rgba(101,87,255,.4)]">
            <Sparkles size={19} />
          </span>
          <span>Luma<span className="text-[#a99cff]">Pay</span></span>
        </Link>

        <nav className="hidden items-center gap-9 text-sm text-white/60 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
          <Link href="/dashboard" className="transition hover:text-white">Dashboard</Link>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link href="/sign-in" className="text-sm text-white/65 transition hover:text-white">Sign in</Link>
          <Link href="/sign-up" className="rounded-full border border-white/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#090812] transition hover:bg-[#dcd6ff]">
            Get started
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#090812]/95 px-6 py-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-5 text-sm text-white/75">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
            ))}
            <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            <div className="h-px bg-white/10" />
            <Link href="/sign-in" onClick={() => setOpen(false)}>Sign in</Link>
            <Link href="/sign-up" onClick={() => setOpen(false)} className="rounded-xl bg-[#695bff] py-3 text-center font-semibold text-white">Get started</Link>
          </nav>
        </div>
      )}
    </header>
  );
}