import { addDynamicIconSelectors } from '@iconify/tailwind'
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,vue}'],
  theme: { extend: {} },
  darkMode: 'class',
  plugins: [daisyui, addDynamicIconSelectors()],

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
    darkTheme: 'light',
    utils: true,
    themeRoot: ':root',
    logs: false
  }
}
