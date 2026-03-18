import { Router } from 'express'
import { prisma } from '../prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/orders — commandes de l'utilisateur connecté
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ orders })
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: Number(req.params.id), userId: req.userId },
      include: { items: true },
    })
    if (!order) return res.status(404).json({ error: 'Commande introuvable' })
    res.json({ order })
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// POST /api/orders — créer une commande
router.post('/', async (req, res) => {
  try {
    const { items } = req.body
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Le panier est vide' })
    }
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const order = await prisma.order.create({
      data: {
        userId: req.userId,
        total,
        status: 'CONFIRMED',
        items: {
          create: items.map(i => ({
            productName: i.name,
            variant:     i.variant || '',
            price:       i.price,
            quantity:    i.quantity,
            productId:   i.id && !String(i.id).startsWith('custom') ? Number(i.id) : null,
          })),
        },
      },
      include: { items: true },
    })
    res.status(201).json({ order })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Erreur lors de la création de la commande' })
  }
})

export default router
