import phIcons from '@iconify-json/ph/icons.json'
import uilIcons from '@iconify-json/uil/icons.json'
import { addIconSelectors } from '@iconify/tailwind'
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'
import plugin from 'tailwindcss/plugin'
import additionalIcons from './icons.json'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,vue}'],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        'neutral-divider': 'rgb(var(--neutral-divider) / <alpha-value>)',
        'neutral-main': 'rgb(var(--neutral-main) / <alpha-value>)'
      },
      screens: { sm: '576px' }
    }
  },

  plugins: [
    daisyui,
    addIconSelectors({
      prefixes: [
        { prefix: 'ph', source: phIcons },
        { prefix: 'uil', source: uilIcons },
        { prefix: 'other', source: additionalIcons }
      ],
      maskSelector: '.icon',
      iconSelector: '.{prefix}-{name}'
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-v-center': { display: 'flex', alignItems: 'center' },
        '.flex-center': { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        '.base-border': { '@apply border border-neutral-divider border-solid': {} },
        '.base-border-bottom': { '@apply border-b border-neutral-divider border-solid': {} }
      })
    })
  ],

  daisyui: {
    styled: true,
    darkTheme: 'dark',
    themeRoot: ':root',
    utils: true,
    logs: false,
    themes: [
      {
        light: {
          ...themes.winter,
          error: '#FF5962',
          primary: '#ec60ce',

          '--neutral-divider': '229 231 235', // gray.200
          '--neutral-main': '148 163 184' // gray.400
        }
      },
      {
        dark: {
          ...themes.dark,
          primary: '#e86fbd',
          neutral: '#1c212b',
          'neutral-500': '#f0000',
          'neutral-content': '#d4d4d4',
          'base-100': '#2A303C',
          'base-200': '#242933',
          'base-300': '#20252E',
          'base-content': '#B2CCD6',

          '--neutral-divider': '75 85 99', // gray.600
          '--neutral-main': '156 163 175' // gray.400
        }
      }
    ]
  }
}
