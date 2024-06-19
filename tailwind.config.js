import { addDynamicIconSelectors } from '@iconify/tailwind'
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,vue}'],
  theme: { extend: {} },
  darkMode: 'class',
  plugins: [
    daisyui,
    addDynamicIconSelectors(),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-center': { display: 'flex', alignItems: 'center' }
      })
    })
  ],

  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...themes.winter,
          primary: '#ec60ce'
        }
      },
      {
        dark: {
          ...themes.dark,
          primary: '#e86fbd',
          neutral: '#1c212b',
          'neutral-content': '#B2CCD6',
          'base-100': '#2A303C',
          'base-200': '#242933',
          'base-300': '#20252E',
          'base-content': '#B2CCD6'
        }
      }
    ],
    darkTheme: 'dark',
    utils: true,
    themeRoot: ':root',
    logs: false
  }
}
