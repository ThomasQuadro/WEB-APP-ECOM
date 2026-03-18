import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart, ArrowLeft, Star, Check, ChevronDown,
  Cpu, Monitor, MemoryStick, HardDrive, Layers, Power, Box
} from 'lucide-react'
import { getProduct, products } from '../data/products'
import { useCart } from '../context/CartContext'

/* ─── Spec icon map ─────────────────────────────────────────── */
const SPEC_ICONS = {
  cpu:         <Cpu size={16} />,
  gpu:         <Monitor size={16} />,
  ram:         <MemoryStick size={16} />,
  storage:     <HardDrive size={16} />,
  motherboard: <Layers size={16} />,
  case:        <Box size={16} />,
  psu:         <Power size={16} />,
}

const SPEC_LABELS = {
  cpu:         'Processeur',
  gpu:         'Carte graphique',
  ram:         'Mémoire RAM',
  storage:     'Stockage',
  motherboard: 'Carte mère',
  case:        'Boîtier',
  psu:         'Alimentation',
}

/* ─── Customization options ─────────────────────────────────── */
const RAM_UPGRADES = [
  { label: 'Standard (inclus)', extra: 0 },
  { label: '+16 GB → 32 GB total', extra: 89 },
  { label: '+48 GB → 64 GB total', extra: 219 },
]

const STORAGE_UPGRADES = [
  { label: 'Standard (inclus)', extra: 0 },
  { label: '+ 1 TB NVMe SSD',    extra: 89 },
  { label: '+ 2 TB NVMe SSD',    extra: 159 },
  { label: '+ 2 TB HDD',         extra: 59 },
]

/* ─── Image gallery ─────────────────────────────────────────── */
const VIEWS = ['Front', 'Intérieur', 'Détail GPU', 'Câblage']

