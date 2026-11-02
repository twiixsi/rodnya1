import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F1E8",
        milk: "#FFFDF9",
        brand: {
          green: "#34785D",
          darkGreen: "#245B49",
          coral: "#E58A7D",
          coralDark: "#D56E5F",
          beige: "#F0E4D7",
          lightGreen: "#E5EFE3",
          lightBlue: "#E5EFF8",
          lightLilac: "#EEE8F5",
          text: "#283D38",
          muted: "#6B7C77",
          border: "#E7DC CE".replace(/\s+/g, ""),
        },
        card: {
          peach: "#FDF0EC",
          mint: "#EAF4ED",
          blue: "#EBF3FB",
          lilac: "#F2EFF9",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        script: ["Caveat", "Marck Script", "cursive"],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(40, 61, 56, 0.05)',
        'card': '0 10px 30px -5px rgba(40, 61, 56, 0.07)',
        'float': '0 20px 40px -10px rgba(40, 61, 56, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;
