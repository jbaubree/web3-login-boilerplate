<script setup lang="ts">
import type { ToastVariant } from '~/types'

const { variant = 'success', message } = defineProps<{
  message: string
  variant?: ToastVariant
}>()

const icon = computed(() => {
  switch (variant) {
    case 'success':
      return 'i-ph-check-bold'
    case 'danger':
      return 'i-ph-x-bold'
    case 'warning':
      return 'i-ph-warning-bold'
  }
})

const iconColor = computed(() => {
  switch (variant) {
    case 'success':
    case 'danger':
      return 'text-white'
    case 'warning':
      return 'text-black'
  }
})
</script>

<template>
  <div class="max-w-300px inline-flex items-center gap-2.5 rounded p-20px shadow" :class="`bg-${variant}`">
    <div class="h-5 w-5" :class="[icon, iconColor]" />
    <span class="font-roboto text-sm" :class="variant === 'warning' ? 'text-black' : 'text-white'">
      {{ message }}
    </span>
  </div>
</template>
