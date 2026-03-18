import { Link } from 'react-router-dom'
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight,
  PackageOpen, ArrowLeft, Tag, ShieldCheck, Truck
} from 'lucide-react'
import { useCart } from '../context/CartContext'

/* ─── Empty state ───────────────────────────────────────────── */
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-28 gap-5 text-g-muted">
      <PackageOpen size={80} strokeWidth={1} className="opacity-20" />
      <div className="text-center">
        <p className="font-bold text-xl text-g-text mb-2">Votre panier est vide</p>
        <p className="text-sm">Ajoutez des PC depuis la boutique ou configurez le vôtre.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link to="/boutique"      className="btn-primary text-sm px-5 py-2.5">
          <ShoppingCart size={16} /> Explorer la boutique
        </Link>
        <Link to="/configurateur" className="btn-secondary text-sm px-5 py-2.5">
          Créer sur-mesure
        </Link>
      </div>
    </div>
  )
}

/* ─── Cart item row ─────────────────────────────────────────── */
function CartRow({ item, onRemove, onQty }) {
  return (
    <tr className="border-b border-g-border last:border-0">
      {/* Product */}
      <td className="py-5 px-4">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${item.gradient ?? 'from-blue-900 to-indigo-950'}
                           flex-shrink-0 flex items-center justify-center overflow-hidden`}>
            <span className="text-3xl select-none">🖥️</span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-g-text truncate">{item.name}</p>
            {item.variant && (
              <p className="text-xs text-g-muted mt-0.5 max-w-xs truncate">{item.variant}</p>
            )}
            <p className="text-g-blue-l font-semibold text-sm mt-1">
              {item.price.toLocaleString('fr-FR')} € / unité
            </p>
          </div>
        </div>
      </td>

      {/* Qty */}
      <td className="py-5 px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQty(item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-g-border
                       text-g-muted hover:text-g-text hover:border-g-blue transition-all duration-100"
          >
            <Minus size={13} />
          </button>
          <span className="w-8 text-center font-semibold text-g-text">{item.quantity}</span>
          <button
            onClick={() => onQty(item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-g-border
                       text-g-muted hover:text-g-text hover:border-g-blue transition-all duration-100"
          >
            <Plus size={13} />
          </button>
        </div>
      </td>

      {/* Subtotal */}
      <td className="py-5 px-4 text-right">
        <p className="font-bold text-g-text whitespace-nowrap">
          {(item.price * item.quantity).toLocaleString('fr-FR')} €
        </p>
      </td>

      {/* Remove */}
      <td className="py-5 px-4 text-right">
        <button
          onClick={onRemove}
          className="p-2 rounded-lg text-g-muted hover:text-red-400 hover:bg-red-400/10
                     transition-all duration-150"
          title="Supprimer"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  )
}

/* ─── Order summary ─────────────────────────────────────────── */
function OrderSummary({ totalPrice, totalItems }) {
  const tva      = totalPrice * 0.2
  const shipping = totalPrice > 1000 ? 0 : 29
  const total    = totalPrice + tva + shipping

  return (
    <div className="card p-6 space-y-4 sticky top-24">
      <h2 className="font-bold text-lg text-g-text">Récapitulatif</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-g-muted">
          <span>Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
          <span>{totalPrice.toLocaleString('fr-FR')} €</span>
        </div>
        <div className="flex justify-between text-g-muted">
          <span>TVA (20%)</span>
          <span>{tva.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €</span>
        </div>
        <div className="flex justify-between text-g-muted">
          <span>Livraison</span>
          <span className={shipping === 0 ? 'text-g-green font-medium' : ''}>
            {shipping === 0 ? 'Offerte 🎉' : `${shipping} €`}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-g-muted bg-g-card2 rounded-lg p-2">
            Livraison offerte dès 1 000 € d'achat
          </p>
        )}
        <div className="divider" />
        <div className="flex justify-between text-base font-bold">
          <span className="text-g-text">Total TTC</span>
          <span className="gradient-text text-xl">
            {total.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €
          </span>
        </div>
      </div>

      {/* Promo code (UI only) */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-g-muted" />
          <input
            type="text"
            placeholder="Code promo"
            className="input pl-9 py-2 text-sm"
          />
        </div>
        <button className="btn-secondary text-sm px-4 py-2">OK</button>
      </div>

      {/* CTA */}
      <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                          bg-blue-purple text-white font-bold text-base
                          hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02]
                          transition-all duration-200">
        Passer à la caisse <ArrowRight size={18} />
      </button>

      {/* Reassurance */}
      <div className="space-y-2 pt-2">
        {[
          [ShieldCheck, 'Paiement 100% sécurisé'],
          [Truck,       'Expédition sous 48h'],
        ].map(([Icon, text]) => (
          <div key={text} className="flex items-center gap-2 text-xs text-g-muted">
            <Icon size={13} className="text-g-green" />
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function Cart() {
  const { items, totalItems, totalPrice, removeItem, updateQty } = useCart()

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="border-b border-g-border bg-g-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="section-title">Mon Panier</h1>
            {totalItems > 0 && (
              <span className="badge-blue">{totalItems} article{totalItems > 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Items table */}
            <div className="flex-1">
              <Link to="/boutique" className="btn-ghost text-sm mb-4 inline-flex">
                <ArrowLeft size={16} /> Continuer mes achats
              </Link>

              <div className="card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-g-border">
                      <th className="text-left text-xs font-bold text-g-muted uppercase tracking-widest py-3 px-4">
                        Produit
                      </th>
                      <th className="text-left text-xs font-bold text-g-muted uppercase tracking-widest py-3 px-4">
                        Qté
                      </th>
                      <th className="text-right text-xs font-bold text-g-muted uppercase tracking-widest py-3 px-4">
                        Sous-total
                      </th>
                      <th className="py-3 px-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <CartRow
                        key={item._key}
                        item={item}
                        onRemove={() => removeItem(item._key)}
                        onQty={(q) => updateQty(item._key, q)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="xl:w-80 shrink-0">
              <OrderSummary totalPrice={totalPrice} totalItems={totalItems} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
