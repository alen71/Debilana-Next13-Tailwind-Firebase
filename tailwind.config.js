/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    colors: {
      'primary-dark': '#FFD601',
      'primary-light': '#E7E7E7',
      'primary-light-hover': '#c7c7c7',
      'gray-dark': '#171717',
      'main-gray': '#B7B7B7',
      'gray-bg': '#DADADA',
      black: '#000',
      white: '#fff'
    },
    extend: {}
  },
  plugins: []
}
