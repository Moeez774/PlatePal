/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        'smxx': '400px',
        'smx': '500px',
        'lgx': '1100px',
        'xxl': '1360px',
        'xxxl': '1365px',
      }
    },
  },
  plugins: [],
}

