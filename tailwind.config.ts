import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gameSwipe: {
          left: "#fcbab6",
          neutral: "#fafafa",
          right: "#D4E0B2",
        },
      },
      boxShadow: {
        card: "0 0px 15px -2px rgb(0 0 0 / 0.2), 0 0 3px -2px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
