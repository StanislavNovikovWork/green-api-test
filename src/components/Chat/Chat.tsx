import { useState, useEffect, useRef } from 'react'
import { AppShell, Title, Button, Container, Stack, Group } from '@mantine/core'
import { useChat } from '../../hooks/useChat'
import { MessagesList } from '../MessagesList'
import { MessageInput } from '../MessageInput'
import styles from './Chat.module.css'

interface ChatProps {
  onLogout: () => void
}

export function Chat({ onLogout }: ChatProps) {

  const { messages, isSending, sendText } = useChat()
  const [message, setMessage] = useState('')
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleLogout = () => {
    onLogout()
  }

  const handleSend = async () => {
    await sendText(message)
    setMessage('')
  }

  

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 400,
        breakpoint: 'sm',
        collapsed: { mobile: false },
      }}
      classNames={{
        main: styles.main,
      }}
    >
      <AppShell.Header>
        <div className={styles.header}>
          <Title order={3}>MAX Chat</Title>
          <Group>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Выйти
            </Button>
          </Group>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Title order={4}>Чаты</Title>
        <p>Здесь будет список чатов</p>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl" h="calc(100vh - 80px)" display="flex" className={styles.mainContainer}>
          <Stack h="100%" className={styles.messagesWrapper}>
            <div ref={messagesContainerRef} className={styles.messagesContainer}>
              <MessagesList messages={messages} />
            </div>
            <MessageInput
              message={message}
              onMessageChange={setMessage}
              onSend={handleSend}
              isLoading={isSending}
            />
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
