/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');
const lineClamp = require('@tailwindcss/line-clamp');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
      'title-24': [
        '24px', {
          lineHeight: '32px',
          letterSpacing: '-0.015em',
          fontWeight: '700',
        },
      ],
      'title-20': [
        '20px', {
          lineHeight: '24px',
          letterSpacing: '-0.015em',
          fontWeight: '600',
        },
      ],
      'body-20': [
        '20px', {
          lineHeight: '28px',
          letterSpacing: '-0.015em',
        },
      ],
      'caption-20': [
        '20px', {
          lineHeight: '24px',
          letterSpacing: '-0.015em',
        },
      ],
      'caption-18': [
        '18px', {
          lineHeight: '24px',
          letterSpacing: '-0.015em',
        },
      ],
      'caption-16': [
        '16px', {
          lineHeight: '20px',
          letterSpacing: '0',
        },
      ],
    },
    colors: {
      'surface-1': 'var(--surface-1)',
      'surface-2': 'var(--surface-2)',
      'surface-3': 'var(--surface-3)',
      'surface-overlay': 'var(--surface-overlay)',
      'on-surface': 'var(--on-surface)',
      'on-surface-dim': 'var(--on-surface-dim)',
      'on-surface-dimest': 'var(--on-surface-dimest)',
      'border': 'var(--border)',
      'primary': 'var(--primary)',
      'primary-overlay': 'var(--primary-overlay)',
      'on-primary': 'var(--on-primary)',
      'secondary': 'var(--secondary)',
      'secondary-overlay': 'var(--secondary-overlay)',
      'on-secondary': 'var(--on-secondary)',
      'current': colors.current,
      'transparent': colors.transparent,
      'inherit': colors.inherit,
    },
    borderRadius: {
      'none': '0',
      '2xs': '2px',
      'xs': '4px',
      'sm': '6px',
      'DEFAULT': '8px',
      'md': '12px',
      'lg': '16px',
      'xl': '24px',
      '2xl': '32px',
      'full': '9999px',
    },
  },
};
