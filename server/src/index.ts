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
// import { listingResolvers } from './graphql/resolvers/Listing'

import cookieParser from 'cookie-parser'

import { ObjectId } from 'mongodb'
import { ListingType } from './lib/types'

interface MyContext {
  token?: string
}

const mount = async (app: Application) => {
  const httpServer = http.createServer(app)
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  const db = await connectDatabase()
  server.start().then(() => {
    console.log('server started...')
    app.use(cookieParser(process.env.SECRET))
    app.use(
      '/api',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
        context: async ({ req, res }) => ({
          token: req.headers.token,
          db,
          req,
          res,
        }),
      }),
    )
    new Promise<void>((resolve) =>
      httpServer.listen({ port: process.env.PORT }, resolve),
    ).then(() => {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/api`)
    })
  })

  // CHECKING CONNECTION TO MONGODB CLUSTER
  // const listings = await db.listings.find({}).toArray()
  // console.log(listings)

  // CHECKING IF WE CAN SEED
  // await db.listings.insertOne({ //...})
}

mount(express())
