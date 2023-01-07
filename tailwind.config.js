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
      green: '#1DCC00',
      red: '#FF0000'
    },
    extend: {
      boxShadow: {
        'container-shadow': '0px 0px 10px rgba(0,0,0,0.3)'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' }
        }
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
