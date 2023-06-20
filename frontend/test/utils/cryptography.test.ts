import { afterEach, describe, expect, test, vi } from 'vitest'
import { signMessage } from '../../src/utils/cryptography'

declare global {
  interface Window {
    ethereum: any
  }
}

window.ethereum = {
  request: vi.fn(),
}

describe('signMessage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('should sign the message using the provided passphrase', async () => {
    const expectedSignature = '0xabcdef123456'
    window.ethereum.request.mockResolvedValueOnce(expectedSignature)

    const message = 'Hello, world!'
    const passphrase = 'secret'

    const signature = await signMessage(message, passphrase)

    expect(signature).toBe(expectedSignature)
    expect(window.ethereum.request).toHaveBeenCalledTimes(1)
    expect(window.ethereum.request).toHaveBeenCalledWith({
      method: 'personal_sign',
      params: ['0x48656c6c6f2c20776f726c6421', passphrase],
    })
  })

  test('should log an error if signing fails', async () => {
    const expectedError = new Error('Signing failed')
    window.ethereum.request.mockRejectedValueOnce(expectedError)

    const message = 'Hello, world!'
    const passphrase = 'secret'

    console.error = vi.fn()

    await signMessage(message, passphrase)

    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(expectedError)
  })
})
