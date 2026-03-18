import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, PackageOpen } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function CartSidebar() {
  const { items, totalItems, totalPrice, isOpen, setIsOpen, removeItem, updateQty } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  function handleCheckout() {
    setIsOpen(false)
    navigate(user ? '/checkout' : '/login')
  }

  // Verrouille le scroll quand le panier est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 z-50 h-full w-full max-w-md flex flex-col
                         bg-g-card border-l border-g-border animate-slide-in shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-g-border">
          <div className="flex items-center gap-3">
            <ShoppingCart size={22} className="text-g-blue-l" />
            <h2 className="font-bold text-lg text-g-text">Mon Panier</h2>
            {totalItems > 0 && (
              <span className="badge-blue">{totalItems} article{totalItems > 1 ? 's' : ''}</span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-g-muted hover:text-g-text hover:bg-white/5
                       transition-all duration-150"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-g-muted">
              <PackageOpen size={64} strokeWidth={1} className="opacity-30" />
              <p className="text-center text-sm">Votre panier est vide.<br />Ajoutez des PC pour commencer.</p>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary text-sm px-4 py-2"
              >
                Explorer la boutique
              </button>
            </div>
          ) : (
            items.map(item => (
              <CartItem
                key={item._key}
                item={item}
                onRemove={() => removeItem(item._key)}
                onQty={(q) => updateQty(item._key, q)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-g-border space-y-4">
            {/* Subtotal */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-g-muted">
                <span>Sous-total</span>
                <span>{totalPrice.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="flex justify-between text-g-muted">
                <span>TVA (20%)</span>
                <span>{(totalPrice * 0.2).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €</span>
              </div>
              <div className="divider" />
              <div className="flex justify-between text-g-text font-bold text-base">
                <span>Total TTC</span>
                <span className="gradient-text text-lg">
                  {(totalPrice * 1.2).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €
                </span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="space-y-2">
              <Link
                to="/panier"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Voir mon panier
              </Link>
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg
                           bg-g-green/15 border border-g-green/30 text-g-green font-semibold
                           hover:bg-g-green/25 transition-all duration-150"
              >
                Commander <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

function CartItem({ item, onRemove, onQty }) {
  return (
    <div className="card p-4 flex gap-4">
      {/* Image placeholder */}
      <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${item.gradient ?? 'from-blue-900 to-indigo-950'}
                       flex-shrink-0 flex items-center justify-center overflow-hidden`}>
        <span className="text-2xl select-none">🖥️</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-g-text text-sm truncate">{item.name}</p>
        {item.variant && (
          <p className="text-xs text-g-muted mt-0.5 truncate">{item.variant}</p>
        )}
        <p className="text-g-blue-l font-bold mt-1">
          {(item.price * item.quantity).toLocaleString('fr-FR')} €
        </p>

        {/* Qty controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onQty(item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-g-border
                       text-g-muted hover:text-g-text hover:border-g-blue transition-all duration-100"
          >
            <Minus size={12} />
          </button>
          <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
          <button
            onClick={() => onQty(item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-g-border
                       text-g-muted hover:text-g-text hover:border-g-blue transition-all duration-100"
          >
            <Plus size={12} />
          </button>
          <button
            onClick={onRemove}
            className="ml-auto p-1.5 rounded-md text-g-muted hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
