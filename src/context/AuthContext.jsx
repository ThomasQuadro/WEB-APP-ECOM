import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = localStorage.getItem('next_token')
    if (t) {
      api.get('/auth/me')
        .then(d => setUser(d.user))
        .catch(() => localStorage.removeItem('next_token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  async function login(email, password) {
    const data = await api.post('/auth/login', { email, password })
    localStorage.setItem('next_token', data.token)
    setUser(data.user)
    return data
  }

  async function register(firstName, lastName, email, password) {
    const data = await api.post('/auth/register', { firstName, lastName, email, password })
    localStorage.setItem('next_token', data.token)
    setUser(data.user)
    return data
  }

  function logout() {
    localStorage.removeItem('next_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
