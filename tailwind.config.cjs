/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "rose-gold": "#b76e79",
        "champagne": "#f7e7ce",
        "deep-pink": "#ff5e78",
        "lux-black": "#0a0a0a",
        "glass": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Inter"', "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
