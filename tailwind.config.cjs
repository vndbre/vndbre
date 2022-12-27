/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');
const lineClamp = require('@tailwindcss/line-clamp');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [lineClamp],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
    fontSize: {
      xs: '1rem',
      sm: '1.125rem',
      base: '1.25rem',
      lg: '1.5rem',
      xl: '1.75rem',
    },
    colors: {
      gray: colors.neutral,
      white: colors.white,
      black: colors.black,
      red: colors.red,
      green: colors.green,
      surface: colors.neutral,
      primary: colors.orange,
      current: colors.current,
      transparent: colors.transparent,
    },
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
    large: '12px',
  },
};
