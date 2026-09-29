export type Message = {
  id: string
  text: string
  timestamp: Date
  isOwn: boolean
}

export type AuthData = {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
}

export interface SendMessageResponse {
  idMessage: string
}

export interface SendMessageRequest {
  chatId: string
  message: string
  typingTime?: number
  quotedMessageId?: string
}

export interface ReceiveNotificationResponse {
  receiptId: number
  body: any
}

export interface CheckAccountRequest {
  phoneNumber: number
  force?: boolean
}

export interface CheckAccountResponse {
  exist: boolean
  chatId: string
  fromCache: boolean
}

export interface GetStateInstanceResponse {
  stateInstance: string
}
