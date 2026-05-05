/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#3d4838',
        ivory: '#f7f3eb',
        'gold-soft': '#c6a463',
        'stone-panel': '#5e6853',
      },
      boxShadow: {
        premium: '0 24px 60px rgba(91, 78, 45, 0.14)',
      },
    },
  },
  plugins: [],
};
