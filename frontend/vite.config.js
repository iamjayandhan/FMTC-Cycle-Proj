// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://fmtc-cycle-proj-one.vercel.app', // Backend URL on Vercel
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api/, '/api/v1') // Add /v1 here to match the backend's versioned route
            }
        },
        cors: {
            origin: 'https://fmtc.vercel.app', // Ensure this matches your Vercel frontend
            credentials: true
        }
    }
});
