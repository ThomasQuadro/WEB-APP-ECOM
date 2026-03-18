import { useState, useEffect } from 'react'
import { User, ShoppingBag, Euro, Calendar, Edit2, Check, X, Package, Truck, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

const STATUS_CONFIG = {
  PENDING:    { label: 'En attente',   color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', icon: Clock },
  CONFIRMED:  { label: 'Confirmée',    color: 'text-g-blue-l',   bg: 'bg-g-blue/10 border-g-blue/20',         icon: Check },
  PROCESSING: { label: 'En préparation', color: 'text-g-purple-l', bg: 'bg-g-purple/10 border-g-purple/20',   icon: Package },
  SHIPPED:    { label: 'Expédiée',     color: 'text-cyan-400',   bg: 'bg-cyan-400/10 border-cyan-400/20',     icon: Truck },
  DELIVERED:  { label: 'Livrée',       color: 'text-g-green',    bg: 'bg-g-green/10 border-g-green/20',       icon: CheckCircle },
  CANCELLED:  { label: 'Annulée',      color: 'text-red-400',    bg: 'bg-red-400/10 border-red-400/20',       icon: XCircle },
}

function StatusBadge({ status }) {
  const cfg  = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.color}`}>
      <Icon size={11} /> {cfg.label}
    </span>
  )
}

function ProfileSection({ user, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [form,    setForm]    = useState({ firstName: user.firstName, lastName: user.lastName })
  const [saving,  setSaving]  = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  async function save() {
    setSaving(true)
    setError('')
    try {
      const data = await api.put('/users/me', form)
      onUpdate(data.user)
      setEditing(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2500)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-g-blue/15 border border-g-blue/30 flex items-center justify-center text-g-blue-l">
            <User size={20} />
          </div>
          <h2 className="font-bold text-g-text">Mon profil</h2>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="btn-ghost text-sm">
            <Edit2 size={14} /> Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => { setEditing(false); setForm({ firstName: user.firstName, lastName: user.lastName }) }}
              className="btn-ghost text-sm text-red-400 hover:text-red-300">
              <X size={14} /> Annuler
            </button>
            <button onClick={save} disabled={saving} className="btn-primary text-sm px-4 py-2">
              <Check size={14} /> {saving ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          </div>
        )}
      </div>

      {success && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-g-green/10 border border-g-green/30 text-g-green text-sm">
          <Check size={14} /> Profil mis à jour avec succès
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-g-muted mb-1.5">Prénom</p>
          {editing ? (
            <input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              className="input text-sm" />
          ) : (
            <p className="text-g-text font-medium">{user.firstName}</p>
          )}
        </div>
        <div>
          <p className="text-xs text-g-muted mb-1.5">Nom</p>
          {editing ? (
            <input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              className="input text-sm" />
          ) : (
            <p className="text-g-text font-medium">{user.lastName}</p>
          )}
        </div>
        <div>
          <p className="text-xs text-g-muted mb-1.5">Email</p>
          <p className="text-g-text font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-xs text-g-muted mb-1.5">Membre depuis</p>
          <p className="text-g-text font-medium">
            {new Date(user.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  )
}

function OrdersSection({ orders }) {
  const [expanded, setExpanded] = useState(null)

  if (orders.length === 0) {
    return (
      <div className="card p-8 text-center space-y-3 text-g-muted">
        <ShoppingBag size={48} strokeWidth={1} className="mx-auto opacity-20" />
        <p className="font-semibold">Aucune commande pour l'instant</p>
        <p className="text-sm">Vos commandes apparaîtront ici après votre premier achat.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {orders.map(order => (
        <div key={order.id} className="card overflow-hidden">
          {/* Order header */}
          <button
            onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 text-left hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-g-blue/10 border border-g-blue/20 flex items-center justify-center text-g-blue-l text-sm font-bold">
                #{order.id}
              </div>
              <div>
                <p className="text-sm font-semibold text-g-text">
                  Commande du {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-xs text-g-muted mt-0.5">
                  {order.items.length} article{order.items.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-5">
              <StatusBadge status={order.status} />
              <p className="font-bold text-g-text">{order.total.toLocaleString('fr-FR')} €</p>
            </div>
          </button>

          {/* Order details */}
          {expanded === order.id && (
            <div className="border-t border-g-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-g-border">
                    <th className="text-left text-xs text-g-muted px-5 py-2.5 font-medium">Produit</th>
                    <th className="text-center text-xs text-g-muted px-3 py-2.5 font-medium">Qté</th>
                    <th className="text-right text-xs text-g-muted px-5 py-2.5 font-medium">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(item => (
                    <tr key={item.id} className="border-b border-g-border last:border-0">
                      <td className="px-5 py-3">
                        <p className="font-medium text-g-text">{item.productName}</p>
                        {item.variant && <p className="text-xs text-g-muted mt-0.5 truncate max-w-xs">{item.variant}</p>}
                      </td>
                      <td className="px-3 py-3 text-center text-g-muted">×{item.quantity}</td>
                      <td className="px-5 py-3 text-right font-semibold text-g-text">
                        {(item.price * item.quantity).toLocaleString('fr-FR')} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-3 flex justify-end border-t border-g-border bg-white/[0.02]">
                <p className="text-sm">
                  Total : <span className="font-bold gradient-text text-base">{order.total.toLocaleString('fr-FR')} €</span>
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { user: authUser, logout } = useAuth()
  const [user,   setUser]   = useState(authUser)
  const [orders, setOrders] = useState([])
  const [tab,    setTab]    = useState('orders')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/orders')
      .then(d => setOrders(d.orders))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const totalSpent   = orders.reduce((s, o) => s + o.total, 0)
  const ordersCount  = orders.length

  const TABS = [
    { id: 'orders',  label: 'Mes commandes', icon: ShoppingBag },
    { id: 'profile', label: 'Mon profil',    icon: User },
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="border-b border-g-border bg-g-card/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-g-blue text-sm font-semibold uppercase tracking-widest mb-2">Espace client</p>
          <h1 className="section-title mb-1">
            Bonjour, <span className="gradient-text">{user.firstName}</span> 👋
          </h1>
          <p className="text-g-muted text-sm">Gérez vos commandes et votre profil.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Commandes', value: ordersCount, icon: ShoppingBag, color: 'text-g-blue-l', bg: 'bg-g-blue/10 border-g-blue/20' },
            { label: 'Total dépensé', value: `${totalSpent.toLocaleString('fr-FR')} €`, icon: Euro, color: 'text-g-purple-l', bg: 'bg-g-purple/10 border-g-purple/20' },
            { label: 'Membre depuis', value: new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }), icon: Calendar, color: 'text-g-green', bg: 'bg-g-green/10 border-g-green/20' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className={`card p-5 border ${bg} flex items-center gap-4`}>
              <div className={`w-12 h-12 rounded-xl border ${bg} flex items-center justify-center ${color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs text-g-muted">{label}</p>
                <p className={`text-xl font-bold ${color}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-g-border pb-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-all
                           ${tab === id
                             ? 'border-g-blue text-g-blue-l'
                             : 'border-transparent text-g-muted hover:text-g-text'}`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'orders' && (
          loading
            ? <div className="text-center py-12 text-g-muted">Chargement...</div>
            : <OrdersSection orders={orders} />
        )}

        {tab === 'profile' && (
          <div className="space-y-4">
            <ProfileSection user={user} onUpdate={setUser} />
            <button onClick={logout} className="btn-ghost text-red-400 hover:text-red-300 text-sm">
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
