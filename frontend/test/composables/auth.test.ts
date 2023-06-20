import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { useRoute, useRouter } from 'vue-router'
import { generateTestingUtils } from 'eth-testing'

import type { UseAuth } from '../../src/composables/auth'
import { useAuth } from '../../src/composables/auth'
import { useAuthStore } from '../../src/stores/auth'

declare global {
  interface Window {
    ethereum: any
  }
}

vi.mock('jwt-decode', () => ({ default: vi.fn() }))
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
  useRoute: vi.fn(),
}))
vi.mock('../../src/stores/auth', () => ({
  useAuthStore: vi.fn(),
}))

describe('useAuth', () => {
  const testingUtils = generateTestingUtils({ providerType: 'MetaMask' })

  let auth: UseAuth
  let authStoreMock
  let routeMock
  let routerMock

  beforeEach(() => {
    authStoreMock = {
      token: 'exampleToken',
      $patch: vi.fn(),
      $reset: vi.fn(),
    }
    routeMock = {
      name: 'SomeRoute',
    }
    routerMock = {
      push: vi.fn(),
    }
    vi.mocked(useAuthStore).mockReturnValue(authStoreMock)
    vi.mocked(useRoute).mockReturnValue(routeMock)
    vi.mocked(useRouter).mockReturnValue(routerMock)
    auth = useAuth()
  })
  afterEach(() => {
    testingUtils.clearAllMocks()
  })

  test('should return false when window.ethereum does not exists', async () => {
    window.ethereum = undefined
    const result = await auth.checkMetamaskStatus()
    expect(result).toBe(false)
  })
  test('should return false when detectEthereumProvider returns null', async () => {
    const result = await auth.checkMetamaskStatus()
    expect(result).toBe(false)
  })
  test('should return true when window.ethereum exists', async () => {
    window.ethereum = testingUtils.getProvider()
    const result = await auth.checkMetamaskStatus()
    expect(result).toBe(true)
  })

  test('should get public address', async () => {
    const publicAddress = '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
    testingUtils.mockRequestAccounts([publicAddress])
    const result = await auth.getPublicAddress()
    expect(result).toBe(publicAddress)
  })
  test('should return undefined when no public address set', async () => {
    testingUtils.mockRequestAccounts([])
    const result = await auth.getPublicAddress()
    expect(result).toBe(undefined)
  })

  test('should set token', () => {
    const token = 'exampleToken'
    auth.setToken(token)
    expect(auth.token.value).toBe(token)
  })
})
