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
      },

      backgroundImage: {
        'waffle-mobile': "url('./assets/images/image-waffle-mobile.jpg')",
        'cremebrulee-mobile': "url('./assets/images/image-creme-brulee-mobile.jpg')",
        'macaron-mobile': "url('./assets/images/image-macaron-mobile.jpg')",
        'tiramisu-mobile': "url('./assets/images/image-tiramisu-mobile.jpg')",
        'baklava-mobile': "url('./assets/images/image-baklava-mobile.jpg')",
        'lemon-pie-mobile': "url('./assets/images/image-meringue-mobile.jpg')",
        'red-velvet-mobile': "url('./assets/images/image-cake-mobile.jpg')",
        'brownie-mobile': "url('./assets/images/image-brownie-mobile.jpg')",
        'panna-cotta-mobile': "url('./assets/images/image-panna-cotta-mobile.jpg')",

        'waffle-tablet': "url('./assets/images/image-waffle-tablet.jpg')",
        'cremebrulee-tablet': "url('./assets/images/image-creme-brulee-tablet.jpg')",
        'macaron-tablet': "url('./assets/images/image-macaron-tablet.jpg')",
        'tiramisu-tablet': "url('./assets/images/image-tiramisu-tablet.jpg')",
        'baklava-tablet': "url('./assets/images/image-baklava-tablet.jpg')",
        'lemon-pie-tablet': "url('./assets/images/image-meringue-tablet.jpg')",
        'red-velvet-tablet': "url('./assets/images/image-cake-tablet.jpg')",
        'brownie-tablet': "url('./assets/images/image-brownie-tablet.jpg')",
        'panna-cotta-tablet': "url('./assets/images/image-panna-cotta-tablet.jpg')",

        'waffle-desktop': "url('./assets/images/image-waffle-desktop.jpg')",
        'cremebrulee-desktop': "url('./assets/images/image-creme-brulee-desktop.jpg')",
        'macaron-desktop': "url('./assets/images/image-macaron-desktop.jpg')",
        'tiramisu-desktop': "url('./assets/images/image-tiramisu-desktop.jpg')",
        'baklava-desktop': "url('./assets/images/image-baklava-desktop.jpg')",
        'lemon-pie-desktop': "url('./assets/images/image-meringue-desktop.jpg')",
        'red-velvet-desktop': "url('./assets/images/image-cake-desktop.jpg')",
        'brownie-desktop': "url('./assets/images/image-brownie-desktop.jpg')",
        'panna-cotta-desktop': "url('./assets/images/image-panna-cotta-desktop.jpg')",
      }
    },
  },
  plugins: [],
}

