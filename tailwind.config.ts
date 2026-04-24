import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          green: "#22C55E",
          ink: "#0F172A",
          paper: "#F8FAFC",
        },
      },
      boxShadow: {
        card: "0 20px 45px rgba(15, 23, 42, 0.10)",
        paper: "0 18px 50px rgba(37, 99, 235, 0.10)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(37,99,235,0.16), transparent 38%), linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "100% 100%, 38px 38px, 38px 38px",
      },
    },
  },
  plugins: [typography],
};

export default config;
