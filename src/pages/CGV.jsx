const ARTICLES = [
  { title: 'Article 1 — Objet', content: `Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits réalisées par NEXUS BUILD SAS via le site nexusbuild.fr. Toute commande implique l'acceptation sans réserve des présentes CGV.` },
  { title: 'Article 2 — Produits', content: `Les produits proposés sont des configurations PC assemblées sur-mesure par nos soins. Les caractéristiques techniques sont décrites sur les fiches produits. NEXUS BUILD SAS se réserve le droit de modifier ses produits et tarifs à tout moment, les prix applicables étant ceux en vigueur au moment de la commande.` },
  { title: 'Article 3 — Prix', content: `Tous les prix sont indiqués en euros TTC (TVA 20% incluse). Les frais de livraison sont offerts pour toute commande supérieure à 1 000 € TTC. En dessous, un forfait de 29 € TTC s'applique. NEXUS BUILD SAS se réserve le droit de modifier ses prix à tout moment.` },
  { title: 'Article 4 — Commande', content: `La commande est validée après confirmation du paiement. Un email de confirmation est envoyé à l'adresse renseignée lors de l'inscription. NEXUS BUILD SAS se réserve le droit d'annuler toute commande en cas de stock insuffisant, d'erreur de prix manifeste ou de suspicion de fraude.` },
  { title: 'Article 5 — Paiement', content: `Le paiement est exigible à la commande. Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal et le virement bancaire. Les données bancaires sont transmises de manière sécurisée via SSL et ne sont jamais stockées sur nos serveurs.` },
  { title: 'Article 6 — Livraison', content: `Les délais de livraison indicatifs sont de 5 à 10 jours ouvrés. NEXUS BUILD SAS ne saurait être tenu responsable des retards dus au transporteur. Tout colis endommagé doit faire l'objet d'une réserve auprès du transporteur dans les 48h suivant la réception.` },
  { title: 'Article 7 — Droit de rétractation', content: `Conformément à l'article L221-18 du Code de la Consommation, vous disposez d'un délai de 14 jours à compter de la réception pour exercer votre droit de rétractation, sans justification. Les frais de retour sont à la charge du client sauf en cas de produit défectueux.` },
  { title: 'Article 8 — Garantie', content: `Tous nos produits bénéficient d'une garantie légale de conformité (2 ans) et d'une garantie commerciale NEXUS BUILD de 3 ans. En cas de panne, contactez notre SAV à support@nexusbuild.fr. Les frais de retour garantie sont intégralement pris en charge par NEXUS BUILD SAS.` },
  { title: 'Article 9 — Responsabilité', content: `NEXUS BUILD SAS ne saurait être tenue responsable des dommages indirects résultant de l'utilisation des produits. Notre responsabilité est limitée au montant de la commande concernée.` },
  { title: 'Article 10 — Litiges', content: `En cas de litige, une solution amiable sera recherchée en priorité. À défaut, le tribunal compétent sera celui du siège social de NEXUS BUILD SAS (Paris). Le droit français est applicable.` },
]

export default function CGV() {
  return (
    <div className="pt-16">
      <div className="bg-hero-gradient border-b border-g-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="badge-blue mb-4 inline-block">Légal</span>
          <h1 className="section-title">Conditions Générales de Vente</h1>
          <p className="text-g-muted mt-2 text-sm">En vigueur au 1er janvier 2026 — NEXUS BUILD SAS</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        {ARTICLES.map(({ title, content }) => (
          <section key={title} className="card p-6 space-y-3">
            <h2 className="font-bold text-g-text">{title}</h2>
            <p className="text-g-muted text-sm leading-relaxed">{content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
