import { dateTypeDefs } from './date'
import { userTypeDefs } from './user'

const typeDefs = [
  dateTypeDefs,
  userTypeDefs,
]

export { typeDefs }
export default typeDefs.join('')
