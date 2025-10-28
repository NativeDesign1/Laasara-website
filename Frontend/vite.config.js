import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['@mui/material', '@mui/icons-material'],},
    assetsDir: 'assets',
    sourcemap: true
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: ['lucide-react'],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    },
    include: ['@mui/material', '@mui/icons-material'],
  }
})