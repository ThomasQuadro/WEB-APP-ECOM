const ARTICLES = [
  { title: '1. Éditeur du site', content: `NEXUS BUILD SAS\nCapital social : 50 000 €\nSiège social : 12 rue de la Tech, 75011 Paris, France\nRCS Paris : 123 456 789\nN° TVA intracommunautaire : FR 12 123456789\nDirecteur de la publication : Thomas Dupont` },
  { title: '2. Hébergement', content: `Le site nexusbuild.fr est hébergé par :\nAmazon Web Services EMEA SARL\n38 avenue John F. Kennedy, L-1855 Luxembourg\nwww.aws.amazon.com` },
  { title: '3. Propriété intellectuelle', content: `L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes, icônes) est la propriété exclusive de NEXUS BUILD SAS ou de ses partenaires. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable écrite.` },
  { title: '4. Responsabilité', content: `NEXUS BUILD SAS s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Cependant, elle ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition. NEXUS BUILD SAS décline toute responsabilité pour tout dommage résultant d'une intrusion frauduleuse, d'une indisponibilité du service ou d'une utilisation non conforme.` },
  { title: '5. Données personnelles', content: `Les données collectées sur ce site font l'objet d'un traitement informatique conformément au RGPD. Pour en savoir plus, consultez notre Politique de confidentialité. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant : dpo@nexusbuild.fr` },
  { title: '6. Cookies', content: `Ce site utilise des cookies pour améliorer votre expérience. Consultez notre Politique de cookies pour plus d'informations sur les types de cookies utilisés et la manière de les gérer.` },
  { title: '7. Contact', content: `Pour toute question juridique :\nEmail : legal@nexusbuild.fr\nCourrier : NEXUS BUILD SAS — Service Juridique\n12 rue de la Tech, 75011 Paris` },
]

export default function MentionsLegales() {
  return (
    <div className="pt-16">
      <div className="bg-hero-gradient border-b border-g-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="badge-blue mb-4 inline-block">Légal</span>
          <h1 className="section-title">Mentions légales</h1>
          <p className="text-g-muted mt-2 text-sm">Dernière mise à jour : mars 2026</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        {ARTICLES.map(({ title, content }) => (
          <section key={title} className="card p-6 space-y-3">
            <h2 className="font-bold text-g-text">{title}</h2>
            <p className="text-g-muted text-sm leading-relaxed whitespace-pre-line">{content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
