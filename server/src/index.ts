import dotenv from 'dotenv'
dotenv.config()

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express, { Application } from 'express'
import http from 'http'
import cors from 'cors'
import { json } from 'body-parser'
import { typeDefs, resolvers } from './graphql/index'

import { connectDatabase } from './database/index'

interface MyContext {
  token?: string;
}

const mount = async (app: Application) => {
  const httpServer = http.createServer(app)
  const server = new ApolloServer<MyContext>({ typeDefs, resolvers, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] })
  const db = await connectDatabase()
  server.start().then(() => {
    console.log('server started...')
    app.use(
      '/api',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
       context: async ({ req }) => ({ token: req.headers.token, db })
      })
    )
    new Promise<void>(resolve => (
      httpServer.listen({ port: 9000 }, resolve)
    )).then(() => {
      console.log(`🚀 Server ready at http://localhost:9000/api`)
    })
  })
  const listings = await db.listings.find({}).toArray()
  console.log(listings)
}

mount(express())
