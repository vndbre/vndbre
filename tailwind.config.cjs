import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontSize: {
      xs: '1rem',
      sm: '1.125rem',
      base: '1.25rem',
      lg: '1.5rem',
    },
    colors: {
      orange: colors.orange,
      gray: colors.neutral,
      white: colors.white,
      black: colors.black,
      red: colors.red,
      green: colors.green,
    }
  },
  plugins: [],
};
