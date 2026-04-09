import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        calendar: "0 20px 60px -10px rgba(0,0,0,0.3), 0 4px 20px -4px rgba(0,0,0,0.2)",
        "calendar-dark": "0 20px 60px -10px rgba(0,0,0,0.6), 0 4px 20px -4px rgba(0,0,0,0.4)",
        cell: "0 2px 8px rgba(0,0,0,0.08)",
      },
      animation: {
        "flip-in": "flipIn 0.4s ease-out",
        "flip-out": "flipOut 0.4s ease-in",
        "fade-up": "fadeUp 0.3s ease-out",
      },
      keyframes: {
        flipIn: {
          "0%": { transform: "rotateX(-90deg)", opacity: "0" },
          "100%": { transform: "rotateX(0deg)", opacity: "1" },
        },
        flipOut: {
          "0%": { transform: "rotateX(0deg)", opacity: "1" },
          "100%": { transform: "rotateX(90deg)", opacity: "0" },
        },
        fadeUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
