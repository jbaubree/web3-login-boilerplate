const userTypeDefs = `#graphql
  type User {
    publicAddress: String!
    nonce: String!
    token: String
    id: ID!
    nickname: String
  }
  type Query {
    user(publicAddress: String!): User
  }
  type Mutation {
    signIn(publicAddress: String!, signature: String!): User
  }
`

export { userTypeDefs }
