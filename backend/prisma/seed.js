import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    name: 'GX Starter', badge: 'Entrée Gaming', badgeType: 'blue', price: 799,
    usage: ['Gaming'], cpuBrand: 'AMD', gpuBrand: 'NVIDIA',
    gradient: 'from-blue-900 via-blue-800 to-indigo-950',
    description: 'Idéal pour débuter dans le gaming. Performances solides en 1080p sur tous les jeux actuels, avec 60+ FPS garantis sur les titres AAA.',
    highlights: ['1080p Ultra', '60+ FPS garantis', 'WiFi intégré'],
    rating: 4.5, reviewCount: 127, inStock: true, bestseller: true,
    specCpu: 'AMD Ryzen 5 5600', specGpu: 'NVIDIA GeForce RTX 3060 12 GB',
    specRam: '16 GB DDR4 3200 MHz', specStorage: '500 GB NVMe SSD',
    specMobo: 'MSI B550M Pro-VDH WiFi', specCase: 'Deepcool CC560',
    specPsu: 'Corsair CV650 — 650 W 80+ Bronze',
  },
  {
    name: 'GX Pro', badge: 'Gaming Mid-Range', badgeType: 'blue', price: 1299,
    usage: ['Gaming'], cpuBrand: 'Intel', gpuBrand: 'NVIDIA',
    gradient: 'from-indigo-900 via-blue-900 to-slate-950',
    description: 'Le rapport qualité-prix parfait pour jouer en 1440p avec des FPS élevés.',
    highlights: ['1440p Ultra', '144 FPS+', 'Overclockable'],
    rating: 4.7, reviewCount: 89, inStock: true, bestseller: true,
    specCpu: 'Intel Core i5-13600K', specGpu: 'NVIDIA GeForce RTX 4070 12 GB',
    specRam: '32 GB DDR4 3600 MHz', specStorage: '1 TB NVMe SSD (PCIe 4.0)',
    specMobo: 'MSI Z690-A Pro DDR4', specCase: 'NZXT H510 Flow',
    specPsu: 'be quiet! Straight Power 11 750 W 80+ Gold',
  },
  {
    name: 'GX Ultra', badge: 'Gaming Haut de gamme', badgeType: 'purple', price: 1899,
    usage: ['Gaming'], cpuBrand: 'AMD', gpuBrand: 'NVIDIA',
    gradient: 'from-purple-900 via-indigo-900 to-blue-950',
    description: 'Le monstre de puissance pour jouer en 4K Ultra avec des FPS délirants.',
    highlights: ['4K Ultra 60+ FPS', 'AIO 360mm inclus', 'DDR5 6000 MHz'],
    rating: 4.9, reviewCount: 54, inStock: true, bestseller: true,
    specCpu: 'AMD Ryzen 7 7800X3D', specGpu: 'NVIDIA GeForce RTX 4080 Super 16 GB',
    specRam: '32 GB DDR5 6000 MHz', specStorage: '2 TB NVMe SSD (PCIe 5.0)',
    specMobo: 'ASUS ROG Strix X670E-F Gaming', specCase: 'Lian Li PC-O11 Dynamic EVO',
    specPsu: 'Seasonic Focus GX-1000 — 1000 W 80+ Gold',
  },
  {
    name: 'GX Titan', badge: 'No-Compromise', badgeType: 'purple', price: 2899,
    usage: ['Gaming'], cpuBrand: 'Intel', gpuBrand: 'NVIDIA',
    gradient: 'from-violet-900 via-purple-900 to-slate-950',
    description: "L'ultime machine de guerre. RTX 4090 pour une domination absolue en 4K à 144 FPS.",
    highlights: ['4K 144 FPS', 'RTX 4090 24 GB', 'Overclocking extrême'],
    rating: 5.0, reviewCount: 28, inStock: true, bestseller: true,
    specCpu: 'Intel Core i9-14900K', specGpu: 'NVIDIA GeForce RTX 4090 24 GB',
    specRam: '64 GB DDR5 7200 MHz', specStorage: '2 TB NVMe SSD PCIe 5.0 + 4 TB HDD',
    specMobo: 'ASUS ROG Maximus Z790 Apex', specCase: 'Phanteks Enthoo 719',
    specPsu: 'be quiet! Dark Power 13 — 1000 W 80+ Titanium',
  },
  {
    name: 'Stream Pro', badge: 'Streaming / Créatif', badgeType: 'blue', price: 1599,
    usage: ['Stream', 'Gaming'], cpuBrand: 'AMD', gpuBrand: 'NVIDIA',
    gradient: 'from-cyan-900 via-blue-900 to-indigo-950',
    description: 'Pensé pour le streaming en direct et la création de contenu.',
    highlights: ['Streaming 4K', '12 cœurs / 24 threads', 'Silence total'],
    rating: 4.6, reviewCount: 73, inStock: true, bestseller: false,
    specCpu: 'AMD Ryzen 9 5900X', specGpu: 'NVIDIA GeForce RTX 3080 10 GB',
    specRam: '32 GB DDR4 3600 MHz', specStorage: '1 TB NVMe SSD + 2 TB HDD',
    specMobo: 'ASUS ProArt X570-Creator WiFi', specCase: 'be quiet! Silent Base 802',
    specPsu: 'Corsair RM850x — 850 W 80+ Gold',
  },
  {
    name: 'Stream Ultra', badge: 'Creator Station', badgeType: 'purple', price: 2199,
    usage: ['Stream', 'Gaming'], cpuBrand: 'Intel', gpuBrand: 'NVIDIA',
    gradient: 'from-blue-950 via-indigo-900 to-purple-950',
    description: 'La workstation ultime pour streamers professionnels.',
    highlights: ['Rendu 8K', '64 GB DDR5', 'Multi-écrans 4K'],
    rating: 4.8, reviewCount: 41, inStock: true, bestseller: false,
    specCpu: 'Intel Core i9-13900K', specGpu: 'NVIDIA GeForce RTX 4080 16 GB',
    specRam: '64 GB DDR5 6400 MHz', specStorage: '2 TB NVMe SSD + 4 TB HDD',
    specMobo: 'MSI MEG Z790 ACE', specCase: 'Lian Li O11 Vision',
    specPsu: 'Seasonic Prime TX-1000 — 80+ Titanium',
  },
  {
    name: 'Bureau Essentiel', badge: 'Bureautique', badgeType: 'blue', price: 499,
    usage: ['Bureautique'], cpuBrand: 'Intel', gpuBrand: 'AMD',
    gradient: 'from-slate-800 via-slate-700 to-blue-950',
    description: 'Fiable, silencieux et économique. Parfait pour le travail au quotidien.',
    highlights: ['SSD NVMe rapide', 'Silencieux', 'Faible consommation'],
    rating: 4.4, reviewCount: 212, inStock: true, bestseller: false,
    specCpu: 'Intel Core i5-12400', specGpu: 'Intel UHD 730 (intégrée)',
    specRam: '16 GB DDR4 3200 MHz', specStorage: '512 GB NVMe SSD',
    specMobo: 'MSI Pro H610M-G', specCase: 'Fractal Design Core 1100',
    specPsu: "be quiet! System Power 9 — 400 W",
  },
  {
    name: 'Bureau Pro', badge: 'Bureautique Pro', badgeType: 'blue', price: 799,
    usage: ['Bureautique'], cpuBrand: 'AMD', gpuBrand: 'NVIDIA',
    gradient: 'from-slate-900 via-blue-900 to-slate-800',
    description: 'La puissance bureautique avec une touche gaming.',
    highlights: ['32 GB DDR5', 'GPU dédiée', 'WiFi 6'],
    rating: 4.6, reviewCount: 155, inStock: true, bestseller: false,
    specCpu: 'AMD Ryzen 5 7600', specGpu: 'NVIDIA GeForce RTX 3050 8 GB',
    specRam: '32 GB DDR5 5200 MHz', specStorage: '1 TB NVMe SSD',
    specMobo: 'MSI PRO B650-P WiFi', specCase: 'Fractal Design Define 7',
    specPsu: 'Seasonic Focus GX-650 — 80+ Gold',
  },
]

async function main() {
  const count = await prisma.product.count()
  if (count === 0) {
    console.log('Seeding products...')
    for (const p of products) {
      await prisma.product.create({ data: p })
    }
    console.log(`✅ ${products.length} products seeded.`)
  } else {
    console.log(`ℹ️  DB already has ${count} products, skipping seed.`)
  }
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
