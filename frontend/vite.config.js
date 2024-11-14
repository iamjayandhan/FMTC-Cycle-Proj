import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://fmtc-cycle-proj-one.vercel.app/api/v1', // Correct backend URL without `/api/v1`
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api/, '/api/v1') // Add `/api/v1` to the proxied path
            }
        }
    }
});
