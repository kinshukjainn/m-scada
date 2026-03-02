// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        smoothSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        smoothSpin: "smoothSpin 1.2s ease-in-out infinite",
      },
      fontFamily: {
        // Add your custom font here
        worksans: ["var(--font-work-sans)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        dmmono: ["var(--font-dm-mono)", "monospace"],
        arimo: ["var(--font-arimo)", "sans-serif"],
        ptSans: ["var(--font-pt-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
