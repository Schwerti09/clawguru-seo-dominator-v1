import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "ClawGuru — OpenClaw Security Hardening",
  description: "Institutional-grade security runbooks for OpenClaw operators. Reduce exposure. Mitigate RCE. Harden fast.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-cyber-bg text-cyber-ink">{children}</body>
    </html>
  );
}
