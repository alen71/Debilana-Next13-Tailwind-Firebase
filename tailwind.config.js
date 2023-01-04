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
      primary: '#FF891D',
      'primary-light': '#FFC188',
      gray: '#A0A0A0',
      black: '#000',
      white: '#fff',
      'gray-bg': '#DADADA',
      'gray-dark': '#171717',
      'primary-light-hover': '#a4a4a4',

      'gray-dark-hover': '#121212',
      'gray-text-hover-dark': '#525252',
      'main-gray': '#B7B7B7',
      'light-gray-text': '#696969',
      yellow: '#FFB800',
      'light-yellow': '#FFD601',
      'yellow-hover': '#FFDD85',
      green: '#1DCC00',
      red: '#FF0000'
    },
    extend: {
      boxShadow: {
        'container-shadow': '0px 0px 10px rgba(0,0,0,0.3)'
      }
    }
  },
  plugins: []
}
