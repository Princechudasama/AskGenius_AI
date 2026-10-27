import type { Message } from '../types'

export default function MessageBubble({ role, text, isError }: Message) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]'
            : isError
            ? 'rounded-bl-sm border border-red-500/30 bg-red-500/10 text-red-300'
            : 'rounded-bl-sm border border-white/10 bg-white/5 text-gray-200 backdrop-blur-md'
        }`}
      >
        {text}
      </div>
    </div>
  )
}