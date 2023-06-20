import type { UseEventBusReturn } from '@vueuse/core'
import type { ToastVariant } from '~/types'

export interface NotificationBusEvent {
  variant?: ToastVariant
  message: string
}

export interface Notification {
  notificationBus: UseEventBusReturn<NotificationBusEvent, any>
}

const notificationBus = useEventBus<NotificationBusEvent>('notification')

export function useNotification(): Notification {
  return {
    notificationBus,
  }
}
