import { useRef, useEffect } from 'react'
import { Paper, TextInput, Button, Group } from '@mantine/core'
import styles from './MessageInput.module.css'

interface MessageInputProps {
  message: string
  onMessageChange: (value: string) => void
  onSend: () => void
  isLoading: boolean
}

export function MessageInput({ message, onMessageChange, onSend, isLoading }: MessageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isLoading && message === '') {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    }
  }, [isLoading, message])

  return (
    <Paper p="sm" mb="sm">
      <Group>
        <TextInput
          ref={inputRef}
          variant="unstyled"
          placeholder="Сообщение"
          value={message}
          onChange={(e) => onMessageChange(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              onSend()
            }
          }}
          className={styles.input}
        />
        <Button onClick={onSend} loading={isLoading} disabled={!message.trim()}>
          Отправить
        </Button>
      </Group>
    </Paper>
  )
}
