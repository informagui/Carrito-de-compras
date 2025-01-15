/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        redhat: ['RedHat', 'sans-serif']
      },

      colors: {
        realRed: 'var(--real-red)',
        realGreen: 'var(--real-green)',
        rose50: 'var(--Rose-50)',
        rose100: 'var(--Rose-100)'
      }
    },
  },
  plugins: [],
}

