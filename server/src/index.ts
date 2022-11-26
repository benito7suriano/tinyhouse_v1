import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { json } from 'body-parser'

import { schema } from './graphql'

interface MyContext {
  token?: string;
}

const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer<MyContext>({ schema, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] })
server.start().then(() => {
  console.log('server started...')
  app.use(
    '/api',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  )
  new Promise<void>((resolve) => httpServer.listen({ port: 9000 }, resolve)).then(() => {
    console.log(`🚀 Server ready at http://localhost:9000/api`)
  })
})

