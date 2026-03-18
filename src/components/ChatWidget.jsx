import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Zap } from 'lucide-react'

// ---------------------------------------------------------------------------
// Knowledge base — keyword rules
// ---------------------------------------------------------------------------
const RULES = [
  {
    keys: ['bonjour', 'salut', 'hello', 'bonsoir', 'coucou', 'hey'],
    answer: 'Bonjour ! 👋 Je suis NexusBot, votre assistant NEXUS BUILD. Je peux vous aider à choisir un PC, répondre à vos questions sur la garantie, la livraison ou les composants. Par quoi puis-je commencer ?',
  },
  {
    keys: ['starter', '649', 'entrée de gamme', 'pas cher', 'budget', 'petit budget'],
    answer: '💻 **NEXUS STARTER — 649 €**\nRyzen 5 5600 + RTX 3060 12 GB + 16 Go RAM + SSD 500 Go.\nParfait pour le gaming 1080p (60–144 fps selon les jeux). Idéal si votre budget est serré ou si vous débutez en gaming PC.',
  },
  {
    keys: ['gamer', '999', '1000', '1080p', 'mille euro'],
    answer: '🎮 **NEXUS GAMER — 999 €**\nRyzen 5 7600X + RTX 4070 12 GB + 32 Go RAM + SSD 1 To.\nExcellent rapport qualité/prix pour le 1080p ultra et le 1440p. Le choix le plus populaire de notre gamme.',
  },
  {
    keys: ['pro', '1499', '1440p', 'qhd'],
    answer: '🚀 **NEXUS PRO — 1 499 €**\nRyzen 7 7700X + RTX 4070 Ti 12 GB + 32 Go RAM + SSD 1 To.\nConçu pour le gaming 1440p ultra et le 4K correct. Un excellent équilibre puissance/prix.',
  },
  {
    keys: ['ultra', '2299', '4k', 'haut de gamme', 'meilleur', 'top'],
    answer: '👑 **NEXUS ULTRA — 2 299 €**\nRyzen 9 7900X + RTX 4090 24 GB + 64 Go RAM + SSD 2 To.\nLe summum de notre gamme : 4K ultra, VR, aucun compromis. Pour les joueurs qui ne veulent pas attendre.',
  },
  {
    keys: ['stream', 'streaming', '1199', 'twitch', 'youtube', 'obs'],
    answer: '🎥 **NEXUS STREAM — 1 199 €**\nRyzen 9 7900X (12 cœurs) + RTX 4070 12 GB + 32 Go RAM + SSD 1 To.\nOptimisé pour jouer ET streamer simultanément grâce aux nombreux cœurs du Ryzen 9.',
  },
  {
    keys: ['creator', 'créateur', '1799', 'montage', 'vidéo', 'photo', 'blender', '3d'],
    answer: '🎨 **NEXUS CREATOR — 1 799 €**\nRyzen 9 7950X (16 cœurs) + RTX 4080 16 GB + 64 Go RAM + SSD 2 To.\nTaillé pour la création de contenu, le montage vidéo 4K, le rendu 3D et le gaming haute performance.',
  },
  {
    keys: ['office', 'bureautique', '449', 'travail', 'bureau', 'excel', 'word'],
    answer: '💼 **NEXUS OFFICE — 449 €**\nRyzen 5 5600G (APU intégré) + 16 Go RAM + SSD 500 Go.\nParfait pour la bureautique, la navigation web et les tâches professionnelles. Compact et silencieux.',
  },
  {
    keys: ['mini', '799', 'compact', 'petit', 'format'],
    answer: '📦 **NEXUS MINI — 799 €**\nRyzen 5 7600 + RTX 4060 8 GB + 16 Go RAM + SSD 500 Go.\nFormat mini-ITX ultra compact. Même performances qu\'un tour classique dans un boîtier minuscule.',
  },
  {
    keys: ['garantie', 'sav', 'panne', 'réparation', 'retour', 'remboursement'],
    answer: '🛡️ **Garantie NEXUS BUILD**\n• Garantie commerciale **3 ans** pièces & main d\'œuvre\n• Garantie légale de conformité 2 ans incluse\n• En cas de panne : contactez support@nexusbuild.fr\n• Frais de retour SAV **pris en charge** par NEXUS BUILD\n• Droit de rétractation 14 jours après réception',
  },
  {
    keys: ['livraison', 'délai', 'expédition', 'transport', 'envoi', 'quand', 'recevoir'],
    answer: '📦 **Livraison**\n• Délai indicatif : **5 à 10 jours ouvrés** (assemblage + tests)\n• Livraison **gratuite** à partir de 1 000 €\n• En dessous : forfait 29 € TTC\n• Tout colis endommagé doit faire l\'objet d\'une réserve auprès du transporteur sous 48h',
  },
  {
    keys: ['paiement', 'payer', 'visa', 'mastercard', 'paypal', 'virement', 'carte'],
    answer: '💳 **Moyens de paiement acceptés**\n• Carte bancaire (Visa, Mastercard)\n• PayPal\n• Virement bancaire\n\nToutes les transactions sont sécurisées via SSL. Vos données bancaires ne sont jamais stockées sur nos serveurs.',
  },
  {
    keys: ['configurateur', 'configurer', 'personnalis', 'sur-mesure', 'assembl'],
    answer: '🔧 **Configurateur PC**\nNotre configurateur vous guide en 8 étapes pour créer votre PC sur-mesure :\nBoîtier → Carte mère → CPU → GPU → RAM → Stockage → Refroidissement → Alimentation\n\nRendez-vous dans l\'onglet **Configurateur** pour commencer !',
  },
  {
    keys: ['cpu', 'processeur', 'ryzen', 'intel', 'amd'],
    answer: '⚙️ **Processeurs**\nNous utilisons principalement des **AMD Ryzen** (séries 5000 et 7000) :\n• Ryzen 5 5600 / 7600X → polyvalents, excellent rapport qualité/prix\n• Ryzen 7 7700X → gaming haute performance\n• Ryzen 9 7900X / 7950X → streaming, création, workstation\n\nLe Ryzen 7000 apporte l\'AM5 (socket durable pour les années à venir).',
  },
  {
    keys: ['gpu', 'carte graphique', 'rtx', 'nvidia', 'geforce'],
    answer: '🖥️ **Cartes graphiques**\nNous équipons nos PC de cartes **NVIDIA GeForce RTX** :\n• RTX 3060 12 GB → 1080p gaming\n• RTX 4060/4070 → 1080p–1440p ultra\n• RTX 4070 Ti → 1440p–4K\n• RTX 4080/4090 → 4K ultra, création\n\nToutes les RTX 40 disposent du DLSS 3 (génération de frames AI).',
  },
  {
    keys: ['ram', 'mémoire', 'ddr', 'go ram'],
    answer: '🧠 **RAM**\nNos configs incluent de la DDR4 ou DDR5 selon la plateforme :\n• 16 Go → entrée de gamme, bureautique\n• 32 Go → gaming confortable, streaming\n• 64 Go → création de contenu, workstation\n\nSur les plateformes AM5 (Ryzen 7000), nous utilisons de la DDR5 pour des performances optimales.',
  },
  {
    keys: ['ssd', 'stockage', 'disque', 'nvme'],
    answer: '💾 **Stockage**\nTous nos PC sont équipés de **SSD NVMe** (pas de disque dur classique) :\n• 500 Go → configs entrée de gamme\n• 1 To → gaming polyvalent\n• 2 To → création / grosse bibliothèque de jeux\n\nLes SSD NVMe offrent des vitesses de chargement 5–10× supérieures aux anciens HDD.',
  },
  {
    keys: ['refroid', 'ventilateur', 'watercooling', 'ventirad', 'température', 'chaud'],
    answer: '🌡️ **Refroidissement**\nNos configs utilisent :\n• **Ventirad** : silencieux et fiable pour les Ryzen 5/7\n• **Watercooling AIO 240/360 mm** : pour les Ryzen 9 et les configs hautes performances\n\nToutes nos machines sont testées 48h sous charge pour valider la stabilité thermique.',
  },
  {
    keys: ['alimentation', 'psu', 'watts', 'watt'],
    answer: '⚡ **Alimentation**\nNous sélectionnons des alimentations **80+ Gold** ou **80+ Platinum** :\n• Certifiées pour une efficacité maximale\n• Marges de sécurité intégrées\n• Câbles modulaires sur les hautes gammes\n\nLa puissance est dimensionnée selon la config (de 550W à 1000W).',
  },
  {
    keys: ['contact', 'email', 'telephone', 'appel', 'joindre', 'parler', 'humain'],
    answer: '📞 **Contactez-nous**\n• Email : support@nexusbuild.fr\n• Téléphone : +33 1 23 45 67 89 (Lun–Sam 9h–19h)\n• Adresse : 12 rue de la Tech, 75011 Paris\n\nNotre équipe de techniciens passionnés vous répond sous 24h ouvrées.',
  },
  {
    keys: ['prix', 'combien', 'coute', 'coût', 'tarif', 'gamme'],
    answer: '💰 **Nos tarifs**\n• NEXUS OFFICE → 449 €\n• NEXUS STARTER → 649 €\n• NEXUS MINI → 799 €\n• NEXUS GAMER → 999 €\n• NEXUS STREAM → 1 199 €\n• NEXUS PRO → 1 499 €\n• NEXUS CREATOR → 1 799 €\n• NEXUS ULTRA → 2 299 €\n\nLivraison gratuite dès 1 000 €. Garantie 3 ans incluse sur tous les modèles.',
  },
  {
    keys: ['conseil', 'choisir', 'quel', 'recommande', 'lequel', 'aide'],
    answer: 'Je serais ravi de vous conseiller ! 🎯 Pour trouver le PC idéal, dites-moi :\n1. **Votre budget** (ex : autour de 1 000 €)\n2. **Votre usage** (gaming, streaming, bureautique, création…)\n3. **Votre écran** (1080p, 1440p, 4K ?)\n\nAvec ces infos je peux vous orienter vers la configuration parfaite !',
  },
  {
    keys: ['merci', 'parfait', 'super', 'nickel', 'cool', 'top', 'genial', 'génial'],
    answer: 'Avec plaisir ! 😊 N\'hésitez pas si vous avez d\'autres questions. L\'équipe NEXUS BUILD est là pour vous aider à trouver la machine de vos rêves !',
  },
  {
    keys: ['au revoir', 'bye', 'bonne journée', 'bonne soirée', 'à bientôt'],
    answer: 'À bientôt ! 👋 N\'hésitez pas à revenir si vous avez des questions. Bonne journée !',
  },
]

