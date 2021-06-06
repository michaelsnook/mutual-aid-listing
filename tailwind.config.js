const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    // enabled: true,
    content: ['./src/**/*.jsx', './src/**/*.js'],
    options: {
      safelist: [
        'from-yellow-700',
        'to-yellow-500',
        'from-urgent-700',
        'to-urgent-500',
        'from-primary-700',
        'to-primary-500',
        'from-secondary-700',
        'to-secondary-500',
        'from-gray-700',
        'to-gray-700',
      ],
    },
  },
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
    },
    fontFamily: {
      sans: ['Roboto', 'system-ui', 'sans-serif'],
      serif: ['Averia Serif Libre', 'Georgia', 'serif'],
    },
    extend: {
      colors: {
        gray: colors.coolGray,
        primary: colors.emerald,
        secondary: colors.indigo,
        yellow: colors.yellow,
        urgent: colors.rose,
      },
      fontSize: {
        xxs: '0.625rem',
      },
      maxHeight: {
        48: '12rem',
        '80vh': '80vh',
        '90vh': '90vh',
        none: 'none',
      },
    },
  },
  variants: {},
  plugins: [],
}
