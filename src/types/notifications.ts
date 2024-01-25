import type { DocData } from './common'

// /users/{uid}/notifications/{id}
export type Notification = {
  receiver: string
  isViewed: boolean
  message: string
  createdAt: number
  type?: 'alert'
  priority?: 'low' | 'medium' | 'high'
  expiresAt?: number
  link?: string
}
export type DocNotification = DocData<Notification>