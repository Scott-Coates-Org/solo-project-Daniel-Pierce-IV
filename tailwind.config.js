/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'recipe-gray-light': '#22222A',
        'recipe-gray-lighter': '#32323A',
      },
    },
  },
  plugins: [],
};
