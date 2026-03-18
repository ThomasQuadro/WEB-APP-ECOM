import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, Mail, Lock, Eye, EyeOff, User, AlertCircle, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate     = useNavigate()

  const [form,    setForm]    = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  function onChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const pwdRules = [
    { ok: form.password.length >= 8,           label: '8 caractères minimum' },
    { ok: /[A-Z]/.test(form.password),         label: 'Une majuscule' },
    { ok: /[0-9]/.test(form.password),         label: 'Un chiffre' },
    { ok: form.password === form.confirm && form.confirm.length > 0, label: 'Mots de passe identiques' },
  ]

  async function onSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
      return setError('Les mots de passe ne correspondent pas')
    }
    setLoading(true)
    setError('')
    try {
      await register(form.firstName, form.lastName, form.email, form.password)
      navigate('/dashboard')
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
              NEXUS<span className="gradient-text"> BUILD</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-g-text">Créer un compte</h1>
          <p className="text-g-muted text-sm mt-1">Rejoignez la communauté NEXUS BUILD</p>
        </div>

        <div className="card p-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle size={16} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-g-text block mb-1.5">Prénom</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-g-muted" />
                  <input name="firstName" required value={form.firstName} onChange={onChange}
                    placeholder="Jean" className="input pl-9 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-g-text block mb-1.5">Nom</label>
                <input name="lastName" required value={form.lastName} onChange={onChange}
                  placeholder="Dupont" className="input text-sm" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-g-text block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-g-muted" />
                <input name="email" type="email" required value={form.email} onChange={onChange}
                  placeholder="vous@exemple.fr" className="input pl-9 text-sm" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-g-text block mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-g-muted" />
                <input name="password" type={showPwd ? 'text' : 'password'} required
                  value={form.password} onChange={onChange}
                  placeholder="••••••••" className="input pl-9 pr-10 text-sm" />
                <button type="button" onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-g-muted hover:text-g-text">
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Password strength */}
              <div className="mt-2 grid grid-cols-2 gap-1">
                {pwdRules.map(r => (
                  <div key={r.label} className={`flex items-center gap-1.5 text-xs ${r.ok ? 'text-g-green' : 'text-g-muted'}`}>
                    <Check size={11} className={r.ok ? 'opacity-100' : 'opacity-30'} /> {r.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label className="text-sm font-medium text-g-text block mb-1.5">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-g-muted" />
                <input name="confirm" type={showPwd ? 'text' : 'password'} required
                  value={form.confirm} onChange={onChange}
                  placeholder="••••••••" className="input pl-9 text-sm" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>

          <div className="divider" />
          <p className="text-center text-sm text-g-muted">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-g-blue-l font-medium hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
