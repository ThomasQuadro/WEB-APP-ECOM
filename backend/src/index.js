import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import authRoutes    from './routes/auth.js'
import productsRoutes from './routes/products.js'
import ordersRoutes  from './routes/orders.js'
import usersRoutes   from './routes/users.js'
import chatRoutes    from './routes/chat.js'

const app  = express()
const PORT = process.env.PORT || 3001

app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

app.use('/api/auth',     authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/orders',   ordersRoutes)
app.use('/api/users',    usersRoutes)
app.use('/api/chat',     chatRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Erreur serveur interne' })
})

app.listen(PORT, () => console.log(`🚀 Backend NEXUS BUILD sur le port ${PORT}`))
