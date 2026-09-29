import { useState, useCallback, useEffect } from 'react'
import { storage } from '../lib/storage'
import { sendMessage, receiveNotification, deleteNotification } from '../api/api'
import { parseIncomingMessage } from '../lib/parseNotification'
import type { Message } from '../types'

export function useChat(pollingInterval = 3000) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addMessage = useCallback((msg: Message) => {
    setMessages(prev =>
      prev.some(m => m.id === msg.id) ? prev : [...prev, msg]
    )
  }, [])

  const sendText = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    setIsSending(true)
    setError(null)
    try {
      const auth = storage.getAuth()
      const chatId = storage.getChatId()
      if (!auth) throw new Error('No auth data found')
      if (!chatId) throw new Error('No chat ID found')

      const response = await sendMessage(auth, chatId, trimmed)
      addMessage({
        id: response.idMessage,
        text: trimmed,
        timestamp: new Date(),
        isOwn: true,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send')
    } finally {
      setIsSending(false)
    }
  }, [addMessage])

  useEffect(() => {
    const auth = storage.getAuth()
    if (!auth) return

    let cancelled = false
    let timeoutId: number | undefined
    const lastErrorRef = { current: null as string | null }

    const tick = async () => {
      try {
        const notification = await receiveNotification(auth, 5)
        if (notification?.body) {
          const parsed = parseIncomingMessage(notification)
          if (parsed) addMessage(parsed)
          await deleteNotification(auth, notification.receiptId)
        }
        setError(null)
        if (lastErrorRef.current) {
          lastErrorRef.current = null
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Ошибка сети'
        if (lastErrorRef.current !== errorMessage) {
          lastErrorRef.current = errorMessage
          console.error('Failed to receive notification:', errorMessage)
        }
      }
    }

    const loop = async () => {
      if (cancelled) return
      await tick()
      if (!cancelled) timeoutId = window.setTimeout(loop, pollingInterval)
    }

    loop()
    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [addMessage, pollingInterval])

  return { messages, isSending, error, sendText }
}
