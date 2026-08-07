"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          Luma<span className="text-emerald-400">Pay</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">

          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#how" className="hover:text-white transition">
            How it Works
          </a>

          <a href="#security" className="hover:text-white transition">
            Security
          </a>

          <Link
            href="/dashboard"
            className="hover:text-white transition"
          >
            Dashboard
          </Link>

        </nav>

        {/* Desktop Buttons */}

        <div className="hidden md:flex items-center gap-4">

          <Link
            href="/sign-in"
            className="text-gray-300 hover:text-white transition"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="rounded-full bg-white px-5 py-2 font-medium text-black transition hover:scale-105"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">

          <div className="flex flex-col gap-5 p-6">

            <a href="#features">Features</a>

            <a href="#how">How it Works</a>

            <a href="#security">Security</a>

            <Link href="/dashboard">
              Dashboard
            </Link>

            <hr className="border-white/10" />

            <Link href="/sign-in">
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="rounded-xl bg-white py-3 text-center font-medium text-black"
            >
              Get Started
            </Link>

          </div>

        </div>
      )}
    </header>
  );
}