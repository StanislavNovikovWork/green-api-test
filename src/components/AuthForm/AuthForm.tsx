import { useState } from 'react'
import { Paper, TextInput, PasswordInput, Button, Title, Stack, Flex, Alert } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { AuthData } from '../../types'
import { getStateInstance } from '../../api/api'
import styles from './AuthForm.module.css'

interface AuthFormProps {
  onLogin: (data: AuthData) => void
}

export function AuthForm({ onLogin }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<AuthData>({
    mode: 'uncontrolled',
    initialValues: {
      apiUrl: '',
      idInstance: '',
      apiTokenInstance: '',
    },
    validate: {
      apiUrl: (value: string) => {
        try {
          new URL(value)
          return null
        } catch {
          return 'Некорректный URL'
        }
      },
      idInstance: (value: string) => (value.trim().length > 0 ? null : 'Обязательное поле'),
      apiTokenInstance: (value: string) => (value.trim().length > 0 ? null : 'Обязательное поле'),
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    setError(null)
    setIsLoading(true)

    try {
      await getStateInstance(values)
      onLogin(values)
    } catch (err) {
      console.error('Failed to validate instance:', err)
      setError('Неверные данные инстанса или инстанс не существует')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex justify="center" align="center" h="100vh">
      <Paper withBorder shadow="md" p={40} radius="md" w={400}>
        <Stack gap="lg">
          <Title order={2} ta="center">
            Вход в систему
          </Title>
          {error && (
            <Alert color="red" variant="light">
              {error}
            </Alert>
          )}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                withAsterisk
                label="API URL"
                placeholder="https://..."
                key={form.key('apiUrl')}
                {...form.getInputProps('apiUrl')}
                disabled={isLoading}
              />
              <TextInput
                withAsterisk
                label="ID Instance"
                placeholder="Введите ID Instance"
                key={form.key('idInstance')}
                {...form.getInputProps('idInstance')}
                disabled={isLoading}
              />
              <PasswordInput
                withAsterisk
                label="API Token Instance"
                placeholder="Введите API Token"
                key={form.key('apiTokenInstance')}
                {...form.getInputProps('apiTokenInstance')}
                disabled={isLoading}
              />
              <Button
                type="submit"
                fullWidth
                size="md"
                className={styles.submitButton}
                loading={isLoading}
              >
                Войти
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Flex>
  )
}
