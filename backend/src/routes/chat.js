import { Router } from 'express'
import Anthropic from '@anthropic-ai/sdk'

const router = Router()

const SYSTEM_PROMPT = `Tu es NexusBot, l'assistant intelligent de NEXUS BUILD — spécialiste du PC gaming sur-mesure depuis 2019.

Tu aides les clients à :
- Choisir le bon PC gaming selon leur budget et leurs usages (gaming compétitif, AAA, streaming, bureautique)
- Comprendre les configurations disponibles dans la boutique
- Utiliser le configurateur pour assembler un PC personnalisé
- Répondre aux questions sur la garantie (3 ans), la livraison (5-10 jours ouvrés), le SAV
- Expliquer les composants (CPU, GPU, RAM, stockage, refroidissement, alimentation)

Gamme de produits NEXUS BUILD :
- NEXUS STARTER (649€) — Ryzen 5 5600 + RTX 3060 12GB, gaming 1080p
- NEXUS GAMER (999€) — Ryzen 5 7600X + RTX 4070 12GB, gaming 1440p
- NEXUS PRO (1499€) — Ryzen 7 7700X + RTX 4070 Ti 12GB, gaming 4K
- NEXUS ULTRA (2299€) — Ryzen 9 7900X + RTX 4090 24GB, top du top
- NEXUS STREAM (1199€) — Ryzen 9 7900X + RTX 4070 12GB, streaming/gaming
- NEXUS CREATOR (1799€) — Ryzen 9 7950X + RTX 4080 16GB, création de contenu
- NEXUS OFFICE (449€) — Ryzen 5 5600G, bureautique
- NEXUS MINI (799€) — format compact, gaming 1080p

Toutes les machines sont assemblées à Paris, testées 48h, garantie 3 ans pièces & main d'œuvre.
Livraison gratuite au-delà de 1000€.

Réponds en français, de façon concise et utile. Si le client hésite entre deux configs, pose-lui des questions sur son usage et son budget. Ne promets jamais quelque chose qui n'est pas dans la gamme.`

router.post('/', async (req, res) => {
  const { messages } = req.body

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages requis' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'Service de chat non configuré (clé API manquante)' })
  }

  // Sanitize messages: only keep role + content string
  const cleanMessages = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role, content: String(m.content).slice(0, 4000) }))

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  try {
    const client = new Anthropic({ apiKey })

    const stream = client.messages.stream({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: cleanMessages,
    })

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
      }
    }

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    console.error('Chat error:', err)
    res.write(`data: ${JSON.stringify({ error: 'Erreur lors de la génération de la réponse' })}\n\n`)
    res.end()
  }
})

export default router
