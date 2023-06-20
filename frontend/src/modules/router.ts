import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import type { RouteLocationRaw } from 'vue-router/auto'

const router = createRouter({
  extendRoutes: routes => setupLayouts(routes),
  history: createWebHistory(),
})

router.beforeEach(async (to): Promise<RouteLocationRaw | undefined | boolean> => {
  const authStore = useAuthStore()
  const { isAuthenticated, decodedToken, checkMetamaskStatus } = useAuth()
  const isMetamaskInstalled = await checkMetamaskStatus()

  function logout() {
    authStore.$reset()
    if (to.name !== 'Login')
      router.push({ name: 'Login' })
  }

  if (to.name === 'Login')
    return true
  if (!isAuthenticated.value || !isMetamaskInstalled) {
    authStore.$reset()
    return { name: 'Login' }
  }

  window.ethereum.on('chainChanged', () => logout())
  window.ethereum.on('accountsChanged', (...publicAddresses) => {
    const acc = (publicAddresses as string[])[0]
    if (!acc.length || acc !== decodedToken.value?.publicAddress)
      logout()
  })
})

export { router }
