export const typeDefs = `#qgl
  # Comments in GraphQL strings start with the hash symbol.

	# This "Book" type defines the queryable fields for every book in our
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
    listings: [Listing!]!
  }
`
