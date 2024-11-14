import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fmtc-cycle-proj-fgpt5rgfm-guruprasath-vs-projects.vercel.app',
        changeOrigin: true,
      },
    },
  },
})
