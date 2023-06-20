import { Schema, model } from 'mongoose'
import type { IUser } from 'web3-login-boilerplate-shared'
import { generateNonce } from '../utils/crypto'

const schema = new Schema<IUser, IUser>(
  {
    nickname: String,
    nonce: { type: String, required: true, default: () => generateNonce() },
    publicAddress: { type: String, required: true, unique: true, index: true },
    token: String,
  },
  { timestamps: true },
)

const User = model('User', schema)

export { User }
