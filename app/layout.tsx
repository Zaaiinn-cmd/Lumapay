import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

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
        <body
          className={`${geist.className} bg-[#030303] text-white antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}