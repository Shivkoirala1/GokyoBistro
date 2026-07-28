/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  extend: {
    colors: {
      coffee: {
        DEFAULT: "#4B2E1E",
        light: "#7B4B2A",
        cream: "#F5E9DA",
      },
      gold: "#C9A24B",
    },
    fontFamily: {
      display: ["Playfair Display", "serif"],
      body: ["Inter", "sans-serif"],
    },
  },
},
  plugins: [],
};
