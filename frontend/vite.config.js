import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://fmtc-cycle-proj-one.vercel.app/api/v1',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Adjust the path to remove /api prefix
      }
    }
  }
});