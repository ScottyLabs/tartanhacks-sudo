/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "th-primary": "#6e9afd",
        "th-secondary": "#4200ff",
        "th-highlight": "#fea801",
        "th-bg": "#f7f1e2",
      },
    },
  },
  plugins: [],
};
