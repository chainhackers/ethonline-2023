import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import dotenvPlugin from 'vite-plugin-env-compatible'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

export default defineConfig({
    plugins: [reactRefresh(), dotenvPlugin(), nodePolyfills()],
    define: {
        'process.env': process.env,
    },
    /*build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },*/
    server: {
        port: 5173,
    },
})
