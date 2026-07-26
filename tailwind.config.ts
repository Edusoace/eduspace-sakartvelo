import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Tbilisi-night palette: deep indigo evening sky + warm hospitality gold
        night: {
          950: "#0A0F1F",
          900: "#0F1730",
          800: "#161F42",
          700: "#202B58",
        },
        gold: {
          400: "#F5B95C",
          500: "#F2A93B",
          600: "#D98E22",
        },
        teal: {
          300: "#7DEDE0",
          400: "#3FD9C7",
          500: "#2DD4BF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(10, 15, 31, 0.37)",
        "glass-hover": "0 12px 40px 0 rgba(10, 15, 31, 0.5)",
      },
      backgroundImage: {
        "night-gradient":
          "radial-gradient(ellipse 120% 80% at 50% -10%, #202B58 0%, #0F1730 45%, #0A0F1F 100%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.55)" },
          "50%": { boxShadow: "0 0 0 12px rgba(37, 211, 102, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
