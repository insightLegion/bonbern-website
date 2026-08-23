import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

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
  server: {
    open: '/structure/index2.html',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          res.writeHead(302, { Location: '/structure/index2.html' });
          res.end();
        } else {
          next();
        }
      });
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: 'structure/index2.html'
      }
    }
  },
  plugins: [
    {
      name: 'copy-fonts',
      closeBundle() {
        const src = path.resolve(import.meta.dirname || '', 'fonts')
        const dest = path.resolve(import.meta.dirname || '', 'dist/fonts')
        if (fs.existsSync(src)) {
          copyDirSync(src, dest)
          console.log('Successfully copied fonts to dist/fonts')
        }
      }
    }
  ]
})
