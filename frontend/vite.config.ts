import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
  },

  // base: './',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/components'),
      Pages: path.resolve(__dirname, './src/pages'),
      Utils: path.resolve(__dirname, './src/utils'),
      Icons: path.resolve(__dirname, './src/icons'),
      src: path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
});
