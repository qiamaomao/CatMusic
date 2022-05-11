import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path"
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()]
    })],
  resolve: {
    alias: {
      "@": join(__dirname, "./src")
    }
  },
  server: {
    proxy: {
      "/api/": {
        target: 'http://localhost:3300/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
      }
    }
  }
})