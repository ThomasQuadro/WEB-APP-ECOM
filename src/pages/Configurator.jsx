import { useState } from 'react'
import {
  Box, Cpu, Zap, Monitor, MemoryStick, HardDrive,
  Wind, Power, Check, ChevronLeft, ChevronRight,
  ShoppingCart, AlertCircle, X
} from 'lucide-react'
import { STEPS, COMPONENTS } from '../data/configuratorData'
import { useCart } from '../context/CartContext'

/* ─── Icon map ──────────────────────────────────────────────── */
const ICON_MAP = {
  Box, Cpu, Zap, Monitor, MemoryStick, HardDrive, Wind, Power,
}

function StepIcon({ name, size = 20 }) {
  const Icon = ICON_MAP[name] ?? Box
  return <Icon size={size} />
}

/* ─── Component option card ─────────────────────────────────── */
function OptionCard({ option, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(option)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150
                   ${selected
                     ? 'border-g-blue bg-g-blue/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                     : 'border-g-border bg-g-card hover:border-g-blue/40 hover:bg-white/[0.02]'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="font-semibold text-g-text text-sm">{option.name}</p>
          <p className="text-xs text-g-muted mt-0.5">{option.brand}</p>
          <p className="text-xs text-g-muted mt-2 leading-relaxed">{option.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {option.tags.map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-g-border text-g-muted font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-g-blue-l text-sm">{option.price} €</p>
          {selected && (
            <div className="mt-2 w-6 h-6 rounded-full bg-g-blue flex items-center justify-center ml-auto">
              <Check size={12} className="text-white" />
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

/* ─── Summary panel ─────────────────────────────────────────── */
function SummaryPanel({ selections, totalPrice, onAddToCart }) {
  const hasAllSteps = STEPS.every(s => selections[s.id])

  return (
    <div className="card p-5 sticky top-20 space-y-5">
      <div>
        <p className="text-xs font-bold text-g-muted uppercase tracking-widest mb-1">Votre configuration</p>
        <p className="text-3xl font-black gradient-text">{totalPrice.toLocaleString('fr-FR')} €</p>
        <p className="text-xs text-g-muted mt-0.5">TTC • Garantie 3 ans</p>
      </div>

      <div className="divider" />

      {/* Selected components */}
      <ul className="space-y-2">
        {STEPS.map(step => {
          const sel = selections[step.id]
          return (
            <li key={step.id} className="flex items-start gap-2.5">
              <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0
                               ${sel ? 'bg-g-blue/20 text-g-blue-l' : 'bg-g-border text-g-muted'}`}>
                {sel ? <Check size={11} /> : <span className="text-[10px]">○</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-g-muted">{step.label}</p>
                <p className="text-xs font-medium text-g-text truncate">
                  {sel ? sel.name : <span className="text-g-border italic">Non sélectionné</span>}
                </p>
              </div>
              {sel && (
                <p className="text-xs text-g-blue-l font-semibold shrink-0">{sel.price} €</p>
              )}
            </li>
          )
        })}
      </ul>

      <div className="divider" />

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-g-muted mb-1.5">
          <span>Progression</span>
          <span>{Object.values(selections).filter(Boolean).length} / {STEPS.length}</span>
        </div>
        <div className="h-1.5 rounded-full bg-g-border overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-purple transition-all duration-500"
            style={{ width: `${(Object.values(selections).filter(Boolean).length / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onAddToCart}
        disabled={!hasAllSteps}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold
                     text-sm transition-all duration-150
                     ${hasAllSteps
                       ? 'btn-primary'
                       : 'bg-g-border text-g-muted cursor-not-allowed opacity-60'}`}
      >
        <ShoppingCart size={16} />
        {hasAllSteps ? 'Ajouter au panier' : 'Complétez la config'}
      </button>

      {!hasAllSteps && (
        <p className="flex items-center gap-1.5 text-xs text-g-muted">
          <AlertCircle size={12} className="text-yellow-400" />
          Sélectionnez toutes les pièces pour continuer.
        </p>
      )}
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function Configurator() {
  const { addItem, setIsOpen } = useCart()
  const [currentStep,  setCurrentStep]  = useState(0)
  const [selections,   setSelections]   = useState({})
  const [showSuccess,  setShowSuccess]  = useState(false)

  const totalPrice = Object.values(selections).reduce((sum, c) => sum + (c?.price ?? 0), 0)
  const stepData   = STEPS[currentStep]
  const options    = COMPONENTS[stepData.id] ?? []

  function selectOption(option) {
    setSelections(prev => ({ ...prev, [stepData.id]: option }))
  }

  function handleAddToCart() {
    const variantParts = STEPS.map(s =>
      selections[s.id] ? `${s.label}: ${selections[s.id].name}` : null
    ).filter(Boolean)

    addItem({
      id: `custom-${Date.now()}`,
      name: 'PC Sur-Mesure NEXT BUILD',
      price: totalPrice,
      gradient: 'from-violet-900 via-blue-900 to-indigo-950',
      variant: variantParts.join(' | '),
    })

    setShowSuccess(true)
    setTimeout(() => { setShowSuccess(false); setIsOpen(true) }, 1500)
  }

  return (
    <div className="pt-16">
      {/* Success toast */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50
                         flex items-center gap-3 px-6 py-3 rounded-xl
                         bg-g-green/20 border border-g-green/40 text-g-green font-semibold
                         shadow-xl backdrop-blur-sm animate-fade-up">
          <Check size={18} /> Configuration ajoutée au panier !
        </div>
      )}

      {/* Header */}
      <div className="border-b border-g-border bg-g-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-g-blue text-sm font-semibold uppercase tracking-widest mb-2">Configurateur</p>
          <h1 className="section-title mb-2">
            Construisez votre <span className="gradient-text">PC idéal</span>
          </h1>
          <p className="text-g-muted">Choisissez chaque composant étape par étape.</p>
        </div>
      </div>

      {/* Step tabs */}
      <div className="border-b border-g-border bg-g-card/30 backdrop-blur-sm sticky top-16 z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 min-w-max">
            {STEPS.map((step, i) => {
              const done   = !!selections[step.id]
              const active = currentStep === i
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                               transition-all duration-150 whitespace-nowrap
                               ${active
                                 ? 'bg-g-blue/15 text-g-blue-l border border-g-blue/30'
                                 : done
                                 ? 'text-g-green hover:bg-white/5'
                                 : 'text-g-muted hover:text-g-text hover:bg-white/5'}`}
                >
                  {done && !active
                    ? <Check size={14} className="text-g-green" />
                    : <span className="text-xs w-4 text-center font-bold opacity-60">{i + 1}</span>
                  }
                  <StepIcon name={step.icon} size={15} />
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-8">

          {/* Left — options */}
          <div className="flex-1 space-y-6">
            {/* Step header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-g-blue/15 border border-g-blue/30
                               flex items-center justify-center text-g-blue-l">
                <StepIcon name={stepData.icon} size={20} />
              </div>
              <div>
                <p className="text-xs text-g-muted">Étape {currentStep + 1}/{STEPS.length}</p>
                <h2 className="text-xl font-bold text-g-text">{stepData.label}</h2>
              </div>
            </div>

            {/* Option cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map(option => (
                <OptionCard
                  key={option.id}
                  option={option}
                  selected={selections[stepData.id]?.id === option.id}
                  onSelect={selectOption}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} /> Précédent
              </button>

              <span className="text-g-muted text-sm">
                {currentStep + 1} / {STEPS.length}
              </span>

              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(s => Math.min(STEPS.length - 1, s + 1))}
                  className="btn-primary"
                >
                  Suivant <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!STEPS.every(s => selections[s.id])}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={18} /> Ajouter au panier
                </button>
              )}
            </div>
          </div>

          {/* Right — summary */}
          <div className="xl:w-80 shrink-0">
            <SummaryPanel
              selections={selections}
              totalPrice={totalPrice}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
