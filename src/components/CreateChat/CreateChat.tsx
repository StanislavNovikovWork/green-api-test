import { useState } from 'react'
import { Paper, MaskInput, Button, Title, Stack, Flex, Alert } from '@mantine/core'
import styles from './CreateChat.module.css'
import { storage } from '../../lib/storage'
import { checkAccount } from '../../api/api'

interface CreateChatProps {
  onCreateChat: (chatId: string) => void
}

export function CreateChat({ onCreateChat }: CreateChatProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const auth = storage.getAuth()

      if (!auth) {
        throw new Error('No auth data found')
      }

      const fullPhoneNumber = parseInt(`7${phoneNumber}`)

      const checkResult = await checkAccount(auth, {
        phoneNumber: fullPhoneNumber,
      })

      if (!checkResult.exist) {
        setError('Пользователь с таким номером не найден в MAX')
        return
      }

      const chatId = checkResult.chatId || `7${phoneNumber}@c.us`
      onCreateChat(chatId)
    } catch (err) {
      console.error('Failed to check account:', err)
      setError('Не удалось проверить номер телефона. Попробуйте позже.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex justify="center" align="center" h="100vh">
      <Paper withBorder shadow="md" p={40} radius="md" w={400}>
        <Stack gap="lg">
          <Title order={2} ta="center">
            Создать чат
          </Title>
          {error && (
            <Alert color="red" variant="light">
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <MaskInput
                withAsterisk
                label="Номер телефона"
                placeholder="+7 (999) 123-45-67"
                mask="+7 (999) 999-99-99"
                onChangeRaw={(value) => setPhoneNumber(value)}
                disabled={isLoading}
              />
              <Button
                type="submit"
                fullWidth
                size="md"
                className={styles.submitButton}
                disabled={phoneNumber.length !== 10 || isLoading}
                loading={isLoading}
              >
                Создать чат
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Flex>
  )
}
