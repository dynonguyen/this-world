import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  envPrefix: 'VITE_',
  resolve: { alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }] },
  server: { open: true, port: 8888 }
})
