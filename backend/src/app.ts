import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { json } from 'body-parser'

import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import type { ApolloContext } from './types'

async function createServer() {
  dotenv.config({ path: 'backend/.env' })
  await mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(async () => {
      // eslint-disable-next-line no-console
      console.log('🚀  Database connection succesed !')
    })
    .catch(err => console.error('Database connection failed !', err))
  const app = express()
  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  })

  await server.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.authorization }),
    }),
  )
  app.listen(8000)
  // eslint-disable-next-line no-console
  console.log('🚀  Server is ready in http://localhost:8000/graphql !')
}

createServer()
