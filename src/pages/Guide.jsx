import { Link } from 'react-router-dom'
import { Monitor, Cpu, Zap, Target, ArrowRight, CheckCircle } from 'lucide-react'

const USAGES = [
  {
    icon: <Monitor size={32} />,
    title: 'Gaming 1080p',
    target: 'Budget : 700 € – 1 100 €',
    color: 'text-g-blue-l',
    bg: 'bg-g-blue/10 border-g-blue/20',
    desc: 'Pour jouer à tous les jeux en qualité Ultra avec 60 à 144 FPS stables. Idéal pour débuter ou les joueurs occasionnels.',
    specs: ['GPU : RTX 3060 / RX 7600', 'CPU : Ryzen 5 5600 / i5-13400', 'RAM : 16 GB DDR4', 'Stockage : 500 GB NVMe'],
    badge: 'Entrée / Mid Gaming',
  },
  {
    icon: <Zap size={32} />,
    title: 'Gaming 1440p',
    target: 'Budget : 1 100 € – 2 000 €',
    color: 'text-g-purple-l',
    bg: 'bg-g-purple/10 border-g-purple/20',
    desc: 'La résolution préférée des gamers exigeants. 144 FPS+ en Ultra sur les derniers AAA. Le sweet spot qualité/prix.',
    specs: ['GPU : RTX 4070 / RX 7800 XT', 'CPU : i5-13600K / Ryzen 7 7800X3D', 'RAM : 32 GB DDR4/DDR5', 'Stockage : 1 TB NVMe PCIe 4.0'],
    badge: 'Mid / High Gaming',
  },
  {
    icon: <Target size={32} />,
    title: 'Gaming 4K',
    target: 'Budget : 2 000 € – 3 500 €',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/20',
    desc: 'L\'expérience visuelle ultime. 4K à 60+ FPS en Ultra avec ray tracing. Pour les puristes qui ne font aucun compromis.',
    specs: ['GPU : RTX 4080 Super / RTX 4090', 'CPU : i9-14900K / Ryzen 9 7950X', 'RAM : 32–64 GB DDR5', 'Stockage : 2 TB NVMe PCIe 5.0'],
    badge: 'High End / No Compromise',
  },
  {
    icon: <Cpu size={32} />,
    title: 'Streaming & Création',
    target: 'Budget : 1 400 € – 2 500 €',
    color: 'text-g-green',
    bg: 'bg-g-green/10 border-g-green/20',
    desc: 'Streamer en 1080p60 ou créer du contenu vidéo demande un CPU puissant. Ces configs combinent gaming et productivité.',
    specs: ['CPU : Ryzen 9 5900X / i9-13900K', 'GPU : RTX 3080 / RTX 4080', 'RAM : 32–64 GB DDR4/DDR5', 'Stockage : SSD NVMe + HDD'],
    badge: 'Streaming / Creator',
  },
]

const GLOSSARY = [
  { term: 'GPU',        def: 'Carte graphique — le composant le plus important pour le gaming. Détermine la résolution et les FPS.' },
  { term: 'CPU',        def: 'Processeur — gère la logique du jeu, l\'IA, la physique. Crucial pour le streaming et la création.' },
  { term: 'RAM',        def: '16 GB minimum pour le gaming, 32 GB recommandés. La DDR5 apporte un gain notable en créatif.' },
  { term: 'NVMe',       def: 'Type de SSD ultra-rapide (3 500 à 7 500 Mo/s). Réduit drastiquement les temps de chargement.' },
  { term: 'TDP',        def: 'Puissance thermique dissipée. Indicateur de la chaleur produite par un CPU ou un GPU.' },
  { term: 'DLSS / FSR', def: 'Technologies d\'upscaling IA (NVIDIA / AMD). Boostent les FPS avec peu d\'impact visuel.' },
  { term: 'PCIe 4/5',   def: 'Interface pour GPU et SSD. La gen 5.0 offre des débits jusqu\'à 14 Go/s pour les SSD.' },
  { term: 'AIO',        def: 'Watercooling tout-en-un. Radiateur + pompe pré-assemblés pour un refroidissement optimal.' },
]

export default function Guide() {
  return (
    <div className="pt-16">
      <div className="bg-hero-gradient border-b border-g-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="badge-blue mb-6 inline-block">Guide d'achat</span>
          <h1 className="section-title mb-4">
            Quel PC choisir <span className="gradient-text">selon votre usage ?</span>
          </h1>
          <p className="text-g-muted max-w-2xl mx-auto">
            Pas besoin d'être expert. On vous explique simplement comment choisir
            la configuration parfaite selon votre budget et vos besoins.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Usage cards */}
        <section className="space-y-6">
          <h2 className="section-title">Choisir <span className="gradient-text">par usage</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {USAGES.map(u => (
              <div key={u.title} className={`card p-6 border ${u.bg} space-y-4`}>
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-14 h-14 rounded-xl border ${u.bg} flex items-center justify-center ${u.color}`}>
                    {u.icon}
                  </div>
                  <span className="badge-blue text-xs shrink-0">{u.badge}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-g-text">{u.title}</h3>
                  <p className={`text-sm font-semibold ${u.color} mt-0.5`}>{u.target}</p>
                  <p className="text-g-muted text-sm mt-2 leading-relaxed">{u.desc}</p>
                </div>
                <ul className="space-y-1.5">
                  {u.specs.map(s => (
                    <li key={s} className={`flex items-center gap-2 text-sm text-g-text`}>
                      <CheckCircle size={13} className={u.color} /> {s}
                    </li>
                  ))}
                </ul>
                <Link to="/boutique" className="btn-primary text-sm px-4 py-2.5 w-full justify-center">
                  Voir les configs <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Glossaire */}
        <section className="space-y-6">
          <h2 className="section-title">Lexique <span className="gradient-text">technique</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GLOSSARY.map(({ term, def }) => (
              <div key={term} className="card p-4 flex gap-3 items-start">
                <span className="badge-purple shrink-0">{term}</span>
                <p className="text-sm text-g-muted leading-relaxed">{def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="card p-10 text-center border-g-blue/30 bg-g-blue/5">
          <h3 className="text-2xl font-extrabold text-g-text mb-3">
            Toujours pas sûr de votre choix ?
          </h3>
          <p className="text-g-muted mb-6 max-w-md mx-auto">
            Utilisez notre configurateur pour construire votre PC pièce par pièce,
            ou contactez-nous directement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/configurateur" className="btn-primary px-6 py-3">
              Lancer le configurateur <ArrowRight size={16} />
            </Link>
            <Link to="/boutique" className="btn-secondary px-6 py-3">Voir la boutique</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
