import type { ChatResponse } from '../types'

async function post(url: string, query: string): Promise<ChatResponse> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }

  return res.json() as Promise<ChatResponse>
}

// First message: backend creates a new conversation
export function startConversation(query: string): Promise<ChatResponse> {
  return post('/search/new', query)
}

// Follow-up messages in an existing conversation
export function sendMessage(
  conversationId: string,
  query: string
): Promise<ChatResponse> {
  return post(`/search/${conversationId}/message`, query)
}