function Gallery({ product }) {
  const [active, setActive] = useState(0)
  return (
    <div className="space-y-4">
      {/* Main */}
      <div className={`relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-br ${product.gradient}
                        border border-g-border flex items-center justify-center`}>
        <span className="text-9xl select-none">🖥️</span>
        <span className="absolute top-4 left-4 badge-blue text-xs">{VIEWS[active]}</span>
      </div>
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {VIEWS.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`h-20 rounded-xl overflow-hidden bg-gradient-to-br ${product.gradient}
                         border-2 transition-all duration-150 flex items-center justify-center
                         ${active === i ? 'border-g-blue shadow-[0_0_12px_rgba(59,130,246,0.4)]' : 'border-g-border opacity-50 hover:opacity-100'}`}
          >
            <span className="text-2xl select-none">🖥️</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Related products ──────────────────────────────────────── */
function RelatedProducts({ currentId }) {
  const related = products.filter(p => p.id !== currentId).slice(0, 3)
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h2 className="section-title mb-8">
        Vous aimerez aussi
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {related.map(p => (
          <Link
            key={p.id}
            to={`/produit/${p.id}`}
            className="card flex flex-col overflow-hidden group"
          >
            <div className={`h-36 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300 select-none">🖥️</span>
            </div>
            <div className="p-4">
              <p className="font-bold text-g-text">{p.name}</p>
              <p className="text-g-blue-l font-semibold mt-1">{p.price.toLocaleString('fr-FR')} €</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function ProductDetail() {
  const { id }          = useParams()
  const navigate        = useNavigate()
  const { addItem }     = useCart()
  const product         = getProduct(id)

  const [ramIdx,     setRamIdx]     = useState(0)
  const [storageIdx, setStorageIdx] = useState(0)
  const [qty,        setQty]        = useState(1)
  const [added,      setAdded]      = useState(false)

  if (!product) {
    return (
      <div className="pt-24 flex flex-col items-center justify-center min-h-[60vh] gap-4 text-g-muted">
        <p className="text-5xl">😕</p>
        <p className="font-semibold">Produit introuvable</p>
        <Link to="/boutique" className="btn-primary text-sm">Retour à la boutique</Link>
      </div>
    )
  }

  const extraPrice  = RAM_UPGRADES[ramIdx].extra + STORAGE_UPGRADES[storageIdx].extra
  const finalPrice  = product.price + extraPrice
  const variantDesc = [
    ramIdx     > 0 ? RAM_UPGRADES[ramIdx].label : null,
    storageIdx > 0 ? STORAGE_UPGRADES[storageIdx].label : null,
  ].filter(Boolean).join(' | ')

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: finalPrice,
        gradient: product.gradient,
        variant: variantDesc || 'Configuration standard',
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-center gap-2 text-sm text-g-muted">
          <Link to="/" className="hover:text-g-text transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/boutique" className="hover:text-g-text transition-colors">Boutique</Link>
          <span>/</span>
          <span className="text-g-text">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="btn-ghost mb-6 text-sm">
          <ArrowLeft size={16} /> Retour
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Gallery */}
          <Gallery product={product} />

          {/* Right — Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="badge-blue">{product.badge}</span>
                {product.bestseller && <span className="badge-purple">Best-seller</span>}
                {product.inStock && <span className="badge-green">En stock</span>}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-g-text mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-g-muted text-sm">{product.rating} — {product.reviews} avis vérifiés</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-g-card2 border border-g-border rounded-xl p-5">
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-black gradient-text">
                  {finalPrice.toLocaleString('fr-FR')} €
                </p>
                {extraPrice > 0 && (
                  <p className="text-g-muted line-through text-lg">{product.price.toLocaleString('fr-FR')} €</p>
                )}
              </div>
              <p className="text-g-muted text-sm mt-1">TTC • Garantie 3 ans • Expédition 48h</p>
            </div>

            {/* Description */}
            <p className="text-g-muted leading-relaxed">{product.description}</p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2">
              {product.highlights.map(h => (
                <span key={h} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                          bg-g-blue/10 border border-g-blue/20 text-g-blue-l text-sm font-medium">
                  <Check size={12} /> {h}
                </span>
              ))}
            </div>

            {/* Customization */}
            <div className="space-y-4">
              <p className="text-sm font-bold text-g-muted uppercase tracking-widest">Personnalisation</p>

              {/* RAM */}
              <div>
                <label className="text-sm text-g-text font-medium mb-2 block">
                  Mémoire RAM — <span className="text-g-blue-l">{RAM_UPGRADES[ramIdx].extra > 0 ? `+${RAM_UPGRADES[ramIdx].extra} €` : 'inclus'}</span>
                </label>
                <div className="relative">
                  <select
                    value={ramIdx}
                    onChange={e => setRamIdx(Number(e.target.value))}
                    className="input pr-10 appearance-none cursor-pointer text-sm"
                  >
                    {RAM_UPGRADES.map((o, i) => (
                      <option key={i} value={i}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-g-muted pointer-events-none" />
                </div>
              </div>

              {/* Storage */}
              <div>
                <label className="text-sm text-g-text font-medium mb-2 block">
                  Stockage — <span className="text-g-blue-l">{STORAGE_UPGRADES[storageIdx].extra > 0 ? `+${STORAGE_UPGRADES[storageIdx].extra} €` : 'inclus'}</span>
                </label>
                <div className="relative">
                  <select
                    value={storageIdx}
                    onChange={e => setStorageIdx(Number(e.target.value))}
                    className="input pr-10 appearance-none cursor-pointer text-sm"
                  >
                    {STORAGE_UPGRADES.map((o, i) => (
                      <option key={i} value={i}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-g-muted pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-g-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-4 py-3 text-g-muted hover:text-g-text hover:bg-white/5 transition-all"
                >−</button>
                <span className="px-4 text-g-text font-semibold min-w-[3rem] text-center">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="px-4 py-3 text-g-muted hover:text-g-text hover:bg-white/5 transition-all"
                >+</button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`btn-primary flex-1 justify-center transition-all ${added ? 'bg-g-green/80' : ''}`}
              >
                {added ? <><Check size={18} /> Ajouté !</> : <><ShoppingCart size={18} /> Ajouter au panier</>}
              </button>
            </div>
          </div>
        </div>

        {/* Full specs table */}
        <div className="mt-16">
          <h2 className="section-title mb-6">Caractéristiques <span className="gradient-text">techniques</span></h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([key, value], i) => (
                  <tr
                    key={key}
                    className={`flex flex-col sm:flex-row border-b border-g-border last:border-0
                                 ${i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}
                  >
                    <td className="flex items-center gap-2 text-g-muted sm:w-44 px-5 pt-4 pb-1 sm:py-4 shrink-0">
                      <span className="text-g-blue-l">{SPEC_ICONS[key]}</span>
                      {SPEC_LABELS[key] ?? key}
                    </td>
                    <td className="text-g-text font-medium px-5 pb-4 sm:py-4">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <RelatedProducts currentId={product.id} />
    </div>
  )
}
