import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Zap, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { to: '/',              label: 'Accueil' },
  { to: '/boutique',      label: 'Boutique' },
  { to: '/configurateur', label: 'Configurateur' },
]

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart()
  const location = useLocation()
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  // Ferme menu mobile au changement de route
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Effet de fond à l'scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-g-bg/95 backdrop-blur-md border-b border-g-border shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-purple flex items-center justify-center
                          group-hover:shadow-[0_0_16px_rgba(59,130,246,0.6)] transition-all duration-200">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-g-text">
            NEXUS<span className="gradient-text"> BUILD</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'text-g-blue-l bg-g-blue/10'
                    : 'text-g-muted hover:text-g-text hover:bg-white/5'
                }`}
              >
                {label}
                {active && (
                  <span className="block mt-0.5 h-0.5 w-full rounded-full bg-blue-purple" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-lg border border-g-border text-g-muted
                       hover:border-g-blue hover:text-g-blue hover:bg-g-blue/10
                       transition-all duration-150"
            aria-label="Panier"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1
                               flex items-center justify-center text-[10px] font-bold
                               rounded-full bg-blue-purple text-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2.5 rounded-lg border border-g-border text-g-muted
                       hover:text-g-text hover:bg-white/5 transition-all duration-150"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-g-card/95 backdrop-blur-md border-t border-g-border px-4 py-3 space-y-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-g-blue-l bg-g-blue/10'
                    : 'text-g-muted hover:text-g-text hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
