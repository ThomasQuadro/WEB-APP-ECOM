import { useState } from 'react'
import { ChevronDown, MessageCircle, Search } from 'lucide-react'

const FAQS = [
  {
    category: 'Commande & Livraison',
    items: [
      { q: 'Quels sont les délais de livraison ?', a: 'Chaque PC est assemblé et testé à la commande. Le délai standard est de 5 à 7 jours ouvrés pour les configurations standard, et jusqu\'à 10 jours pour les configurations sur-mesure. Une fois expédié, votre colis arrive en 24 à 48h par transporteur suivi.' },
      { q: 'Comment suivre ma commande ?', a: 'Dès l\'expédition de votre commande, vous recevez un email avec le numéro de suivi. Vous pouvez également retrouver l\'état de vos commandes dans votre espace client, section "Mes commandes".' },
      { q: 'Livrez-vous en dehors de la France métropolitaine ?', a: 'Nous livrons actuellement en France métropolitaine, en Belgique, en Suisse et au Luxembourg. Des frais de livraison supplémentaires peuvent s\'appliquer selon la destination.' },
      { q: 'La livraison est-elle offerte ?', a: 'La livraison est offerte pour toute commande supérieure à 1 000 €. En dessous de ce montant, un forfait de 29 € s\'applique. La livraison se fait par transporteur spécialisé avec assurance.' },
    ],
  },
  {
    category: 'Produits & Configuration',
    items: [
      { q: 'Puis-je personnaliser un PC de la boutique ?', a: 'Oui ! Sur chaque fiche produit, vous pouvez choisir des options d\'upgrade (RAM supplémentaire, stockage additionnel). Pour une configuration entièrement sur-mesure, utilisez notre Configurateur qui vous guide étape par étape.' },
      { q: 'Les PC sont-ils compatibles avec tous les jeux ?', a: 'Chaque PC est accompagné d\'une fiche technique détaillée. Nos configurations Gaming sont optimisées pour les jeux AAA. La page produit indique clairement la résolution cible (1080p, 1440p, 4K) et les FPS moyens attendus.' },
      { q: 'Les composants sont-ils de marque ?', a: 'Absolument. Nous utilisons exclusivement des composants de marques reconnues : Intel, AMD, NVIDIA, Corsair, be quiet!, Samsung, WD, ASUS ROG, MSI, NZXT... Aucun composant no-name.' },
      { q: 'Mon PC sera-t-il livré avec Windows installé ?', a: 'Nos PC sont livrés sans système d\'exploitation par défaut pour maintenir des prix compétitifs. Vous pouvez ajouter une licence Windows 11 lors de votre commande. Le BIOS est pré-configuré pour un démarrage USB facile.' },
    ],
  },
  {
    category: 'Garantie & SAV',
    items: [
      { q: 'Quelle est la durée de la garantie ?', a: 'Tous nos PC sont couverts par une garantie constructeur de 3 ans. En cas de panne, nous prenons en charge le diagnostic, la réparation ou le remplacement de la pièce défectueuse. Les frais de retour sont à notre charge.' },
      { q: 'Que faire si mon PC tombe en panne ?', a: 'Contactez notre SAV par email à support@nexusbuild.fr ou par téléphone du lundi au samedi de 9h à 19h. Nous créons un ticket de support et vous guidons pour le diagnostic. Si nécessaire, un bon de retour gratuit vous est envoyé.' },
      { q: 'Puis-je modifier mon PC après achat ?', a: 'Oui, vous pouvez modifier votre PC (ajouter de la RAM, changer le stockage...) sans perdre la garantie sur les composants d\'origine. Toute modification doit nous être signalée pour maintenir la couverture garantie.' },
    ],
  },
  {
    category: 'Paiement',
    items: [
      { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons les cartes bancaires (Visa, Mastercard, Amex), PayPal, le virement bancaire et le paiement en 3 ou 4 fois sans frais via notre partenaire financier pour les commandes supérieures à 500 €.' },
      { q: 'Le paiement est-il sécurisé ?', a: 'Oui. Toutes les transactions sont chiffrées en SSL/TLS. Nous ne stockons jamais vos informations bancaires. Les paiements par carte sont traités par notre partenaire certifié PCI-DSS.' },
      { q: 'Quand suis-je débité ?', a: 'Le débit intervient à la validation de votre commande. Si votre configuration nécessite un délai de fabrication supérieur à 7 jours, un acompte de 30% est prélevé à la commande, le solde à l\'expédition.' },
    ],
  },
]

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-g-blue/40 bg-g-blue/5' : 'border-g-border bg-g-card'}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <span className={`font-medium text-sm ${isOpen ? 'text-g-text' : 'text-g-muted'}`}>{item.q}</span>
        <ChevronDown size={16} className={`shrink-0 text-g-muted transition-transform duration-200 ${isOpen ? 'rotate-180 text-g-blue-l' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-sm text-g-muted leading-relaxed border-t border-g-border pt-4">
          {item.a}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [open,   setOpen]   = useState(null)
  const [search, setSearch] = useState('')

  const filtered = FAQS.map(cat => ({
    ...cat,
    items: cat.items.filter(i =>
      !search ||
      i.q.toLowerCase().includes(search.toLowerCase()) ||
      i.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0)

  return (
    <div className="pt-16">
      <div className="bg-hero-gradient border-b border-g-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-g-blue/30 bg-g-blue/10 text-g-blue-l text-sm font-medium mb-6">
            <MessageCircle size={14} /> Aide & Support
          </div>
          <h1 className="section-title mb-4">Questions <span className="gradient-text">fréquentes</span></h1>
          <p className="text-g-muted mb-8">Trouvez rapidement une réponse à vos questions.</p>
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-g-muted" />
            <input
              type="text" placeholder="Rechercher une question..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="input pl-10 py-3 text-sm w-full"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {filtered.length === 0 ? (
          <p className="text-center text-g-muted py-12">Aucun résultat pour "{search}"</p>
        ) : (
          filtered.map(cat => (
            <div key={cat.category}>
              <h2 className="text-lg font-bold text-g-text mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-blue-purple inline-block" />
                {cat.category}
              </h2>
              <div className="space-y-2">
                {cat.items.map((item, i) => (
                  <AccordionItem
                    key={i} item={item}
                    isOpen={open === `${cat.category}-${i}`}
                    onToggle={() => setOpen(open === `${cat.category}-${i}` ? null : `${cat.category}-${i}`)}
                  />
                ))}
              </div>
            </div>
          ))
        )}

        <div className="card p-8 text-center border-g-blue/30 bg-g-blue/5">
          <p className="font-bold text-g-text mb-2">Vous n'avez pas trouvé votre réponse ?</p>
          <p className="text-g-muted text-sm mb-5">Notre équipe est disponible du lundi au samedi de 9h à 19h.</p>
          <a href="mailto:support@nexusbuild.fr" className="btn-primary text-sm px-5 py-2.5 inline-flex">
            <MessageCircle size={15} /> Contacter le support
          </a>
        </div>
      </div>
    </div>
  )
}
