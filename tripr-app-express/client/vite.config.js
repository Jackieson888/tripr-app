const vue = require('@vitejs/plugin-vue')
const { defineConfig } = require('vite')

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
