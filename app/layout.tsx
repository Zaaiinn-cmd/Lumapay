import "./globals.css";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "LumaPay",
  description: "Stablecoin-powered subscription payments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-black text-white">

          {/* NAVBAR */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
            <Link href="/" className="font-semibold">
              LumaPay
            </Link>

            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>

              <Link
                href="/dashboard"
                className="hover:text-white transition"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* PAGE CONTENT */}
          {children}

        </body>
      </html>
    </ClerkProvider>
  );
}