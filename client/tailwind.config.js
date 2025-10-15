/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1F2933",
          900: "#0F1724",
          700: "#374151",
          300: "#E6E9EE",
        },
        accent: {
          DEFAULT: "#C0C6CC", // plateado metálico sutil
          700: "#9AA0A6",
          300: "#E6E9EE",
        },
        muted: "#94A3B8",
      },
      fontFamily: {
        Kanit: ["Kanit", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
