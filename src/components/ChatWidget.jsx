import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2, Zap } from 'lucide-react'
import { API_BASE } from '../services/api'

const WELCOME = {
  role: 'assistant',
  content: 'Bonjour ! Je suis NexusBot, votre assistant NEXUS BUILD. Comment puis-je vous aider ? Je peux vous conseiller sur nos configurations, répondre à vos questions sur la garantie, la livraison ou vous aider à choisir le bon PC selon votre budget.',
}

export default function ChatWidget() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    // Add empty assistant message to stream into
    const assistantIdx = history.length
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer    = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            if (parsed.error) throw new Error(parsed.error)
            if (parsed.text) {
              setMessages(prev => {
                const updated = [...prev]
                updated[assistantIdx] = {
                  ...updated[assistantIdx],
                  content: updated[assistantIdx].content + parsed.text,
                }
                return updated
              })
            }
          } catch { /* skip malformed lines */ }
        }
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev]
        updated[assistantIdx] = {
          role: 'assistant',
          content: 'Désolé, une erreur est survenue. Veuillez réessayer.',
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Ouvrir le chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-purple shadow-lg
                   flex items-center justify-center text-white
                   hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-200
                   hover:scale-105 active:scale-95"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)]
                        flex flex-col rounded-2xl border border-g-border bg-g-card shadow-2xl
                        overflow-hidden"
             style={{ height: '520px' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-purple">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">NexusBot</p>
              <p className="text-white/70 text-xs">Assistant NEXUS BUILD</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/70 text-xs">En ligne</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center
                                 ${msg.role === 'assistant'
                                   ? 'bg-blue-purple'
                                   : 'bg-g-border'}`}>
                  {msg.role === 'assistant'
                    ? <Bot size={14} className="text-white" />
                    : <User size={14} className="text-g-muted" />}
                </div>
                {/* Bubble */}
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed
                                 ${msg.role === 'assistant'
                                   ? 'bg-g-bg text-g-text rounded-tl-sm'
                                   : 'bg-g-blue text-white rounded-tr-sm'}`}>
                  {msg.content || (
                    <span className="flex items-center gap-1.5 text-g-muted">
                      <Loader2 size={13} className="animate-spin" />
                      <span className="text-xs">En train d'écrire…</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-g-border flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              placeholder="Posez votre question…"
              rows={1}
              className="flex-1 resize-none bg-g-bg border border-g-border rounded-xl px-3 py-2.5
                         text-sm text-g-text placeholder-g-muted focus:outline-none
                         focus:border-g-blue transition-colors duration-150 max-h-28
                         disabled:opacity-50"
              style={{ lineHeight: '1.4' }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl
                         bg-g-blue text-white disabled:opacity-40 hover:bg-blue-500
                         transition-all duration-150 active:scale-95"
              aria-label="Envoyer"
            >
              {loading
                ? <Loader2 size={16} className="animate-spin" />
                : <Send size={16} />}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
