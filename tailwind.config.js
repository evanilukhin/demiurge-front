const colors = require('tailwindcss/colors')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  theme: {
    colors: {
      primary: colors.teal,
      secondary: colors.yellow,
      neutral: colors.gray,
    },
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ]
}
