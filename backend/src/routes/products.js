import { Router } from 'express'
import { prisma } from '../prisma.js'

const router = Router()

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { id: 'asc' } })
    res.json({ products })
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) } })
    if (!product) return res.status(404).json({ error: 'Produit introuvable' })
    res.json({ product })
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
