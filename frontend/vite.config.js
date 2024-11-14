// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://fmtc-cycle-proj-one.vercel.app',  // Backend URL
                changeOrigin: true,  // Handle origin change
                secure: true,        // Use HTTPS
                rewrite: (path) => path.replace(/^\/api/, '/api/v1')  // Match API version
            }
        }
    }
});
