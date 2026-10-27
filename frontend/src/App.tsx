import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import { startConversation, sendMessage } from './api/chatApi'
import type { Message } from './types'

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSend = async (query: string) => {
    setMessages((prev) => [...prev, { role: 'user', text: query }])
    setLoading(true)

    try {
      const data = conversationId
        ? await sendMessage(conversationId, query)
        : await startConversation(query)

      if (!conversationId) setConversationId(data.conversationId)

      setMessages((prev) => [...prev, { role: 'bot', text: data.response }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Something went wrong. Please check that the backend is running and try again.',
          isError: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setConversationId(null)
  }

return (
  <div className="bg-grid relative flex h-screen justify-center overflow-hidden bg-[#05060a]">
    {/* Background glows */}
    <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
    <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-600/25 blur-[120px]" />

    <div className="relative z-10 flex h-full min-h-0 w-full max-w-3xl flex-col overflow-hidden border-x border-white/10 bg-black/40 shadow-[0_0_60px_rgba(34,211,238,0.08)] backdrop-blur-xl">
      {/* header, ChatWindow and ChatInput stay exactly the same */}
        <header className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
            </span>
            <h1 className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-lg font-semibold tracking-wide text-transparent">
              AskGenius AI
            </h1>
          </div>
          <button
            onClick={handleNewChat}
            className="rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-sm text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/15 hover:shadow-[0_0_15px_rgba(34,211,238,0.35)]"
          >
            New chat
          </button>
        </header>

        <ChatWindow messages={messages} loading={loading} />
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  )
}