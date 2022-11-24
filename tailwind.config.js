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
      'primary-light-hover': '#a4a4a4',
      'gray-dark': '#171717',
      'gray-dark-hover': '#121212',
      'main-gray': '#B7B7B7',
      'gray-bg': '#DADADA',
      'light-gray-text': '#696969',
      black: '#000',
      white: '#fff'
    },
    extend: {
      keyframes: {
        slideIn: {
          '0%': {
            transform: 'translateX(200%)',
            visibility: 'hidden',
            opacity: '0'
          },
          '1%': { visibility: 'visible', opacity: '0' },
          '100%': {
            transform: 'translateX(0)',
            visibility: 'visible',
            opacity: '1'
          }
        },
        slideOut: {
          '0%': {
            transform: 'translateX(0)',
            visibility: 'visible',
            opacity: '1'
          },
          '99%': { visibility: 'visible', opacity: 0 },
          '100%': {
            transform: 'translateX(200%)',
            visibility: 'hidden',
            opacity: '0'
          }
        }
      },
      animation: {
        slideIn: 'slideIn 0.3s linear',
        slideOut: 'slideOut 0.3s linear'
      }
    }
  },
  plugins: []
}
