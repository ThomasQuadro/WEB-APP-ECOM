import { Link } from 'react-router-dom'
import { Zap, Mail, Phone, MapPin, Github, Twitter, Youtube, Instagram } from 'lucide-react'

const LINKS = {
  boutique: [
    { label: 'Tous les PC',       to: '/boutique' },
    { label: 'PC Gaming',         to: '/boutique' },
    { label: 'PC Streaming',      to: '/boutique' },
    { label: 'PC Bureautique',    to: '/boutique' },
    { label: 'Configurateur',     to: '/configurateur' },
  ],
  support: [
    { label: 'Mon compte',        to: '/dashboard' },
    { label: 'Mes commandes',     to: '/dashboard' },
    { label: 'Garantie & SAV',    to: '/garantie' },
    { label: "Guide d'achat",     to: '/guide' },
    { label: 'FAQ',               to: '/faq' },
  ],
  legal: [
    { label: 'Mentions légales',             to: '/mentions-legales' },
    { label: 'CGV',                          to: '/cgv' },
    { label: 'Politique de confidentialité', to: '/confidentialite' },
    { label: 'Cookies',                      to: '/cookies' },
  ],
}

const SOCIALS = [
  { icon: Twitter,   href: '#', label: 'Twitter' },
  { icon: Youtube,   href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github,    href: '#', label: 'GitHub' },
]

const PAYMENT_BADGES = ['VISA', 'MC', 'PayPal', 'Virement']

export default function Footer() {
  return (
    <footer className="border-t border-g-border bg-g-card mt-0">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand col — 2 cols wide */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-blue-purple flex items-center justify-center
                              group-hover:shadow-[0_0_16px_rgba(59,130,246,0.5)] transition-all duration-200">
                <Zap size={20} className="text-white" fill="white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-g-text">
                NEXT<span className="gradient-text"> BUILD</span>
              </span>
            </Link>

            <p className="text-g-muted text-sm leading-relaxed max-w-xs">
              Spécialiste du PC sur-mesure depuis 2019. Chaque machine est assemblée,
              testée et garantie 3 ans par nos techniciens passionnés.
            </p>

            {/* Contact */}
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5 text-g-muted hover:text-g-text transition-colors">
                <Mail size={14} className="text-g-blue shrink-0" />
                <span>support@nextbuild.fr</span>
              </li>
              <li className="flex items-center gap-2.5 text-g-muted hover:text-g-text transition-colors">
                <Phone size={14} className="text-g-blue shrink-0" />
                <span>+33 1 23 45 67 89 — Lun–Sam 9h/19h</span>
              </li>
              <li className="flex items-center gap-2.5 text-g-muted hover:text-g-text transition-colors">
                <MapPin size={14} className="text-g-blue shrink-0" />
                <span>12 rue de la Tech, 75011 Paris</span>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label} href={href} aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-g-border
                             text-g-muted hover:text-g-blue-l hover:border-g-blue hover:bg-g-blue/10
                             transition-all duration-150"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Boutique */}
          <div>
            <p className="text-xs font-bold text-g-muted uppercase tracking-widest mb-4">Boutique</p>
            <ul className="space-y-2.5">
              {LINKS.boutique.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}
                    className="text-sm text-g-muted hover:text-g-text transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-bold text-g-muted uppercase tracking-widest mb-4">Support</p>
            <ul className="space-y-2.5">
              {LINKS.support.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}
                    className="text-sm text-g-muted hover:text-g-text transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <p className="text-xs font-bold text-g-muted uppercase tracking-widest mb-4">Légal</p>
            <ul className="space-y-2.5">
              {LINKS.legal.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}
                    className="text-sm text-g-muted hover:text-g-text transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="mt-8 space-y-2">
              <p className="text-xs font-bold text-g-muted uppercase tracking-widest">Paiement sécurisé</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {PAYMENT_BADGES.map(b => (
                  <span key={b}
                    className="px-2.5 py-1 rounded border border-g-border text-g-muted text-xs font-semibold">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-g-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-g-muted text-center sm:text-left">
            © {new Date().getFullYear()} NEXT BUILD — Tous droits réservés.
            Assemblé avec passion 🇫🇷
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-g-green animate-pulse" />
            <span className="text-xs text-g-muted">Tous les services opérationnels</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
