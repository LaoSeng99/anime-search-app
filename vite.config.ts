import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replace(/\\/g, '/');

          if (path.includes('node_modules')) {
            if (
              path.includes('hls.js') ||
              path.includes('dashjs') ||
              path.includes('react-player') ||
              path.includes('@mux')
            ) {
              return 'video-player-engine';
            }

            if (
              path.includes('react') ||
              path.includes('@tanstack') ||
              path.includes('react-router')
            ) {
              return 'framework-core';
            }

            if (path.includes('framer-motion')) {
              return 'ui-animation';
            }

            return 'vendor-stable';
          }
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: true, filename: 'bundle-analysis.html' }),
  ],
});
