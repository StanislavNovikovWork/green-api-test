import type {
  AuthData,
  SendMessageResponse,
  SendMessageRequest,
  ReceiveNotificationResponse,
  CheckAccountRequest,
  CheckAccountResponse,
  GetStateInstanceResponse
} from '../types'

export async function sendMessage(
  auth: AuthData,
  chatId: string,
  text: string
): Promise<SendMessageResponse> {
  const { apiUrl, idInstance, apiTokenInstance } = auth
  const url = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId,
      message: text,
    } satisfies SendMessageRequest),
  })

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`)
  }

  return response.json()
}



export async function receiveNotification(
  auth: AuthData,
  receiveTimeout: number = 5
): Promise<ReceiveNotificationResponse | null> {
  const { apiUrl, idInstance, apiTokenInstance } = auth
  const url = `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${receiveTimeout}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.status === 408) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to receive notification: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()

  if (!text || text.trim() === '') {
    return null
  }

  try {
    const data = JSON.parse(text)

    if (!data || !data.body) {
      return null
    }

    return data
  } catch (error) {
    console.error('Failed to parse notification response:', error)
    return null
  }
}

export async function deleteNotification(
  auth: AuthData,
  receiptId: number
): Promise<void> {
  const { apiUrl, idInstance, apiTokenInstance } = auth
  const url = `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to delete notification: ${response.statusText}`)
  }
}



export async function checkAccount(
  auth: AuthData,
  data: CheckAccountRequest
): Promise<CheckAccountResponse> {
  const { apiUrl, idInstance, apiTokenInstance } = auth
  const url = `${apiUrl}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to check account: ${response.statusText}`)
  }

  return response.json()
}



export async function getStateInstance(
  auth: AuthData
): Promise<GetStateInstanceResponse> {
  const { apiUrl, idInstance, apiTokenInstance } = auth
  const url = `${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to get instance state: ${response.statusText}`)
  }

  return response.json()
}
