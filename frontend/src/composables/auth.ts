import detectEthereumProvider from '@metamask/detect-provider'
import jwtDecode from 'jwt-decode'
import type { Token } from '~/types'

export interface UseAuth {
  checkMetamaskStatus: () => Promise<boolean>
  decodedToken: ComputedRef<Token | undefined>
  getPublicAddress: () => Promise<string | undefined>
  isAuthenticated: ComputedRef<boolean>
  setToken: (token: string) => void
  token: ComputedRef<string | null>
}

export function useAuth(): UseAuth {
  const authStore = useAuthStore()
  const token = computed(() => authStore.token)
  const decodedToken = computed<Token | undefined>(() => token.value ? jwtDecode(token.value) : undefined)
  const isAuthenticated = computed(() => !!decodedToken.value && decodedToken.value.exp > Math.floor(Date.now() / 1000))

  async function checkMetamaskStatus() {
    if (!window.ethereum)
      return false
    const provider = await detectEthereumProvider()
    if (!provider)
      /* c8 ignore next 1 */
      return false
    return true
  }
  async function getPublicAddress() {
    const publicAddresses = await window.ethereum.request<string[]>({ method: 'eth_requestAccounts' })
    if (!publicAddresses?.length)
      return
    return publicAddresses[0]
  }

  function setToken(token: string) {
    authStore.$patch({ token })
  }

  return {
    checkMetamaskStatus,
    decodedToken,
    getPublicAddress,
    isAuthenticated,
    setToken,
    token,
  }
}
