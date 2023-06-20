<script setup lang="ts">
import { signMessage } from '~/utils/cryptography'

const GET_USER_NONCE = `#graphql
  query GetUserNonce ($publicAddress: String!) {
    user (publicAddress: $publicAddress) {
      nonce
      publicAddress
    }
  }
`

const SIGN_IN = `#graphql
  mutation SignIn ($publicAddress: String!, $signature: String!) {
    signIn (publicAddress: $publicAddress, signature: $signature) {
      token
    }
  }
`

const router = useRouter()
const authStore = useAuthStore()
const { getPublicAddress, setToken, checkMetamaskStatus, isAuthenticated } = useAuth()
const { execute: getNonce, onData: onGetNonceData } = useQuery<{ user: { nonce: string; publicAddress: string } }>({ query: GET_USER_NONCE, fetchOnMount: false })
const { execute: signIn } = useMutation<{ signIn: { token: string } }>(SIGN_IN, {
  onData(data) {
    setToken(data.signIn.token)
    router.push({ name: 'Root' })
  },
})

async function connect() {
  const isMetamaskInstalled = await checkMetamaskStatus()
  if (!isMetamaskInstalled) {
    window.open(STATIC_URL.metamaskDownloadPage, '_blank')
    return
  }

  const publicAddress = await getPublicAddress()
  if (!publicAddress)
    return

  getNonce({ variables: { publicAddress } })
  onGetNonceData(async ({ user: { nonce } }) => {
    const signature = await signMessage(`I am signing my one-time nonce: ${nonce}`, publicAddress)
    if (signature)
      signIn({ publicAddress, signature })
  })
}
</script>

<template>
  <div class="flex items-center gap-2.5">
    <div
      class="px-3 py-2 transition-colors rounded cursor-pointer text-white"
      :class="isAuthenticated ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'"
      @click="isAuthenticated ? authStore.$reset() : connect()"
    >
      {{ isAuthenticated ? 'Disconnect' : 'Connect' }}
    </div>
    <RouterLink
      v-if="isAuthenticated"
      class="bg-blue-500 px-3 py-2 transition-colors rounded cursor-pointer hover:bg-blue-600 text-white"
      :to="{ name: 'Root' }"
    >
      Go to home
    </RouterLink>
  </div>
</template>
