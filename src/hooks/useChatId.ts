import { useState } from 'react'
import { storage } from '../lib/storage'

export function useChatId() {
  const [chatId, setChatIdState] = useState<string | null>(() => storage.getChatId())

  const setChatId = (id: string) => {
    storage.setChatId(id)
    setChatIdState(id)
  }

  const clearChatId = () => {
    storage.clearChatId()
    setChatIdState(null)
  }

  return { chatId, setChatId, clearChatId }
}