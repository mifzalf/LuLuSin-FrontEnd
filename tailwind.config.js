/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B2B44',
          light: '#2D4562',
        },
        secondary: {
          DEFAULT: '#F5F0EB',
        },
      },
    },
  },
  plugins: [],
} 