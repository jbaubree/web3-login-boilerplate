import { dateScalar } from './date'
import { userResolvers } from './user'

const resolvers = [
  { Date: dateScalar },
  userResolvers,
]

export { resolvers }
