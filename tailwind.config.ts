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
        "primary-color": "#2F9E3B",
        "accent-green": "#C0E1C2",
        "add-minus": "#807F7F",
        "custom-white": "#FFFEFE",
        "accent-gray": "#D9D9D9",
        "main-background": "#ECEAEA",
        "buttons-icon": "#F3F3F3",
        "letters-color": "#06162E",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
