import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue2()],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
