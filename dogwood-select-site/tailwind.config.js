/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#0D0D0D',
        ivory: '#F5F5F0',
        dogwoodGreen: '#2C5F2D',
        mutedGold: '#B08D57',
        stoneGray: '#E2E1E0',
      },
    },
  },
  plugins: [],
};