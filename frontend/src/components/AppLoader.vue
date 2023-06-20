<script setup lang="ts">
const { isLoading } = useAppLoader()
</script>

<template>
  <div v-if="isLoading" class="fixed inset-0 z-1000 cursor-wait">
    <div class="absolute left-50% top-50% -translate-1/2">
      <div class="i-ph-spinner-gap-bold h-2rem w-2rem animate-spin" />
    </div>
  </div>
</template>
