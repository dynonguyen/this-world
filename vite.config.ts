import 'dotenv/config'

import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'

const BASE_URL = process.env.VITE_BASE_URL || ''

const injectData = {
  baseUrl: BASE_URL,
  appName: 'This world',
  favicon: BASE_URL + '/img/logo.png'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ViteEjsPlugin(injectData)],
  base: BASE_URL,
  envPrefix: 'VITE_',
  resolve: { alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }] },
  server: { open: true, port: 8888 }
})
