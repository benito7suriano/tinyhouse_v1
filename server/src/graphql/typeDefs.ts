export const typeDefs = `#qgl
  # Comments in GraphQL strings start with the hash symbol.

	# This "Listing" type defines the queryable fields for every listing in our
	# data source.
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }

  type Query {
    authUrl: String!
  }

  type Mutation {
    logIn: String!
    logOut: String!
  }
`
