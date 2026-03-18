const SECTIONS = [
  { title: '1. Responsable du traitement', content: `NEXUS BUILD SAS, 12 rue de la Tech, 75011 Paris.\nDélégué à la Protection des Données (DPO) : dpo@nexusbuild.fr` },
  { title: '2. Données collectées', content: `Lors de votre inscription et de vos commandes, nous collectons :\n• Données d'identité : prénom, nom\n• Données de contact : adresse email\n• Données de commande : produits achetés, montants, statuts\n• Données de connexion : date/heure, adresse IP (logs serveur)\n\nNous ne collectons pas de données de paiement (gérées par nos prestataires certifiés PCI-DSS).` },
  { title: '3. Finalités du traitement', content: `Vos données sont utilisées pour :\n• Gérer votre compte client et vos commandes\n• Vous envoyer les confirmations et mises à jour de commande\n• Améliorer nos services (analyse anonymisée)\n• Respecter nos obligations légales (facturation, comptabilité)\n\nNous ne vendons jamais vos données à des tiers.` },
  { title: '4. Base légale', content: `• Exécution d'un contrat : gestion des commandes\n• Obligation légale : conservation des factures 10 ans\n• Intérêt légitime : amélioration du service\n• Consentement : communications marketing (opt-in)` },
  { title: '5. Durée de conservation', content: `• Données de compte : durée de vie du compte + 3 ans après suppression\n• Données de commande : 10 ans (obligation comptable)\n• Logs de connexion : 12 mois\n• Données marketing : jusqu'au retrait du consentement` },
  { title: '6. Vos droits', content: `Conformément au RGPD, vous disposez des droits suivants :\n• Accès à vos données\n• Rectification de vos données\n• Effacement (droit à l'oubli)\n• Portabilité de vos données\n• Opposition au traitement\n• Limitation du traitement\n\nPour exercer ces droits : dpo@nexusbuild.fr ou via votre espace client.` },
  { title: '7. Sécurité', content: `Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement SSL/TLS, hachage des mots de passe (bcrypt), accès restreint aux données par rôle, sauvegardes quotidiennes chiffrées.` },
  { title: '8. Réclamation', content: `Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL : www.cnil.fr` },
]

export default function Confidentialite() {
  return (
    <div className="pt-16">
      <div className="bg-hero-gradient border-b border-g-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="badge-blue mb-4 inline-block">Légal</span>
          <h1 className="section-title">Politique de confidentialité</h1>
          <p className="text-g-muted mt-2 text-sm">Conforme au RGPD — Dernière mise à jour : mars 2026</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        {SECTIONS.map(({ title, content }) => (
          <section key={title} className="card p-6 space-y-3">
            <h2 className="font-bold text-g-text">{title}</h2>
            <p className="text-g-muted text-sm leading-relaxed whitespace-pre-line">{content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
