# NEXT BUILD — E-commerce PC Gaming

Site e-commerce de PC gaming sur-mesure. Catalogue, configurateur, panier, authentification, dashboard utilisateur et chatbot intégré.

---

## Stack technique

### Frontend
| Technologie | Version | Rôle |
|---|---|---|
| React | 18 | UI |
| Vite | 5 | Bundler / dev server |
| Tailwind CSS | 3 | Styles utilitaires + thème gaming |
| React Router | 6 | Routing SPA |
| Lucide React | 0.344 | Icônes |

### Backend
| Technologie | Version | Rôle |
|---|---|---|
| Node.js | 20 | Runtime |
| Express | 4 | API REST |
| Prisma | 5 | ORM |
| PostgreSQL | 16 | Base de données |
| bcryptjs | 2 | Hachage des mots de passe |
| jsonwebtoken | 9 | Authentification JWT |

### Infrastructure
- **Docker** + **Docker Compose** — 3 services orchestrés (db, backend, frontend)
- **Alpine Linux** — images légères pour la production

---

## Architecture

```
WEB-APP-ECOM/
├── src/                        # Frontend React
│   ├── components/
│   │   ├── Navbar.jsx          # Barre de navigation (auth + panier)
│   │   ├── CartSidebar.jsx     # Drawer panier
│   │   ├── Footer.jsx          # Footer 5 colonnes
│   │   ├── ChatWidget.jsx      # Chatbot NextBot (client-side)
│   │   └── ProtectedRoute.jsx  # Garde de route JWT
│   ├── context/
│   │   ├── AuthContext.jsx     # État d'authentification global
│   │   └── CartContext.jsx     # État du panier (useReducer)
│   ├── data/
│   │   ├── products.js         # 8 produits mock
│   │   └── configuratorData.js # Étapes + composants du configurateur
│   ├── pages/
│   │   ├── Home.jsx            # Page d'accueil
│   │   ├── Catalog.jsx         # Boutique avec filtres
│   │   ├── ProductDetail.jsx   # Fiche produit
│   │   ├── Configurator.jsx    # Configurateur 8 étapes
│   │   ├── Cart.jsx            # Panier + commande
│   │   ├── Login.jsx           # Connexion
│   │   ├── Register.jsx        # Inscription
│   │   ├── Dashboard.jsx       # Espace client
│   │   ├── FAQ.jsx             # Foire aux questions
│   │   ├── Guide.jsx           # Guide d'achat
│   │   ├── Garantie.jsx        # Garantie & SAV
│   │   ├── MentionsLegales.jsx # Mentions légales
│   │   ├── CGV.jsx             # Conditions générales de vente
│   │   ├── Confidentialite.jsx # Politique RGPD
│   │   └── Cookies.jsx         # Gestion des cookies
│   └── services/
│       └── api.js              # Wrapper fetch (JWT auto-injecté)
│
├── backend/
│   ├── src/
│   │   ├── index.js            # Serveur Express
│   │   ├── prisma.js           # Singleton PrismaClient
│   │   ├── middleware/
│   │   │   └── auth.js         # Middleware JWT requireAuth
│   │   └── routes/
│   │       ├── auth.js         # POST /register, POST /login, GET /me
│   │       ├── products.js     # GET /, GET /:id
│   │       ├── orders.js       # GET /, GET /:id, POST / (protégé)
│   │       └── users.js        # GET /me, PUT /me (protégé)
│   ├── prisma/
│   │   ├── schema.prisma       # Modèles User, Product, Order, OrderItem
│   │   └── seed.js             # Seed 8 produits
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── Dockerfile                  # Frontend
└── vite.config.js
```

---

## Modèle de données

```
User ──< Order ──< OrderItem >── Product
```

- **User** : id, email, password (bcrypt), firstName, lastName, role (USER/ADMIN)
- **Product** : id, name, price, specs (cpu/gpu/ram/storage/mobo/case/psu), badge, usage[], highlights[]
- **Order** : id, userId, status (PENDING → DELIVERED), total
- **OrderItem** : id, orderId, productId, productName, variant, price, quantity

---

## Lancer le projet

### Prérequis
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et démarré

### Démarrage

```bash
git clone https://github.com/ThomasQuadro/WEB-APP-ECOM.git
cd WEB-APP-ECOM
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3001/api |
| PostgreSQL | localhost:5432 |

Au premier démarrage, le backend exécute automatiquement `prisma db push` + le seed des 8 produits.

### Arrêter

```bash
docker compose down
```

Pour supprimer aussi la base de données :

```bash
docker compose down -v
```

---

## API REST

### Authentification

```
POST /api/auth/register   { firstName, lastName, email, password }
POST /api/auth/login      { email, password }  → { token, user }
GET  /api/auth/me         (Bearer token requis)
```

### Produits

```
GET /api/products         → liste tous les produits
GET /api/products/:id     → détail d'un produit
```

### Commandes *(authentification requise)*

```
GET  /api/orders          → commandes de l'utilisateur connecté
GET  /api/orders/:id      → détail d'une commande
POST /api/orders          { items: [{ productId, productName, variant, price, quantity }] }
```

### Utilisateur *(authentification requise)*

```
GET /api/users/me         → profil complet
PUT /api/users/me         { firstName, lastName, email }
```

---

## Pages

| Route | Page | Accès |
|---|---|---|
| `/` | Accueil | Public |
| `/boutique` | Catalogue avec filtres | Public |
| `/produit/:id` | Fiche produit | Public |
| `/configurateur` | Configurateur 8 étapes | Public |
| `/panier` | Panier | Public |
| `/login` | Connexion | Public |
| `/register` | Inscription | Public |
| `/dashboard` | Espace client | Connecté |
| `/faq` | FAQ | Public |
| `/guide` | Guide d'achat | Public |
| `/garantie` | Garantie & SAV | Public |
| `/mentions-legales` | Mentions légales | Public |
| `/cgv` | CGV | Public |
| `/confidentialite` | Politique RGPD | Public |
| `/cookies` | Cookies | Public |

---

## Fonctionnalités

- **Catalogue** — filtres prix, usage, marque CPU/GPU, tri, recherche textuelle
- **Fiche produit** — galerie, tableau de specs, personnalisation RAM/stockage avec prix dynamique
- **Configurateur** — 8 étapes (boîtier, carte mère, CPU, GPU, RAM, stockage, refroidissement, alimentation) avec récapitulatif en temps réel
- **Panier** — sidebar slide-in, gestion quantités, persistance session
- **Authentification** — inscription/connexion JWT, token stocké en localStorage
- **Dashboard** — statistiques commandes, historique accordéon, modification du profil
- **NextBot** — chatbot client-side par mots-clés, aucune API externe requise
- **Pages légales** — CGV, mentions légales, RGPD, cookies interactifs

---

## Variables d'environnement

Les variables sont définies dans `docker-compose.yml`. Pour la production, créez un fichier `.env` à la racine :

```env
# Backend
DATABASE_URL=postgresql://next:nextpass@db:5432/nextbuild
JWT_SECRET=changez-moi-en-production
FRONTEND_URL=https://votre-domaine.fr
PORT=3001
```

---

## Développement sans Docker

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
# Configurez DATABASE_URL dans un fichier .env
npx prisma db push
node prisma/seed.js
npm run dev
```
