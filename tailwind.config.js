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
      transparent: 'transparent',
      'primary-dark': '#FFD601',
      'primary-light': '#E7E7E7',
      'primary-light-hover': '#a4a4a4',
      'gray-dark': '#171717',
      'gray-dark-hover': '#121212',
      'main-gray': '#B7B7B7',
      'gray-bg': '#DADADA',
      'gray-text-hover': '#8c8c8c',
      'gray-text-hover-dark': '#525252',
      'light-gray-text': '#696969',
      black: '#000',
      white: '#fff',
      yellow: '#FFB800',
      'light-yellow': '#FFD601',
      'yellow-hover': '#FFDD85',
      green: '#1DCC00',
      red: '#FF0000'
    },
    extend: {}
  },
  plugins: []
}
