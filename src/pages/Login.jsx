import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Zap, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login }   = useAuth()
  const navigate    = useNavigate()
  const location    = useLocation()
  const from        = location.state?.from || '/dashboard'

  const [form,      setForm]      = useState({ email: '', password: '' })
  const [showPwd,   setShowPwd]   = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')

  function onChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-purple flex items-center justify-center">
              <Zap size={22} className="text-white" fill="white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight">
              NEXT<span className="gradient-text"> BUILD</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-g-text">Connexion</h1>
          <p className="text-g-muted text-sm mt-1">Accédez à votre espace client</p>
        </div>

        {/* Card */}
        <div className="card p-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-g-text block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-g-muted" />
                <input
                  name="email" type="email" required
                  value={form.email} onChange={onChange}
                  placeholder="vous@exemple.fr"
                  className="input pl-9"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-g-text block mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-g-muted" />
                <input
                  name="password" type={showPwd ? 'text' : 'password'} required
                  value={form.password} onChange={onChange}
                  placeholder="••••••••"
                  className="input pl-9 pr-10"
                />
                <button
                  type="button" onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-g-muted hover:text-g-text transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="divider" />

          <p className="text-center text-sm text-g-muted">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-g-blue-l font-medium hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
