import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2020',
  },
  base: './',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/components'),
      Pages: path.resolve(__dirname, './src/pages'),
    },
  },
  plugins: [react()],
});
