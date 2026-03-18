import { Link } from 'react-router-dom'
import { ShieldCheck, Wrench, Truck, Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const STEPS = [
  { icon: <Mail size={22} />,        step: '01', title: 'Contactez le SAV',   desc: 'Par email ou téléphone. Décrivez le problème. Nous créons un ticket sous 2h.' },
  { icon: <Wrench size={22} />,      step: '02', title: 'Diagnostic',          desc: 'Nos techniciens analysent votre situation et proposent une solution adaptée.' },
  { icon: <Truck size={22} />,       step: '03', title: 'Retour gratuit',      desc: 'Si nécessaire, un bon de retour prépayé vous est envoyé par email.' },
  { icon: <CheckCircle size={22} />, step: '04', title: 'Réparation & Retour', desc: 'Réparation sous 5 jours ouvrés. Votre PC vous est renvoyé en express.' },
]

const COVERED = [
  'Défauts de fabrication des composants',
  'Pannes matérielles (CPU, GPU, RAM, stockage)',
  'Problèmes de carte mère ou d\'alimentation',
  'Défauts d\'assemblage de notre atelier',
  'Remplacement de pièce défectueuse à l\'identique',
  'Frais de retour et de réexpédition pris en charge',
]

const NOT_COVERED = [
  'Dommages causés par une mauvaise utilisation',
  'Surchauffe due à un environnement inadéquat',
  'Modifications non déclarées (remplacement GPU...)',
  'Dégâts liquides ou chocs physiques',
  'Logiciels, virus ou problèmes système',
  'Usure normale des ventilateurs après 3 ans',
]

export default function Garantie() {
  return (
    <div className="pt-16">
      <div className="bg-hero-gradient border-b border-g-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-g-blue/30 bg-g-blue/10 text-g-blue-l text-sm font-medium mb-6">
            <ShieldCheck size={14} /> Garantie & SAV
          </div>
          <h1 className="section-title mb-4">
            Votre tranquillité d'esprit,<br /><span className="gradient-text">notre priorité.</span>
          </h1>
          <p className="text-g-muted max-w-xl mx-auto">
            Chaque PC NEXT BUILD est couvert par une garantie 3 ans complète.
            Notre SAV est là pour vous, 6 jours sur 7.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: <ShieldCheck size={28} />, title: '3 ans de garantie', desc: 'Pièces et main-d\'œuvre incluses. La plus longue garantie du marché.', color: 'text-g-blue-l', bg: 'bg-g-blue/10 border-g-blue/20' },
            { icon: <Truck size={28} />,       title: 'Retour gratuit',    desc: 'Bon de retour prépayé envoyé par email. Aucun frais caché.',           color: 'text-g-green',   bg: 'bg-g-green/10 border-g-green/20' },
            { icon: <Clock size={28} />,       title: 'Réponse en 2h',    desc: 'Notre équipe SAV répond à chaque ticket sous 2 heures ouvrées.',       color: 'text-g-purple-l',bg: 'bg-g-purple/10 border-g-purple/20' },
          ].map(({ icon, title, desc, color, bg }) => (
            <div key={title} className={`card p-6 border ${bg} text-center space-y-3`}>
              <div className={`w-14 h-14 rounded-xl border ${bg} flex items-center justify-center ${color} mx-auto`}>{icon}</div>
              <p className="font-bold text-g-text">{title}</p>
              <p className="text-sm text-g-muted">{desc}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <section className="space-y-6">
          <h2 className="section-title">Comment fonctionne le <span className="gradient-text">SAV ?</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map(({ icon, step, title, desc }) => (
              <div key={step} className="card p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black gradient-text leading-none">{step}</span>
                  <div className="w-10 h-10 rounded-xl bg-g-blue/10 border border-g-blue/20 flex items-center justify-center text-g-blue-l">
                    {icon}
                  </div>
                </div>
                <p className="font-semibold text-g-text">{title}</p>
                <p className="text-sm text-g-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Couvert / Non couvert */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="card p-6 border-g-green/20 bg-g-green/5 space-y-4">
            <h3 className="font-bold text-g-text flex items-center gap-2">
              <CheckCircle size={18} className="text-g-green" /> Ce qui est couvert
            </h3>
            <ul className="space-y-2.5">
              {COVERED.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-g-muted">
                  <CheckCircle size={13} className="text-g-green shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6 border-red-500/20 bg-red-500/5 space-y-4">
            <h3 className="font-bold text-g-text flex items-center gap-2">
              <AlertCircle size={18} className="text-red-400" /> Hors garantie
            </h3>
            <ul className="space-y-2.5">
              {NOT_COVERED.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-g-muted">
                  <AlertCircle size={13} className="text-red-400 shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact SAV */}
        <div className="card p-8 border-g-blue/30 bg-g-blue/5 space-y-5">
          <h3 className="font-bold text-xl text-g-text">Contacter le SAV</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="mailto:support@nextbuild.fr"
              className="flex items-center gap-3 p-4 rounded-xl border border-g-border bg-g-card hover:border-g-blue transition-all">
              <Mail size={20} className="text-g-blue-l" />
              <div>
                <p className="font-medium text-g-text text-sm">Email</p>
                <p className="text-g-muted text-xs">support@nextbuild.fr</p>
              </div>
            </a>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-g-border bg-g-card">
              <Phone size={20} className="text-g-blue-l" />
              <div>
                <p className="font-medium text-g-text text-sm">Téléphone</p>
                <p className="text-g-muted text-xs">+33 1 23 45 67 89 — Lun–Sam 9h/19h</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-g-muted">
            Merci de préparer votre numéro de commande avant de nous contacter. Il est disponible dans votre{' '}
            <Link to="/dashboard" className="text-g-blue-l hover:underline">espace client</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
