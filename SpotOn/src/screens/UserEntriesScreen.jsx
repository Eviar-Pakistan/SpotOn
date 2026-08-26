import { useCallback, useEffect, useMemo, useState } from 'react'
import BrandHeader from '../components/BrandHeader'
import { getGuests } from '../api'

function formatTime(value) {
  if (!value) return '—'
  const utc = value.includes('T') ? value : `${value.replace(' ', 'T')}Z`
  const date = new Date(utc)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function UserEntriesScreen() {
  const [entries, setEntries] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadEntries = useCallback(async () => {
    try {
      setError('')
      const guests = await getGuests()
      setEntries(guests)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load entries')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadEntries()
    const timer = window.setInterval(loadEntries, 8000)
    return () => window.clearInterval(timer)
  }, [loadEntries])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return entries
    return entries.filter(
      (entry) =>
        String(entry.table).toLowerCase().includes(term) ||
        String(entry.name).toLowerCase().includes(term),
    )
  }, [entries, query])

  return (
    <div className="entries-page">
      <div className="entries-wrap">
        <BrandHeader />

        <div className="entries-heading">
          <div>
            <h1>User Entries</h1>
            <p>{entries.length} {entries.length === 1 ? 'guest' : 'guests'} registered</p>
          </div>
          <button type="button" className="entries-refresh" onClick={loadEntries}>
            Refresh
          </button>
        </div>

        <input
          className="entries-search"
          type="search"
          placeholder="Search table number or name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {error ? <p className="entries-status error">{error}</p> : null}
        {loading && !entries.length ? <p className="entries-status">Loading entries…</p> : null}
        {!loading && !error && !filtered.length ? (
          <p className="entries-status">No entries found.</p>
        ) : null}

        <div className="entries-table-wrap">
          <table className="entries-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Table number</th>
                <th>Name</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={entry.id}>
                  <td data-label="ID">{entry.id}</td>
                  <td data-label="Table number">{entry.table}</td>
                  <td data-label="Name">{entry.name}</td>
                  <td data-label="Submitted">{formatTime(entry.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
