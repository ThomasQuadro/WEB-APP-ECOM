import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me'

function makeToken(userId) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' })
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' })
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Le mot de passe doit faire au moins 8 caractères' })
    }
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({ error: 'Cette adresse email est déjà utilisée' })
    }
    const hashed = await bcrypt.hash(password, 12)
    const user   = await prisma.user.create({
      data: { firstName, lastName, email, password: hashed },
      select: { id: true, firstName: true, lastName: true, email: true, role: true, createdAt: true },
    })
    res.status(201).json({ user, token: makeToken(user.id) })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Erreur lors de la création du compte' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' })
    }
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
    }
    const { password: _, ...safeUser } = user
    res.json({ user: safeUser, token: makeToken(user.id) })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Erreur lors de la connexion' })
  }
})

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, firstName: true, lastName: true, email: true, role: true, createdAt: true },
    })
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' })
    res.json({ user })
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
