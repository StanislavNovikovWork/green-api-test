import type { AuthData } from '../types'

const STORAGE_KEY = 'authData'
const CHAT_ID_KEY = 'chatId'

export const storage = {
  getAuth(): AuthData | null {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    try { return JSON.parse(raw) } catch { return null }
  },
  getChatId(): string | null {
    return localStorage.getItem(CHAT_ID_KEY)
  },
  setChatId(chatId: string): void {
    localStorage.setItem(CHAT_ID_KEY, chatId)
  },
  clearChatId(): void {
    localStorage.removeItem(CHAT_ID_KEY)
  },
}
