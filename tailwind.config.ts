import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0a0a0a",
          panel: "#0f1115",
          border: "rgba(255,255,255,0.08)",
          green: "#00ff41",
          red: "#ff0000",
          ink: "rgba(255,255,255,0.92)",
          muted: "rgba(255,255,255,0.68)",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,255,65,0.22), 0 0 18px rgba(0,255,65,0.12)",
        danger: "0 0 0 1px rgba(255,0,0,0.22), 0 0 18px rgba(255,0,0,0.12)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
