import { useState } from 'react'
import type { KeyboardEvent } from 'react'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')

  const submit = () => {
    const text = value.trim()
    if (!text || disabled) return
    onSend(text)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter adds a new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="border-t border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="flex items-end gap-3">
        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="max-h-32 flex-1 resize-none rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 transition focus:border-cyan-400/60 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
        />
        <button
          onClick={submit}
          disabled={disabled || !value.trim()}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
        >
          Send
        </button>
      </div>
    </div>
  )
}