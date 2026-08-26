import 'dotenv/config'
import http from 'node:http'
import path from 'node:path'
import express from 'express'
import { app, port } from './app.js'

const frontendDir = process.env.FRONTEND_DIR?.trim()

if (frontendDir) {
  const staticDir = path.resolve(frontendDir)
  app.use(express.static(staticDir))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api') || req.path === '/health') {
      next()
      return
    }
    res.sendFile(path.join(staticDir, 'index.html'))
  })
}

const server = http.createServer(app)

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the other Node process, then run npm start again.`)
  } else {
    console.error(error)
  }
  process.exit(1)
})

server.listen(port, '0.0.0.0', () => {
  console.log(`SpotOn backend running on http://localhost:${port}`)
  console.log('Keep this terminal open. Press Ctrl+C to stop.')
})
