import { randomBytes } from 'node:crypto'

export function generateNonce() {
  return randomBytes(32).toString('hex')
}
