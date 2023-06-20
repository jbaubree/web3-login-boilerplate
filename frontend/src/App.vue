<script setup lang="ts">
</script>

<template>
  <RouterView v-slot="{ Component }">
    <AppLoader />
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
    <Notifications />
  </RouterView>
</template>
