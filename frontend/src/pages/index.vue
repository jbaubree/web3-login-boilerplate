<script setup lang="ts">
</script>

<template>
  <div class="flex gap-2.5 items-center">
    <span>Home</span>
    <RouterLink
      class="bg-blue-500 px-3 py-2 transition-colors rounded cursor-pointer hover:bg-blue-600 text-white"
      :to="{ name: 'Login' }"
    >
      Go to login page
    </RouterLink>
  </div>
</template>
