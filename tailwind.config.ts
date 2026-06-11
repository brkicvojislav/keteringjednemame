import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        wine: "#6b2737",
        cream: "#fef3e2",
        forest: "#2c4a35",
        charcoal: "#1a1a1a",
        gold: "#d4a853",
      },
      fontFamily: {
        display: ["var(--font-caveat)", "cursive"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
    },
  },
};

export default config;
