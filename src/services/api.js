export const API_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') + '/api'
const BASE = API_BASE

function token() {
  return localStorage.getItem('nexus_token')
}

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' }
  const t = token()
  if (t) headers['Authorization'] = `Bearer ${t}`

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`)
  return data
}

export const api = {
  get:    (path)        => request('GET',    path),
  post:   (path, body)  => request('POST',   path, body),
  put:    (path, body)  => request('PUT',    path, body),
  delete: (path)        => request('DELETE', path),
}
