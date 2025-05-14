import * as path from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import strip from "@rollup/plugin-strip";

export default defineConfig({
  plugins: [
    vue(),
    strip({
      include: ["**/*.(js|ts|vue)"],
      functions: ["console.*"], // 移除所有console
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  // 移除 root 配置或设置为项目根目录
  root: "./", // 或者直接删除这行
  base: "/",
  publicDir: "public",
  cacheDir: "node_modules/.vite",
  // 移除 envDir 配置或设置为正确的环境变量目录
  envDir: "./", // 或者直接删除这行

  server: {
    host: "localhost",
    port: 5481,
    open: true,
    cors: true,
    proxy: {
      "/api": {
        // target: "https://tslxbm.nenu.edu.cn/api/v1",
        target: "http://120.55.79.57/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    manifest: false,
    target: "es2022",
    chunkSizeWarningLimit: 2500,

    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // 修改为完整路径
      output: {
        chunkFileNames: "assets/chunks/[name]-[hash].js",
        entryFileNames: "assets/chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        manualChunks: {
          vue: ["vue"],
          "vue-router": ["vue-router"],
          axios: ["axios"],
          "element-plus": ["element-plus"],
        },
      },
    },
  },
});
