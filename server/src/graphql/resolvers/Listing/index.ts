import { IResolvers } from '@graphql-tools/utils'
import { Listing } from '../../../lib/types'

export const listingResolvers: IResolvers = {
  Listing: {
    // Note: A listing document in our database differs from a user document in our database since _id for a listing document is an ObjectId and not a string. This is why we've used the toString() helper to convert the _id value to a string as we resolve the id field for a Listing GraphQL object.
    id: (listing: Listing): string => {
      return listing._id.toString()
    },
  },
}
