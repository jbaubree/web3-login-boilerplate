import { Buffer } from 'buffer/'

export async function signMessage(message: string, passphrase: string) {
  try {
    const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [msg, passphrase],
    })
    return signature
  }
  catch (err) {
    console.error(err)
  }
}
