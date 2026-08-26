import express from 'express'
import cors from 'cors'
import { getGuest, getGuests, getGuestsByTable, saveGuest } from './db.js'

export const port = Number(process.env.PORT) || 3000
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'

export const app = express()

app.use(
  cors({
    origin: corsOrigin.split(',').map((value) => value.trim()),
  }),
)
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/guests', (req, res) => {
  try {
    const table = String(req.query.table || '').trim()
    const guests = table ? getGuestsByTable(table) : getGuests()
    res.json({ ok: true, guests })
  } catch (error) {
    console.error('Failed to list guests', error)
    res.status(500).json({ ok: false, error: 'Could not load entries' })
  }
})

app.get('/api/guests/:id', (req, res) => {
  try {
    const guest = getGuest(req.params.id)
    if (!guest) {
      res.status(404).json({ ok: false, error: 'Guest not found' })
      return
    }
    res.json({ ok: true, guest })
  } catch (error) {
    console.error('Failed to get guest', error)
    res.status(500).json({ ok: false, error: 'Could not load guest' })
  }
})

app.post('/api/guests', (req, res) => {
  const table = String(req.body?.table || req.body?.table_number || '').trim()
  const name = String(req.body?.name || '').trim()

  if (!table || !name) {
    res.status(400).json({ ok: false, error: 'Table number and name are required' })
    return
  }

  if (table.length > 40 || name.length > 80) {
    res.status(400).json({ ok: false, error: 'Table number or name is too long' })
    return
  }

  try {
    const guest = saveGuest(table, name)
    res.status(201).json({ ok: true, guest })
  } catch (error) {
    console.error('Failed to save guest', error)
    res.status(500).json({ ok: false, error: error.message || 'Could not save your name' })
  }
})
