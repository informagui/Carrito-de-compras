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
        realGreen: 'var(--real-green)'
      }
    },
  },
  plugins: [],
}

