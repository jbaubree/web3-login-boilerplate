<script setup lang="ts">
import type { ToastVariant } from '~/types'
import type { NotificationBusEvent } from '~/composables/notification'

const { notificationBus } = useNotification()

const notifications = ref<{
  message: string
  variant: ToastVariant
  popped: boolean
  id: number
}[]>([])
const id = ref(0)

function togglePopNotification(id: number) {
  const index = useArrayFindIndex(notifications, n => n.id === id)
  notifications.value[index.value].popped = !notifications.value[index.value].popped
}
function removeNotification(id: number) {
  notifications.value = notifications.value.filter(notification => notification.id !== id)
}
function listener(event: NotificationBusEvent) {
  const notificationId = id.value++
  notifications.value.push({
    message: event.message,
    variant: event.variant || 'warning',
    popped: false,
    id: notificationId,
  })
  setTimeout(() => {
    togglePopNotification(notificationId)
  }, 100)
  setTimeout(() => {
    togglePopNotification(notificationId)
    setTimeout(() => {
      removeNotification(notificationId)
    }, 300)
  }, 3000)
}

const unsubscribe = notificationBus.on(listener)

const sortedNotifications = computed(() => notifications.value.sort(notification => notification.popped ? -1 : 1))
const poppedNotifications = useArrayFilter(notifications, n => n.popped)

onUnmounted(() => unsubscribe())
</script>

<template>
  <div
    class="fixed z-1000 right-5 flex top-5 flex-col translate-x-0 gap-3 transition-transform"
    :class="{ 'translate-x-115': !poppedNotifications.length }"
  >
    <Toast
      v-for="{ popped, message, variant }, index in sortedNotifications"
      :key="index"
      class="translate-x-0 transition-transform"
      :class="{ 'translate-x-115': !popped }"
      v-bind="{ message, variant }"
    />
  </div>
</template>
