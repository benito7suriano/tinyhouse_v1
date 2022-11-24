import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { startStandaloneServer } from '@apollo/server/standalone'
import express from 'express'

import { schema } from './graphql'
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ schema })

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: 9000 },
}).then(({url}) => {
  console.log(`🚀 Server ready at ${ url }`)
})

