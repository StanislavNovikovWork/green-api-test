import type { Message } from '../types'

export function parseIncomingMessage(notification: any): Message | null {
  const { body } = notification
  if (
    body?.typeWebhook !== 'incomingMessageReceived' ||
    body.messageData?.typeMessage !== 'textMessage'
  ) return null

  const text = body.messageData.textMessageData?.textMessage
  if (!text) return null

  return {
    id: body.idMessage,
    text,
    timestamp: new Date(body.timestamp * 1000),
    isOwn: false,
  }
}
