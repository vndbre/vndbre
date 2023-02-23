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
      'xs': '1rem',
      'sm': '1.125rem',
      'base': '1.25rem',
      'lg': '1.5rem',
      'xl': '1.75rem',
      'title-1': [
        '1.5rem', {
          lineHeight: '2rem',
          letterSpacing: '-0.025em',
          fontWeight: '700',
        },
      ],
      'caption-20': [
        '20px', {
          lineHeight: '24px',
          letterSpacing: '-0.025em',
        },
      ],
      'caption-18': [
        '18px', {
          lineHeight: '24px',
          letterSpacing: '0',
        },
      ],
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
      inherit: colors.inherit,
    },
    borderRadius: {
      'none': '0',
      '2xs': '2px',
      'xs': '4px',
      'sm': '6px',
      'DEFAULT': '8px',
      'md': '12px',
      'lg': '16px',
      'xl': '20px',
      'full': '9999px',
    },
  },
};
