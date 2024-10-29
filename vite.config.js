import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import { resolve } from 'path';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            // '@': resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    root: './',
    base: '/',
    publicDir: 'public',
    cacheDir: 'node_modules/.vite',
    envDir: './',
    server: {
        host: 'localhost',
        port: 5481,
        open: true, // 是否自动打开浏览器
        cors: true,
        // proxy: {
        //   '/api': {
        //     target: 'http://localhost:3000',
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/api/, '')
        //   },
        //   '/socket.io': {
        //     target: 'http://localhost:3000',
        //     changeOrigin: true,
        //     ws: true,
        //     rewrite: (path) => path.replace(/^\/socket.io/, '')
        //   },
        // }
    },
});
