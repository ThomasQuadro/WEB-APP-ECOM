import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MapPin, Truck, CreditCard, ClipboardList, Check,
  ChevronRight, ChevronLeft, Zap, ShieldCheck,
  CreditCard as CardIcon, Wallet, Building2,
  Package, PackagePlus, Store, Lock,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

// ─── Stepper ────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Adresse',    icon: MapPin },
  { id: 2, label: 'Livraison',  icon: Truck },
  { id: 3, label: 'Paiement',   icon: CreditCard },
  { id: 4, label: 'Récap',      icon: ClipboardList },
]

function Stepper({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((s, idx) => {
        const done    = s.id < current
        const active  = s.id === current
        const Icon    = s.icon
        return (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
                ${done   ? 'bg-g-green border-g-green text-white' :
                  active ? 'bg-blue-purple border-transparent text-white' :
                           'bg-g-card border-g-border text-g-muted'}`}>
                {done ? <Check size={16} /> : <Icon size={16} />}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${active ? 'text-g-text' : 'text-g-muted'}`}>
                {s.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mb-4 mx-1 transition-colors duration-200
                ${s.id < current ? 'bg-g-green' : 'bg-g-border'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Shipping options ────────────────────────────────────────────────────────
function shippingOptions(subtotal) {
  return [
    {
      id: 'standard',
      label: 'Livraison Standard',
      desc: '5 à 10 jours ouvrés',
      icon: Package,
      cost: subtotal >= 1000 ? 0 : 29,
      badge: subtotal >= 1000 ? 'Offerte' : null,
    },
    {
      id: 'express',
      label: 'Livraison Express',
      desc: '2 à 3 jours ouvrés',
      icon: PackagePlus,
      cost: 49,
      badge: 'Rapide',
    },
    {
      id: 'pickup',
      label: 'Retrait en boutique',
      desc: 'Paris 11e — sous 48h',
      icon: Store,
      cost: 0,
      badge: 'Gratuit',
    },
  ]
}

const PAYMENT_METHODS = [
  {
    id: 'card',
    label: 'Carte bancaire',
    desc: 'Visa, Mastercard — paiement sécurisé SSL',
    icon: CardIcon,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    desc: 'Redirection vers PayPal pour payer',
    icon: Wallet,
  },
  {
    id: 'transfer',
    label: 'Virement bancaire',
    desc: 'IBAN communiqué par email après validation',
    icon: Building2,
  },
]

// ─── Step 1 — Adresse ────────────────────────────────────────────────────────
function AddressField({ label, name, type = 'text', placeholder = '', half = false, form, errors, onChange }) {
  return (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="block text-xs font-semibold text-g-muted mb-1.5">{label}</label>
      <input
        type={type} value={form[name]} placeholder={placeholder}
        onChange={e => onChange(name, e.target.value)}
        className={`input w-full text-sm ${errors[name] ? 'border-red-500 focus:border-red-500' : ''}`}
      />
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
    </div>
  )
}

function StepAddress({ data, onChange, onNext }) {
  const { user } = useAuth()

  const [form, setForm] = useState(() => ({
    firstName:  data.firstName  || user?.firstName || '',
    lastName:   data.lastName   || user?.lastName  || '',
    email:      data.email      || user?.email     || '',
    phone:      data.phone      || '',
    address:    data.address    || '',
    complement: data.complement || '',
    zip:        data.zip        || '',
    city:       data.city       || '',
    country:    data.country    || 'France',
  }))
  const [errors, setErrors] = useState({})

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Requis'
    if (!form.lastName.trim())  e.lastName  = 'Requis'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    if (!form.phone.trim())     e.phone     = 'Requis'
    if (!form.address.trim())   e.address   = 'Requis'
    if (!form.zip.trim())       e.zip       = 'Requis'
    if (!form.city.trim())      e.city      = 'Requis'
    return e
  }

  function submit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onChange(form)
    onNext()
  }

  const fieldProps = { form, errors, onChange: setField }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-extrabold text-xl text-g-text mb-1">Adresse de livraison</h2>
        <p className="text-sm text-g-muted">Où souhaitez-vous recevoir votre commande ?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AddressField label="Prénom *"      name="firstName"  half placeholder="Jean"                   {...fieldProps} />
        <AddressField label="Nom *"         name="lastName"   half placeholder="Dupont"                 {...fieldProps} />
        <AddressField label="Email *"       name="email"      type="email" placeholder="jean@exemple.fr" {...fieldProps} />
        <AddressField label="Téléphone *"   name="phone"      type="tel" half placeholder="+33 6 12 34 56 78" {...fieldProps} />
        <AddressField label="Adresse *"     name="address"    placeholder="12 rue de la Paix"           {...fieldProps} />
        <AddressField label="Complément"    name="complement" placeholder="Appartement, bâtiment…"      {...fieldProps} />
        <AddressField label="Code postal *" name="zip"        half placeholder="75011"                  {...fieldProps} />
        <AddressField label="Ville *"       name="city"       half placeholder="Paris"                  {...fieldProps} />
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-g-muted mb-1.5">Pays *</label>
          <select value={form.country} onChange={e => set('country', e.target.value)}
            className="input w-full text-sm">
            <option>France</option>
            <option>Belgique</option>
            <option>Suisse</option>
            <option>Luxembourg</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={submit} className="btn-primary gap-2">
          Continuer <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ─── Step 2 — Livraison ──────────────────────────────────────────────────────
function StepShipping({ subtotal, selected, onSelect, onBack, onNext }) {
  const options = shippingOptions(subtotal)
  const [choice, setChoice] = useState(selected?.id || 'standard')

  function submit() {
    const opt = options.find(o => o.id === choice)
    onSelect(opt)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-extrabold text-xl text-g-text mb-1">Mode de livraison</h2>
        <p className="text-sm text-g-muted">Choisissez comment vous souhaitez recevoir votre commande.</p>
      </div>

      <div className="space-y-3">
        {options.map(opt => {
          const Icon = opt.icon
          const active = choice === opt.id
          return (
            <button key={opt.id} onClick={() => setChoice(opt.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150
                ${active ? 'border-g-blue bg-g-blue/5' : 'border-g-border hover:border-g-blue/40'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                ${active ? 'bg-g-blue text-white' : 'bg-g-card2 text-g-muted'}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-g-text text-sm">{opt.label}</span>
                  {opt.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold
                      ${opt.badge === 'Offerte' || opt.badge === 'Gratuit'
                        ? 'bg-g-green/20 text-g-green'
                        : 'bg-g-blue/20 text-g-blue-l'}`}>
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-g-muted mt-0.5">{opt.desc}</p>
              </div>
              <div className="font-bold text-g-text flex-shrink-0">
                {opt.cost === 0 ? <span className="text-g-green">Gratuit</span> : `${opt.cost} €`}
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                ${active ? 'border-g-blue bg-g-blue' : 'border-g-border'}`}>
                {active && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary gap-2">
          <ChevronLeft size={16} /> Retour
        </button>
        <button onClick={submit} className="btn-primary gap-2">
          Continuer <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ─── Step 3 — Paiement ──────────────────────────────────────────────────────
function StepPayment({ selected, onSelect, onBack, onNext }) {
  const [choice, setChoice] = useState(selected || 'card')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [errors, setErrors] = useState({})

  function setC(k, v) { setCard(c => ({ ...c, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  function formatCardNumber(v) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }
  function formatExpiry(v) {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d
  }

  function validate() {
    if (choice !== 'card') return {}
    const e = {}
    if (card.number.replace(/\s/g,'').length < 16) e.number = 'Numéro invalide'
    if (card.expiry.length < 5) e.expiry = 'Date invalide'
    if (card.cvv.length < 3)   e.cvv    = 'CVV invalide'
    if (!card.name.trim())     e.name   = 'Requis'
    return e
  }

  function submit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSelect(choice)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-extrabold text-xl text-g-text mb-1">Mode de paiement</h2>
        <p className="text-sm text-g-muted">Choisissez votre moyen de paiement.</p>
      </div>

      <div className="space-y-3">
        {PAYMENT_METHODS.map(m => {
          const Icon   = m.icon
          const active = choice === m.id
          return (
            <div key={m.id}>
              <button onClick={() => setChoice(m.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150
                  ${active ? 'border-g-blue bg-g-blue/5' : 'border-g-border hover:border-g-blue/40'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                  ${active ? 'bg-g-blue text-white' : 'bg-g-card2 text-g-muted'}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-g-text text-sm">{m.label}</p>
                  <p className="text-xs text-g-muted">{m.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                  ${active ? 'border-g-blue bg-g-blue' : 'border-g-border'}`}>
                  {active && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>

              {/* Card form */}
              {active && m.id === 'card' && (
                <div className="mt-3 p-4 rounded-xl bg-g-card2 border border-g-border space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-g-muted mb-1.5">Numéro de carte *</label>
                      <input value={card.number}
                        onChange={e => setC('number', formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className={`input w-full text-sm font-mono ${errors.number ? 'border-red-500' : ''}`} />
                      {errors.number && <p className="text-xs text-red-400 mt-1">{errors.number}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-g-muted mb-1.5">Date d'expiration *</label>
                      <input value={card.expiry}
                        onChange={e => setC('expiry', formatExpiry(e.target.value))}
                        placeholder="MM/AA"
                        className={`input w-full text-sm font-mono ${errors.expiry ? 'border-red-500' : ''}`} />
                      {errors.expiry && <p className="text-xs text-red-400 mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-g-muted mb-1.5">CVV *</label>
                      <input value={card.cvv}
                        onChange={e => setC('cvv', e.target.value.replace(/\D/g,'').slice(0,4))}
                        placeholder="123"
                        className={`input w-full text-sm font-mono ${errors.cvv ? 'border-red-500' : ''}`} />
                      {errors.cvv && <p className="text-xs text-red-400 mt-1">{errors.cvv}</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-g-muted mb-1.5">Titulaire de la carte *</label>
                      <input value={card.name}
                        onChange={e => setC('name', e.target.value)}
                        placeholder="JEAN DUPONT"
                        className={`input w-full text-sm uppercase ${errors.name ? 'border-red-500' : ''}`} />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-g-muted">
                    <Lock size={12} className="text-g-green" />
                    Paiement simulé — aucune donnée bancaire réelle n'est transmise
                  </div>
                </div>
              )}

              {/* PayPal info */}
              {active && m.id === 'paypal' && (
                <div className="mt-3 p-4 rounded-xl bg-g-card2 border border-g-border text-sm text-g-muted">
                  Vous serez redirigé vers PayPal pour finaliser le paiement en toute sécurité.
                </div>
              )}

              {/* Transfer info */}
              {active && m.id === 'transfer' && (
                <div className="mt-3 p-4 rounded-xl bg-g-card2 border border-g-border space-y-1">
                  <p className="text-xs font-bold text-g-muted uppercase tracking-widest mb-2">Coordonnées bancaires</p>
                  <p className="text-sm text-g-text font-mono">IBAN : FR76 3000 6000 0112 3456 7890 189</p>
                  <p className="text-sm text-g-text font-mono">BIC  : BNPAFRPPXXX</p>
                  <p className="text-xs text-g-muted mt-2">La commande sera confirmée dès réception du virement (1-2 jours ouvrés).</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-2 text-xs text-g-muted">
        <ShieldCheck size={14} className="text-g-green flex-shrink-0" />
        Toutes les transactions sont protégées par chiffrement SSL 256 bits.
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary gap-2">
          <ChevronLeft size={16} /> Retour
        </button>
        <button onClick={submit} className="btn-primary gap-2">
          Continuer <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ─── Step 4 — Récapitulatif ──────────────────────────────────────────────────
function StepRecap({ address, shipping, paymentMethod, items, totalPrice, onBack, onConfirm, loading }) {
  const subtotal     = totalPrice
  const shippingCost = shipping?.cost ?? 0
  const tva          = subtotal * 0.2
  const total        = subtotal + tva + shippingCost

  const paymentLabel = PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label ?? paymentMethod

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-extrabold text-xl text-g-text mb-1">Récapitulatif de commande</h2>
        <p className="text-sm text-g-muted">Vérifiez les informations avant de confirmer.</p>
      </div>

      {/* Articles */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-g-border">
          <p className="text-xs font-bold text-g-muted uppercase tracking-widest">Articles</p>
        </div>
        <div className="divide-y divide-g-border">
          {items.map(item => (
            <div key={item._key} className="flex items-center gap-3 px-4 py-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient ?? 'from-blue-900 to-indigo-950'}
                               flex items-center justify-center flex-shrink-0 text-xl`}>
                🖥️
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-g-text truncate">{item.name}</p>
                {item.variant && <p className="text-xs text-g-muted truncate">{item.variant}</p>}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-sm text-g-text">{(item.price * item.quantity).toLocaleString('fr-FR')} €</p>
                <p className="text-xs text-g-muted">× {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 colonnes info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Adresse */}
        <div className="card p-4 space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} className="text-g-blue" />
            <p className="text-xs font-bold text-g-muted uppercase tracking-widest">Adresse</p>
          </div>
          <p className="text-sm font-semibold text-g-text">{address.firstName} {address.lastName}</p>
          <p className="text-xs text-g-muted">{address.address}</p>
          {address.complement && <p className="text-xs text-g-muted">{address.complement}</p>}
          <p className="text-xs text-g-muted">{address.zip} {address.city}</p>
          <p className="text-xs text-g-muted">{address.country}</p>
          <p className="text-xs text-g-muted mt-1">{address.phone}</p>
        </div>

        {/* Livraison */}
        <div className="card p-4 space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Truck size={14} className="text-g-blue" />
            <p className="text-xs font-bold text-g-muted uppercase tracking-widest">Livraison</p>
          </div>
          <p className="text-sm font-semibold text-g-text">{shipping?.label}</p>
          <p className="text-xs text-g-muted">{shipping?.desc}</p>
          <p className={`text-sm font-bold mt-1 ${shippingCost === 0 ? 'text-g-green' : 'text-g-text'}`}>
            {shippingCost === 0 ? 'Gratuit' : `${shippingCost} €`}
          </p>
        </div>

        {/* Paiement */}
        <div className="card p-4 space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={14} className="text-g-blue" />
            <p className="text-xs font-bold text-g-muted uppercase tracking-widest">Paiement</p>
          </div>
          <p className="text-sm font-semibold text-g-text">{paymentLabel}</p>
          {paymentMethod === 'card' && <p className="text-xs text-g-muted">Débit immédiat à la confirmation</p>}
          {paymentMethod === 'paypal' && <p className="text-xs text-g-muted">Redirection PayPal</p>}
          {paymentMethod === 'transfer' && <p className="text-xs text-g-muted">Confirmation après réception</p>}
        </div>
      </div>

      {/* Total */}
      <div className="card p-5 space-y-3">
        <p className="text-xs font-bold text-g-muted uppercase tracking-widest mb-1">Détail du prix</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-g-muted">
            <span>Sous-total HT</span>
            <span>{subtotal.toLocaleString('fr-FR')} €</span>
          </div>
          <div className="flex justify-between text-g-muted">
            <span>TVA (20%)</span>
            <span>{tva.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €</span>
          </div>
          <div className="flex justify-between text-g-muted">
            <span>Frais de livraison</span>
            <span className={shippingCost === 0 ? 'text-g-green' : ''}>
              {shippingCost === 0 ? 'Offerts' : `${shippingCost} €`}
            </span>
          </div>
          <div className="divider" />
          <div className="flex justify-between text-base font-extrabold">
            <span className="text-g-text">Total TTC</span>
            <span className="gradient-text text-xl">{total.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-g-muted">
        <ShieldCheck size={14} className="text-g-green flex-shrink-0" />
        En confirmant, vous acceptez nos <Link to="/cgv" className="underline hover:text-g-text">CGV</Link>.
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary gap-2">
          <ChevronLeft size={16} /> Retour
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-purple text-white font-bold
                     hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02]
                     transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Traitement…' : <><Zap size={18} fill="white" /> Confirmer la commande</>}
        </button>
      </div>
    </div>
  )
}

// ─── Success ─────────────────────────────────────────────────────────────────
function Success({ orderId }) {
  return (
    <div className="text-center space-y-5 max-w-md mx-auto px-4 py-16">
      <div className="w-20 h-20 rounded-full bg-g-green/20 border-2 border-g-green flex items-center justify-center mx-auto">
        <Check size={36} className="text-g-green" />
      </div>
      <h1 className="text-3xl font-extrabold text-g-text">Commande confirmée !</h1>
      <p className="text-g-muted text-sm leading-relaxed">
        Merci pour votre achat. Un email de confirmation a été envoyé.<br />
        Votre commande #{orderId} est en cours de traitement.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link to="/dashboard" className="btn-primary">Voir mes commandes</Link>
        <Link to="/boutique"  className="btn-secondary">Continuer mes achats</Link>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const [step,    setStep]    = useState(1)
  const [address, setAddress] = useState({})
  const [shipping, setShipping] = useState(null)
  const [payment, setPayment]  = useState(null)
  const [loading, setLoading]  = useState(false)
  const [orderId, setOrderId]  = useState(null)

  if (items.length === 0 && !orderId) {
    navigate('/panier')
    return null
  }

  if (orderId) return <Success orderId={orderId} />

  async function confirm() {
    setLoading(true)
    try {
      const { order } = await api.post('/orders', {
        items,
        shippingFirstName:  address.firstName,
        shippingLastName:   address.lastName,
        shippingEmail:      address.email,
        shippingPhone:      address.phone,
        shippingAddress:    address.address,
        shippingComplement: address.complement,
        shippingZip:        address.zip,
        shippingCity:       address.city,
        shippingCountry:    address.country,
        shippingMethod:     shipping.id,
        shippingCost:       shipping.cost,
        paymentMethod:      payment,
      })
      clearCart()
      setOrderId(order.id)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="border-b border-g-border bg-g-card/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Link to="/panier" className="btn-ghost text-sm mb-4 inline-flex">
            <ChevronLeft size={16} /> Retour au panier
          </Link>
          <h1 className="section-title">Finaliser la commande</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Stepper current={step} />

        <div className="card p-6 sm:p-8">
          {step === 1 && (
            <StepAddress
              data={address}
              onChange={setAddress}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <StepShipping
              subtotal={totalPrice}
              selected={shipping}
              onSelect={setShipping}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <StepPayment
              selected={payment}
              onSelect={setPayment}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <StepRecap
              address={address}
              shipping={shipping}
              paymentMethod={payment}
              items={items}
              totalPrice={totalPrice}
              onBack={() => setStep(3)}
              onConfirm={confirm}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  )
}
