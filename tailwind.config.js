/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'recipe-green': 'rgb(34, 197, 94)',
        'recipe-red': '#f83e55',
        'recipe-red-dark': 'rgb(185 28 28)',
        'recipe-gray': '#18171C',
        'recipe-gray-dark': '#111015',
        'recipe-gray-light': '#22222A',
        'recipe-gray-lighter': '#32323A',
      },
    },
  },
  plugins: [],
};
