import { Paper, Text } from '@mantine/core'
import type { Message } from '../../types'
import styles from './MessagesList.module.css'

interface MessagesListProps {
  messages: Message[]
}

export function MessagesList({ messages }: MessagesListProps) {

  if (messages.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <Text ta="center" c="black" size="lg">
          Нет сообщений. Начните диалог!
        </Text>
      </div>
    )
  }

  return (
    <div className={`messages-container ${styles.container}`}>
      {messages.map((msg) => (
          <Paper
            key={msg.id}
            p="md"
            mb="sm"
            withBorder
            w="fit-content"
            className={`${styles.message} ${msg.isOwn ? styles.messageOwn : styles.messageIncoming}`}
          >
            <Text size="sm" className={styles.messageText}>{msg.text}</Text>
            <Text size="xs" c="dimmed" className={styles.messageTimestamp}>
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </Paper>
        ))
      }
    </div>
  )
}
