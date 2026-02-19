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
      fontFamily: {
        // Add your custom font here
        worksans: ["var(--font-work-sans)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        dmmono: ["var(--font-dm-mono)", "monospace"],
        arimo: ["var(--font-arimo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
