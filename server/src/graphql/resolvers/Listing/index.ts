import { IResolvers } from '@graphql-tools/utils'
import { Database, Listing } from '../../../lib/types'
import { ListingArgs } from './types'
import { ObjectId } from 'mongodb'
import { authorize } from '../../../lib/utils'
import { Request } from 'express'

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (
      _root: undefined,
      { id }: ListingArgs,
      { db, req }: { db: Database; req: Request },
    ): Promise<Listing> => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectId(id) })
        if (!listing) {
          throw new Error('Listing cannot be found')
        }

        const viewer = await authorize(db, req)
        if (viewer && viewer._id === listing.host) {
          listing.authorized = true
        }

        return listing
      } catch (error) {
        console.error(error)
        throw new Error(`Failed to query listing: ${error}`)
      }
    },
  },
  Listing: {
    // Note: A listing document in our database differs from a user document in our database since _id for a listing document is an ObjectId and not a string. This is why we've used the toString() helper to convert the _id value to a string as we resolve the id field for a Listing GraphQL object.
    id: (listing: Listing): string => {
      return listing._id.toString()
    },
  },
}
