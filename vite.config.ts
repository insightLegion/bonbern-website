import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Helper to recursively copy directories
function copyDirSync(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['lenis', 'lenis/react'],
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-fonts',
      closeBundle() {
        const src = path.resolve(__dirname, 'fonts')
        const dest = path.resolve(__dirname, 'dist/fonts')
        if (fs.existsSync(src)) {
          copyDirSync(src, dest)
          console.log('Successfully copied fonts to dist/fonts')
        }
      }
    }
  ]
})

