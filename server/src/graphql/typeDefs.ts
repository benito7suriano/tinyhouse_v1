export const typeDefs = `#gql
  # Comments in GraphQL strings start with the hash symbol.

  # Enum properties must be capitalized for good practice.
  enum ListingType {
    APARTMENT
    HOUSE
  }

	# This "Listing" type defines the queryable fields for every listing in our data source.
  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    host: User!
    type: ListingType!
    address: String!
    city: String!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
    price: Int!
    numOfGuests: Int!
  }

  type Booking {
    id: ID!
    listing: Listing!
    tenant: User!
    checkIn: String!
    checkOut: String!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type Bookings {
    total: Int!
    result: [Booking!]!
  }

  type Listings {
    total: Int!
    result: [Listing!]!
  }

  # income and bookings are optional because we'll treat them as protected fields where we'll only allow these fields to be resolved to the intended values when a user is querying their own user info.
  # bookings and listings are to be paginated fields. The client will pass a limit field and a page field to dictate the amount or limit of data that is to be queried for a single page, and the chunk or page of data being queried, respectively.
  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings!
  }

  input LogInInput {
    code: String!
  }

  enum ListingsFilter {
    PRICE_LOW_TO_HIGH
    PRICE_HIGH_TO_LOW
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    listing(id: ID!): Listing!
    listings(location: String, filter: ListingsFilter!, limit: Int!, page: Int!): Listings!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`
