const API_BASE = import.meta.env.VITE_API_URL || ''

export function getTableFromUrl() {
  return new URLSearchParams(window.location.search).get('table')?.trim() || ''
}

export async function saveGuest(table, name) {
  const response = await fetch(`${API_BASE}/api/guests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table, name }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Could not save your name')
  }

  return data.guest
}

export async function getGuests() {
  const response = await fetch(`${API_BASE}/api/guests`)
  const data = await response.json().catch(() => ({}))

  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Could not load entries')
  }

  return data.guests || []
}

export async function getGuest(id) {
  const response = await fetch(`${API_BASE}/api/guests/${encodeURIComponent(id)}`)
  if (response.status === 404) return null

  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Could not load guest')
  }

  return data.guest
}
