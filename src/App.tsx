import { useCallback } from 'react'
import { AuthForm } from './components/AuthForm'
import { Chat } from './components/Chat'
import { CreateChat } from './components/CreateChat'
import { MantineProvider } from '@mantine/core'
import { useAuth } from './hooks/useAuth'
import '@mantine/core/styles.css'
import { useChatId } from './hooks/useChatId'

function App() {
  const { authData, login, logout } = useAuth()
  const { chatId, setChatId, clearChatId } = useChatId()

  const handleLogout = useCallback(() => {
    logout()
    clearChatId()
  }, [logout, clearChatId])

  const content = () => {
    if (!authData) return <AuthForm onLogin={login} />
    if (!chatId) return <CreateChat onCreateChat={setChatId} />
    return <Chat onLogout={handleLogout} />
  }

  return <MantineProvider>{content()}</MantineProvider>
}

export default App
