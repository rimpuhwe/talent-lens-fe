import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#080D1A",
          secondary: "#0D1427",
          card: "#111827",
          elevated: "#162033",
        },
        accent: {
          emerald: "#10B981",
          teal: "#0EA5A0",
          amber: "#F59E0B",
          rose: "#F43F5E",
          blue: "#3B82F6",
        },
        border: {
          subtle: "#1E2D45",
          default: "#253350",
          strong: "#2E4070",
        },
        text: {
          primary: "#EDF2F7",
          secondary: "#94A3B8",
          muted: "#4A5C74",
          accent: "#10B981",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at top, rgba(16,185,129,0.08) 0%, transparent 60%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(22,32,51,0.9) 0%, rgba(13,20,39,0.95) 100%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(37,51,80,0.8), 0 4px 24px rgba(0,0,0,0.4)",
        "card-hover":
          "0 0 0 1px rgba(16,185,129,0.3), 0 8px 32px rgba(0,0,0,0.5)",
        glow: "0 0 20px rgba(16,185,129,0.15)",
        "glow-strong": "0 0 40px rgba(16,185,129,0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
