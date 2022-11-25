import { GraphQLSchema, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLNonNull } from "graphql";

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello from the Query!"
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello from the Mutation!"
    }
  }
});

const Listing = new GraphQLObjectType({
  name: "Listing",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {type: new GraphQLNonNull(GraphQLString)},
    image: {type: new GraphQLNonNull(GraphQLString)},
    address: {type: new GraphQLNonNull(GraphQLString)},
    price: {type: new GraphQLNonNull(GraphQLInt)},
    numOfGuests: {type: new GraphQLNonNull(GraphQLInt)},
    numOfBeds: {type: new GraphQLNonNull(GraphQLInt)},
    numOfBaths: {type: new GraphQLNonNull(GraphQLInt)},
    rating: {type: new GraphQLNonNull(GraphQLInt)},
  }
})

export const schema = new GraphQLSchema({query,mutation})
