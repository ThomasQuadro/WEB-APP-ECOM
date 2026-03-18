import { useState } from 'react'
import { Check } from 'lucide-react'

const TYPES = [
  {
    key: null,
    name: 'Cookies essentiels',
    required: true,
    desc: 'Nécessaires au fonctionnement du site. Ils permettent la navigation, la gestion du panier et de la session utilisateur. Ne peuvent pas être désactivés.',
    examples: ["Session d'authentification (JWT)", 'Panier d\'achat (localStorage)', 'Préférences de navigation'],
    duration: 'Session ou 7 jours',
  },
  {
    key: 'analytics',
    name: 'Cookies analytiques',
    required: false,
    desc: 'Nous aident à comprendre comment vous utilisez le site afin d\'améliorer notre service. Les données sont anonymisées et agrégées.',
    examples: ['Pages visitées', 'Temps passé sur le site', 'Taux de conversion'],
    duration: '13 mois',
  },
  {
    key: 'marketing',
    name: 'Cookies marketing',
    required: false,
    desc: 'Permettent d\'afficher des publicités pertinentes selon vos centres d\'intérêt. Désactivables à tout moment sans impact sur le service.',
    examples: ['Retargeting', 'Mesure des campagnes', 'Personnalisation des annonces'],
    duration: '13 mois',
  },
]

export default function Cookies() {
  const [prefs,  setPrefs]  = useState({ analytics: true, marketing: false })
  const [saved,  setSaved]  = useState(false)

  function toggle(key) {
    setPrefs(p => ({ ...p, [key]: !p[key] }))
    setSaved(false)
  }

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="pt-16">
      <div className="bg-hero-gradient border-b border-g-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="badge-blue mb-4 inline-block">Légal</span>
          <h1 className="section-title">Politique de cookies</h1>
          <p className="text-g-muted mt-2 text-sm">Gérez vos préférences ci-dessous.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-5">

        {/* Intro */}
        <div className="card p-6 space-y-3">
          <h2 className="font-bold text-g-text">Qu'est-ce qu'un cookie ?</h2>
          <p className="text-g-muted text-sm leading-relaxed">
            Un cookie est un petit fichier texte déposé sur votre terminal lors de votre visite sur notre site.
            Il permet de mémoriser vos préférences et d'améliorer votre expérience.
            Conformément au RGPD et à la directive ePrivacy, votre consentement est requis pour les cookies non essentiels.
          </p>
        </div>

        {/* Cookie types */}
        {TYPES.map(ct => (
          <div key={ct.name} className="card p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-g-text">{ct.name}</h3>
                <p className="text-xs text-g-muted mt-0.5">Durée de conservation : {ct.duration}</p>
              </div>
              {ct.required ? (
                <span className="badge-green shrink-0">Toujours actif</span>
              ) : (
                <button
                  onClick={() => toggle(ct.key)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-200 shrink-0 ${prefs[ct.key] ? 'bg-g-blue' : 'bg-g-border'}`}
                  aria-label={`${prefs[ct.key] ? 'Désactiver' : 'Activer'} ${ct.name}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${prefs[ct.key] ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              )}
            </div>
            <p className="text-sm text-g-muted leading-relaxed">{ct.desc}</p>
            <div className="flex flex-wrap gap-2">
              {ct.examples.map(ex => (
                <span key={ex} className="text-xs px-2.5 py-1 rounded-full bg-g-border text-g-muted">{ex}</span>
              ))}
            </div>
          </div>
        ))}

        {/* Save */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-sm text-g-muted">Vos préférences sont sauvegardées localement dans votre navigateur.</p>
          <button onClick={save} className="btn-primary text-sm px-5 py-2.5 shrink-0">
            {saved ? <><Check size={15} /> Sauvegardé !</> : 'Enregistrer mes choix'}
          </button>
        </div>
      </div>
    </div>
  )
}
