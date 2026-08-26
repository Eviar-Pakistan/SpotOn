import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '..', 'data')
const dbPath = join(dataDir, 'spoton.db')

mkdirSync(dataDir, { recursive: true })

const db = new DatabaseSync(dbPath)

function tableInfo() {
  return db.prepare(`PRAGMA table_info(guests)`).all()
}

function guestsTableExists() {
  return Boolean(
    db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'guests'`).get(),
  )
}

function needsIdMigration() {
  if (!guestsTableExists()) return false
  const columns = tableInfo()
  const tableColumn = columns.find((column) => column.name === 'table_number')
  return !columns.some((column) => column.name === 'id') || tableColumn?.pk === 1
}

if (!guestsTableExists()) {
  db.exec(`
    CREATE TABLE guests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_number TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)
} else if (needsIdMigration()) {
  db.exec(`
    CREATE TABLE guests_new (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_number TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)
  db.exec(`
    INSERT INTO guests_new (table_number, name, created_at)
    SELECT table_number, name, created_at FROM guests
  `)
  db.exec(`DROP TABLE guests`)
  db.exec(`ALTER TABLE guests_new RENAME TO guests`)
}

const insertGuest = db.prepare(`
  INSERT INTO guests (table_number, name, created_at)
  VALUES (?, ?, datetime('now'))
`)

const selectAll = db.prepare(`
  SELECT id, table_number, name, created_at
  FROM guests
  ORDER BY id DESC
`)

const selectById = db.prepare(`
  SELECT id, table_number, name, created_at
  FROM guests
  WHERE id = ?
`)

const selectByTable = db.prepare(`
  SELECT id, table_number, name, created_at
  FROM guests
  WHERE table_number = ?
  ORDER BY id DESC
`)

function toGuest(row) {
  if (!row) return null
  return {
    id: Number(row.id),
    table: row.table_number,
    name: row.name,
    created_at: row.created_at,
  }
}

export function saveGuest(table, name) {
  insertGuest.run(table, name)
  const row = db.prepare(`
    SELECT id, table_number, name, created_at
    FROM guests
    ORDER BY id DESC
    LIMIT 1
  `).get()
  return toGuest(row)
}

export function getGuests() {
  return selectAll.all().map(toGuest)
}

export function getGuestsByTable(table) {
  return selectByTable.all(table).map(toGuest)
}

export function getGuest(id) {
  return toGuest(selectById.get(Number(id)))
}
