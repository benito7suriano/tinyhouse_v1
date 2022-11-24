"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const graphql_1 = require("./graphql");
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new server_1.ApolloServer({ schema: graphql_1.schema });
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 9000 },
}).then(url => {
    console.log(`🚀 Server ready at ${url}`);
});
