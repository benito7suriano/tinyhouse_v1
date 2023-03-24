import { IResolvers } from '@graphql-tools/utils'
import { Database, Listing, User } from '../../../lib/types'
import { ListingArgs, ListingsFilter, ListingsQuery } from './types'
import { ObjectId } from 'mongodb'
import { authorize } from '../../../lib/utils'
import { Request } from 'express'
import {
  ListingBookingArgs,
  ListingBookingsData,
  ListingsArgs,
  ListingsData,
} from './types'
import { Google } from '../../../lib/api'

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
    listings: async (
      _root: undefined,
      { location, filter, limit, page }: ListingsArgs,
      { db }: { db: Database },
    ): Promise<ListingsData> => {
      try {
        const data: ListingsData = {
          region: null,
          total: 0,
          result: [],
        }
        const query: ListingsQuery = {}

        if (location) {
          const { country, admin, city } = await Google.geocode(location)

          if (city) query.city = city
          if (admin) query.admin = admin
          if (country) {
            query.country = country
          } else {
            throw new Error('No country found!')
          }

          const cityText = city ? `${city}, ` : ''
          const adminText = admin ? `${admin}, ` : ''

          data.region = `${cityText}${adminText}${country}`
        }

        let cursor = await db.listings.find(query)

        if (filter && filter === ListingsFilter.PRICE_LOW_TO_HIGH) {
          cursor = cursor.sort({ price: 1 })
        }

        if (filter && filter === ListingsFilter.PRICE_HIGH_TO_LOW) {
          cursor = cursor.sort({ price: -1 })
        }

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit)

        data.total = await db.listings.countDocuments()
        data.result = await cursor.toArray()

        return data
      } catch (error) {
        throw new Error(`Failed to query listings: ${error}`)
      }
    },
  },
  Listing: {
    // Note: A listing document in our database differs from a user document in our database since _id for a listing document is an ObjectId and not a string. This is why we've used the toString() helper to convert the _id value to a string as we resolve the id field for a Listing GraphQL object.
    id: (listing: Listing): string => {
      return listing._id.toString()
    },
    host: async (
      listing: Listing,
      _args = {},
      { db }: { db: Database },
    ): Promise<User> => {
      const host = await db.users.findOne({ _id: listing.host })
      if (!host) {
        throw new Error('Host cannot be found')
      }
      return host
    },
    // On the client, we'll receive the `bookingsIndex` of a listing as a string and we'll parse it to get the object we're looking for.
    bookingsIndex: (listing: Listing): string => {
      return JSON.stringify(listing.bookingsIndex)
    },
    bookings: async (
      listing: Listing,
      { limit, page }: ListingBookingArgs,
      { db }: { db: Database },
    ): Promise<ListingBookingsData | null> => {
      try {
        if (!listing.authorized) {
          return null
        }

        const data: ListingBookingsData = {
          total: 0,
          result: [],
        }

        let cursor = await db.bookings.find({
          _id: { $in: listing.bookings },
        })

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit)

        data.total = await db.bookings.countDocuments({
          _id: { $in: listing.bookings },
        })
        data.result = await cursor.toArray()

        return data
      } catch (error) {
        throw new Error(`Failed to query listing bookings: ${error}`)
      }
    },
  },
}
