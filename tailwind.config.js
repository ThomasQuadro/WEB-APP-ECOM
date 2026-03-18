/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'g-bg':      '#09090f',
        'g-card':    '#0f0f1a',
        'g-card2':   '#141420',
        'g-border':  '#1e1e30',
        'g-blue':    '#3b82f6',
        'g-blue-l':  '#60a5fa',
        'g-purple':  '#8b5cf6',
        'g-purple-l':'#a78bfa',
        'g-text':    '#f1f5f9',
        'g-muted':   '#64748b',
        'g-green':   '#10b981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-in':  'slide-in 0.35s cubic-bezier(0.16,1,0.3,1)',
        'fade-up':   'fade-up 0.5s ease-out both',
        'glow-pulse':'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'slide-in': {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%,100%': { boxShadow: '0 0 20px rgba(59,130,246,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(59,130,246,0.7)' },
        },
      },
      backgroundImage: {
        'hero-gradient':  'radial-gradient(ellipse at top, #1e1b4b 0%, #09090f 65%)',
        'blue-purple':    'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        'card-gradient':  'linear-gradient(145deg, #0f0f1a, #0a0a14)',
        'border-gradient':'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
}
