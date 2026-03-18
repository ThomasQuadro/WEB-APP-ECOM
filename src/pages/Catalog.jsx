import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, ChevronRight, SlidersHorizontal, X, Star, Search } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

const USAGE_OPTIONS  = ['Gaming', 'Stream', 'Bureautique']
const CPU_OPTIONS    = ['Intel', 'AMD']
const GPU_OPTIONS    = ['NVIDIA', 'AMD']
const SORT_OPTIONS   = [
  { value: 'default',    label: 'Recommandés' },
  { value: 'price-asc',  label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating',     label: 'Mieux notés' },
]

/* ─── Checkbox pill ─────────────────────────────────────────── */
function FilterPill({ label, checked, onChange }) {
  return (
    <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer
                        text-sm font-medium transition-all duration-150 select-none
                        ${checked
                          ? 'border-g-blue bg-g-blue/15 text-g-blue-l'
                          : 'border-g-border text-g-muted hover:border-g-blue/40 hover:text-g-text'}`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  )
}

/* ─── Filters sidebar ───────────────────────────────────────── */
function Filters({ filters, setFilters, onReset }) {
  function toggle(key, value) {
    setFilters(f => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter(v => v !== value)
        : [...f[key], value],
    }))
  }

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      <div className="card p-5 space-y-6">

        {/* Prix */}
        <div>
          <p className="text-xs font-bold text-g-muted uppercase tracking-widest mb-3">Prix max</p>
          <input
            type="range"
            min={499} max={3000} step={50}
            value={filters.maxPrice}
            onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
            className="w-full accent-g-blue"
          />
          <div className="flex justify-between text-sm text-g-muted mt-1">
            <span>499 €</span>
            <span className="font-semibold text-g-blue-l">{filters.maxPrice} €</span>
          </div>
        </div>

        {/* Utilisation */}
        <div>
          <p className="text-xs font-bold text-g-muted uppercase tracking-widest mb-3">Utilisation</p>
          <div className="flex flex-wrap gap-2">
            {USAGE_OPTIONS.map(u => (
              <FilterPill
                key={u} label={u} checked={filters.usage.includes(u)}
                onChange={() => toggle('usage', u)}
              />
            ))}
          </div>
        </div>

        {/* CPU */}
        <div>
          <p className="text-xs font-bold text-g-muted uppercase tracking-widest mb-3">Processeur</p>
          <div className="flex flex-wrap gap-2">
            {CPU_OPTIONS.map(u => (
              <FilterPill
                key={u} label={u} checked={filters.cpu.includes(u)}
                onChange={() => toggle('cpu', u)}
              />
            ))}
          </div>
        </div>

        {/* GPU */}
        <div>
          <p className="text-xs font-bold text-g-muted uppercase tracking-widest mb-3">Carte graphique</p>
          <div className="flex flex-wrap gap-2">
            {GPU_OPTIONS.map(u => (
              <FilterPill
                key={u} label={u} checked={filters.gpu.includes(u)}
                onChange={() => toggle('gpu', u)}
              />
            ))}
          </div>
        </div>

        {/* Reset */}
        <button onClick={onReset} className="btn-ghost w-full justify-center text-sm">
          <X size={14} /> Réinitialiser les filtres
        </button>
      </div>
    </aside>
  )
}

/* ─── Product Card ──────────────────────────────────────────── */
function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="card flex flex-col overflow-hidden group">
      {/* Image */}
      <div className={`relative h-44 bg-gradient-to-br ${product.gradient} overflow-hidden`}>
        {product.bestseller && (
          <span className="absolute top-3 left-3 badge-purple z-10">Best-seller</span>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none">🖥️</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-g-card via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-g-text">{product.name}</h3>
            <span className="badge-blue text-[10px] shrink-0">{product.badge}</span>
          </div>
          <p className="text-g-muted text-xs line-clamp-2">{product.description}</p>
        </div>

        {/* Specs mini */}
        <ul className="space-y-1 text-xs">
          {[['CPU', product.specs.cpu], ['GPU', product.specs.gpu], ['RAM', product.specs.ram]].map(([k, v]) => (
            <li key={k} className="flex gap-2">
              <span className="text-g-muted w-7 shrink-0">{k}</span>
              <span className="text-g-text font-medium truncate">{v}</span>
            </li>
          ))}
        </ul>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-g-muted">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-g-border">
          <p className="text-xl font-extrabold gradient-text">{product.price.toLocaleString('fr-FR')} €</p>
          <div className="flex gap-1.5">
            <Link
              to={`/produit/${product.id}`}
              className="p-2 rounded-lg border border-g-border text-g-muted
                         hover:border-g-blue hover:text-g-blue hover:bg-g-blue/10 transition-all duration-150"
            >
              <ChevronRight size={16} />
            </Link>
            <button
              onClick={() => addItem({
                id: product.id, name: product.name, price: product.price,
                gradient: product.gradient, variant: '',
              })}
              className="btn-primary text-xs px-3 py-2"
            >
              <ShoppingCart size={14} /> Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
const DEFAULT_FILTERS = { maxPrice: 3000, usage: [], cpu: [], gpu: [] }

export default function Catalog() {
  const [filters,    setFilters]    = useState(DEFAULT_FILTERS)
  const [sort,       setSort]       = useState('default')
  const [search,     setSearch]     = useState('')
  const [showFilter, setShowFilter] = useState(false)

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (p.price > filters.maxPrice) return false
      if (filters.usage.length && !filters.usage.some(u => p.usage.includes(u))) return false
      if (filters.cpu.length   && !filters.cpu.includes(p.cpu_brand)) return false
      if (filters.gpu.length   && !filters.gpu.includes(p.gpu_brand)) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })

    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating)

    return list
  }, [filters, sort, search])

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="border-b border-g-border bg-g-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-g-blue text-sm font-semibold uppercase tracking-widest mb-2">Catalogue</p>
          <h1 className="section-title mb-2">
            Tous nos <span className="gradient-text">PC montés</span>
          </h1>
          <p className="text-g-muted">
            {filtered.length} configuration{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-g-muted" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input pl-9 py-2 text-sm"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input w-auto py-2 text-sm cursor-pointer"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilter(v => !v)}
            className="lg:hidden btn-secondary text-sm py-2 gap-2"
          >
            <SlidersHorizontal size={16} /> Filtres
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters (desktop always visible, mobile toggle) */}
          <div className={`${showFilter ? 'block' : 'hidden'} lg:block`}>
            <Filters
              filters={filters}
              setFilters={setFilters}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />
          </div>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-g-muted">
                <p className="text-4xl mb-4">🔍</p>
                <p className="font-semibold text-lg">Aucun résultat</p>
                <p className="text-sm mt-1">Essayez d'autres filtres.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
