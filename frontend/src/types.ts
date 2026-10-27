export interface Message {
  role: 'user' | 'bot'
  text: string
  isError?: boolean
}

export interface ChatResponse {
  conversationId: string
  response: string
}