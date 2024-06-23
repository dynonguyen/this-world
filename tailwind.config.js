import phIcons from '@iconify-json/ph/icons.json'
import uilIcons from '@iconify-json/uil/icons.json'
import { addIconSelectors } from '@iconify/tailwind'
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'
import plugin from 'tailwindcss/plugin'

const safelist = (() => {
  const s = new Set()

  ;['primary', 'orange-500'].forEach(c => {
    ;[`bg-${c}/15`, `border-${c}/25`, `border-${c}/50`, `text-${c}`].forEach(c => s.add(c))
  })

  return Array.from(s)
})()

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,vue}'],
  darkMode: 'class',
  safelist,

  theme: {
    extend: {
      colors: { 'neutral-divider': 'rgb(var(--neutral-divider) / <alpha-value>)' },
      screens: { sm: '576px' }
    }
  },

  plugins: [
    daisyui,
    addIconSelectors({
      prefixes: [
        { prefix: 'ph', source: phIcons },
        { prefix: 'uil', source: uilIcons }
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
    themes: [
      {
        light: {
          ...themes.winter,
          primary: '#ec60ce',
          'neutral-content': '#737373',
          '--neutral-divider': '229 231 235' // gray.200
        }
      },
      {
        dark: {
          ...themes.dark,
          primary: '#e86fbd',
          neutral: '#1c212b',
          'neutral-content': '#d4d4d4',
          'base-100': '#2A303C',
          'base-200': '#242933',
          'base-300': '#20252E',
          'base-content': '#B2CCD6',

          '--neutral-divider': '75 85 99' // gray.600
        }
      }
    ],
    darkTheme: 'dark',
    themeRoot: ':root',
    utils: true,
    logs: false
  }
}
