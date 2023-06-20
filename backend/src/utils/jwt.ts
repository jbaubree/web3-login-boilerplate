import { sign } from 'jsonwebtoken'
import type { IUser } from 'web3-login-boilerplate-shared'

export function generateToken(user: IUser) {
  const { id, publicAddress } = user
  return sign(
    { id, publicAddress },
    process.env.JWT_PRIVATE_KEY!,
    { expiresIn: '1d' },
  )
}
