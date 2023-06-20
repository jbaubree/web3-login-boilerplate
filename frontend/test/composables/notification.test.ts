import { beforeEach, describe, expect, test } from 'vitest'
import type { Notification } from '../../src/composables/notification'
import { useNotification } from '../../src/composables/notification'

describe('useNotification', () => {
  let notification: Notification

  beforeEach(() => {
    notification = useNotification()
  })

  test('should have a notificationBus object', () => {
    expect(notification.notificationBus).toBeDefined()
  })
})
