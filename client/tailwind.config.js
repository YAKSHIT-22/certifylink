/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: "300px",
      // => @media (min-width: 300px) { ... }

      xs: "390px",
      // => @media (min-width: 390px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        back: "#191b20",
        primary: "#f07900",
      },
      fontFamily: {
        popp: ["Urbanist", "sans-serif"],
      },
      width: {
        128: "32rem",
      },
      height: {
        128: "32rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out forwards",
        marquee: "marquee 15s linear infinite",
        marquee2: "marquee2 15s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    nextui(),
  ],
};
