import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import type { Message } from '../types'

interface ChatWindowProps {
  messages: Message[]
  loading: boolean
}

export default function ChatWindow({ messages, loading }: ChatWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || messages.length === 0) return

    // Scroll ONLY this container, never the page or parent wrappers
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div
      ref={containerRef}
      className="chat-scroll min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-6"
    >
      {messages.length === 0 && !loading && (
        <div className="flex h-full items-center justify-center text-center">
          <div>
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 opacity-90 shadow-[0_0_40px_rgba(34,211,238,0.5)]" />
            <p className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-2xl font-semibold text-transparent">
              Welcome to AskGenius
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Ask me anything to get started.
            </p>
          </div>
        </div>
      )}

      {messages.map((m, i) => (
        <MessageBubble key={i} {...m} />
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}