// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Proxy all requests starting with /api to the backend
            '/api': {
                target: 'https://fmtc-cycle-proj-one.vercel.app', // Backend URL on Vercel
                changeOrigin: true,  // Handle the origin change
                secure: true,        // Use HTTPS
                rewrite: (path) => path.replace(/^\/api/, '/api/v1') // Add /v1 here to match the backend API version
            }
        }
    }
});
