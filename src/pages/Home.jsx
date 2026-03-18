import { Link } from 'react-router-dom'
import {
  ArrowRight, Wrench, ShieldCheck, Truck, Headphones,
  Star, ShoppingCart, Zap, ChevronRight
} from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

/* ─── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-g-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-g-purple/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center animate-fade-up">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-g-blue/30
                        bg-g-blue/10 text-g-blue-l text-sm font-medium mb-8">
          <Zap size={14} fill="currentColor" />
          <span>PC assemblés sur-mesure en France</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-g-text mb-6">
          Assemblez<br />
          <span className="gradient-text">votre légende.</span>
        </h1>

        <p className="text-lg sm:text-xl text-g-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Des PC gaming et workstation montés par des experts, garantis 3 ans,
          expédiés en 48h. Configurez le vôtre ou choisissez parmi nos modèles prêts à jouer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/boutique" className="btn-primary text-base px-8 py-4 animate-glow-pulse">
            Découvrir nos PC <ArrowRight size={18} />
          </Link>
          <Link to="/configurateur" className="btn-secondary text-base px-8 py-4">
            <Wrench size={18} /> Créer sur-mesure
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[
            { value: '4 800+', label: 'PC assemblés' },
            { value: '3 ans',  label: 'Garantie' },
            { value: '48h',    label: 'Expédition' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-extrabold gradient-text">{value}</p>
              <p className="text-xs text-g-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-g-muted">
        <div className="w-px h-10 bg-gradient-to-b from-g-border to-transparent" />
        <span className="text-xs">Scroll</span>
      </div>
    </section>
  )
}

/* ─── Product Card ──────────────────────────────────────────── */
function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="card flex flex-col overflow-hidden group">
      {/* Image */}
      <div className={`relative h-52 bg-gradient-to-br ${product.gradient} overflow-hidden`}>
        {product.bestseller && (
          <span className="absolute top-3 left-3 badge-purple z-10">Best-seller</span>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl group-hover:scale-110 transition-transform duration-300 select-none">🖥️</span>
        </div>
        {/* Glow overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-g-card via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-lg text-g-text">{product.name}</h3>
            <span className="badge-blue shrink-0">{product.badge}</span>
          </div>
          <p className="text-g-muted text-sm line-clamp-2">{product.description}</p>
        </div>

        {/* Key specs */}
        <ul className="space-y-1.5 text-sm">
          {[
            ['CPU', product.specs.cpu],
            ['GPU', product.specs.gpu],
            ['RAM', product.specs.ram],
          ].map(([k, v]) => (
            <li key={k} className="flex gap-2">
              <span className="text-g-muted w-8 shrink-0">{k}</span>
              <span className="text-g-text font-medium truncate">{v}</span>
            </li>
          ))}
        </ul>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-sm">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-g-muted">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-g-border">
          <div>
            <p className="text-2xl font-extrabold gradient-text">{product.price.toLocaleString('fr-FR')} €</p>
            <p className="text-xs text-g-muted">TTC, garantie 3 ans</p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/produit/${product.id}`}
              className="p-2.5 rounded-lg border border-g-border text-g-muted
                         hover:border-g-blue hover:text-g-blue hover:bg-g-blue/10 transition-all duration-150"
              title="Voir le produit"
            >
              <ChevronRight size={18} />
            </Link>
            <button
              onClick={() => addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                gradient: product.gradient,
                variant: '',
              })}
              className="btn-primary text-sm px-4 py-2.5"
            >
              <ShoppingCart size={16} /> Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Best Sellers ──────────────────────────────────────────── */
function BestSellers() {
  const bestsellers = products.filter(p => p.bestseller)

  return (
    <section className="section">
      <div className="text-center mb-12">
        <p className="text-g-blue text-sm font-semibold uppercase tracking-widest mb-3">Nos recommandations</p>
        <h2 className="section-title mb-4">
          Nos <span className="gradient-text">Best-Sellers</span>
        </h2>
        <p className="text-g-muted max-w-xl mx-auto">
          Les configurations les plus plébiscitées par notre communauté, testées et approuvées.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      <div className="text-center mt-10">
        <Link to="/boutique" className="btn-secondary">
          Voir tout le catalogue <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}

/* ─── Why Us ────────────────────────────────────────────────── */
function WhyUs() {
  const FEATURES = [
    {
      icon: <Wrench size={28} />,
      title: 'Montage professionnel',
      desc: 'Chaque PC est assemblé et testé 72h par nos techniciens certifiés avant expédition.',
      color: 'text-g-blue-l',
      bg: 'bg-g-blue/10 border-g-blue/20',
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Garantie 3 ans',
      desc: 'Retour gratuit, remplacement pièce sous 48h. Notre SAV est disponible 6j/7.',
      color: 'text-g-purple-l',
      bg: 'bg-g-purple/10 border-g-purple/20',
    },
    {
      icon: <Truck size={28} />,
      title: 'Expédition 48h',
      desc: 'Votre PC est emballé sécurisé et livré en 48h ouvrées via transporteur suivi.',
      color: 'text-g-green',
      bg: 'bg-g-green/10 border-g-green/20',
    },
    {
      icon: <Headphones size={28} />,
      title: 'Support expert',
      desc: 'Des passionnés à votre écoute pour vous aider à choisir ou configurer votre build.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10 border-yellow-400/20',
    },
  ]

  return (
    <section className="section border-t border-g-border">
      <div className="text-center mb-12">
        <p className="text-g-purple-l text-sm font-semibold uppercase tracking-widest mb-3">Notre engagement</p>
        <h2 className="section-title mb-4">
          Pourquoi nous <span className="gradient-text">choisir ?</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map(({ icon, title, desc, color, bg }) => (
          <div
            key={title}
            className={`card p-6 border ${bg} flex flex-col gap-4`}
          >
            <div className={`w-14 h-14 rounded-xl border ${bg} flex items-center justify-center ${color}`}>
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-g-text mb-2">{title}</h3>
              <p className="text-g-muted text-sm leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── CTA Banner ────────────────────────────────────────────── */
function CtaBanner() {
  return (
    <section className="section">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-g-blue/20 via-g-purple/20 to-g-blue/20
                       border border-g-blue/30 p-10 text-center">
        <div className="absolute inset-0 bg-hero-gradient opacity-50" />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-g-text mb-4">
            Envie d'un PC <span className="gradient-text">unique</span> ?
          </h2>
          <p className="text-g-muted max-w-xl mx-auto mb-8">
            Avec notre configurateur, construisez votre machine pièce par pièce et
            visualisez le prix en temps réel.
          </p>
          <Link to="/configurateur" className="btn-primary text-base px-8 py-4">
            <Wrench size={18} /> Lancer le configurateur <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <BestSellers />
      <WhyUs />
      <CtaBanner />
    </>
  )
}