const DEFAULT = 'Je ne suis pas sûr de comprendre votre question. 🤔 Je peux vous renseigner sur nos **configurations PC**, **prix**, **garantie**, **livraison** ou vous aider à **choisir** la machine adaptée à votre budget. Que souhaitez-vous savoir ?'

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function getAnswer(input) {
  const q = normalize(input)
  for (const rule of RULES) {
    if (rule.keys.some(k => q.includes(normalize(k)))) {
      return rule.answer
    }
  }
  return DEFAULT
}

// Simple markdown bold renderer
function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : p
  )
}

function MessageBubble({ msg }) {
  const lines = msg.content.split('\n')
  return (
    <div className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center
                       ${msg.role === 'assistant' ? 'bg-blue-purple' : 'bg-g-border'}`}>
        {msg.role === 'assistant'
          ? <Bot size={14} className="text-white" />
          : <User size={14} className="text-g-muted" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed
                       ${msg.role === 'assistant'
                         ? 'bg-g-bg text-g-text rounded-tl-sm'
                         : 'bg-g-blue text-white rounded-tr-sm'}`}>
        {lines.map((line, i) => (
          <span key={i}>
            {renderText(line)}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  )
}

const WELCOME = {
  role: 'assistant',
  content: 'Bonjour ! 👋 Je suis NexusBot, votre assistant NEXUS BUILD.\nJe peux vous aider à choisir un PC, répondre à vos questions sur la garantie, la livraison, les composants ou les prix.\nComment puis-je vous aider ?',
}

export default function ChatWidget() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input,    setInput]    = useState('')
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  function send() {
    const text = input.trim()
    if (!text) return

    const answer = getAnswer(text)
    setMessages(prev => [
      ...prev,
      { role: 'user',      content: text },
      { role: 'assistant', content: answer },
    ])
    setInput('')
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Ouvrir le chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-purple shadow-lg
                   flex items-center justify-center text-white
                   hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-200
                   hover:scale-105 active:scale-95"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)]
                        flex flex-col rounded-2xl border border-g-border bg-g-card shadow-2xl overflow-hidden"
             style={{ height: '520px' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-purple">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">NexusBot</p>
              <p className="text-white/70 text-xs">Assistant NEXUS BUILD</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/70 text-xs">En ligne</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {['Prix', 'Garantie', 'Livraison', 'Conseil'].map(s => (
              <button
                key={s}
                onClick={() => { setInput(s); setTimeout(send, 0) }}
                className="text-xs px-2.5 py-1 rounded-full border border-g-border text-g-muted
                           hover:border-g-blue hover:text-g-blue transition-colors duration-150"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 pb-3 flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Posez votre question…"
              rows={1}
              className="flex-1 resize-none bg-g-bg border border-g-border rounded-xl px-3 py-2.5
                         text-sm text-g-text placeholder-g-muted focus:outline-none
                         focus:border-g-blue transition-colors duration-150 max-h-28"
              style={{ lineHeight: '1.4' }}
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl
                         bg-g-blue text-white disabled:opacity-40 hover:bg-blue-500
                         transition-all duration-150 active:scale-95"
              aria-label="Envoyer"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
