import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'SpotOn-backend')

function spotonApiPlugin() {
  return {
    name: 'spoton-api',
    async configureServer(server) {
      const { app } = await import(
        pathToFileURL(resolve(backendRoot, 'src', 'app.js')).href
      )
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api') || req.url?.startsWith('/health')) {
          app(req, res, next)
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), spotonApiPlugin()],
  server: {
    host: true,
    port: 5173,
  },
})
