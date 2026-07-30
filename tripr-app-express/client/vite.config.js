const vue = require("@vitejs/plugin-vue");
const { defineConfig } = require("vite");

const apiTarget = process.env.VITE_API_TARGET || "http://localhost:3001";

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  server: {
    port: parseInt(process.env.VITE_DEV_PORT || "3000", 10),
    strictPort: true,
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/socket.io": {
        target: apiTarget,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
