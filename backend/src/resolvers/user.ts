import { verifyMessage } from 'ethers'
import type { IResolvers } from 'web3-login-boilerplate-shared'
import { User } from '../models/User'
import { generateNonce } from '../utils/crypto'
import { generateToken } from '../utils/jwt'
import type { ApolloContext } from '../types'

const userResolvers: IResolvers<ApolloContext> = {
  Query: {
    user: async (_, { publicAddress }) => User.findOneAndUpdate(
      { publicAddress },
      { $set: { nonce: generateNonce(), publicAddress } },
      { upsert: true, new: true },
    ),
  },
  Mutation: {
    signIn: async (_, { publicAddress, signature }) => {
      const user = await User.findOne({ publicAddress }, {}, { new: true })
      if (!user)
        return null
      const msg = `I am signing my one-time nonce: ${user.nonce}`
      const recoveredAddress = verifyMessage(msg, signature)
      const isValid = recoveredAddress.toLowerCase() === publicAddress.toLowerCase()
      user.nonce = generateNonce()
      if (isValid)
        user.token = generateToken(user)
      return user
    },
  },
}

export { userResolvers }
