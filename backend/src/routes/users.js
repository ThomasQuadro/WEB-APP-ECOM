import { Router } from 'express'
import { prisma } from '../prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/users/me
router.get('/me', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, firstName: true, lastName: true, email: true, role: true, createdAt: true },
    })
    if (!user) return res.status(404).json({ error: 'Introuvable' })
    res.json({ user })
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// PUT /api/users/me
router.put('/me', async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'Prénom et nom requis' })
    }
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { firstName, lastName },
      select: { id: true, firstName: true, lastName: true, email: true, role: true, createdAt: true },
    })
    res.json({ user })
  } catch (e) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour' })
  }
})

export default router
