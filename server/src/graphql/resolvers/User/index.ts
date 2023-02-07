import { Request } from 'express'
import { IResolvers } from '@graphql-tools/utils'
import { Database, User } from '../../../lib/types'
import {
  UserArgs,
  UserBookingArgs,
  UserBookingsData,
  UserListingsArgs,
  UserListingsData,
} from './types'
import { authorize } from '../../../lib/utils'

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request },
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id })

        if (!user) {
          throw new Error('User cannot be found')
        }

        // TODO: WARNING... Authorize function not working currently, all users are authorized by default.
        const viewer = await authorize(db, req)

        if (viewer && viewer._id === user._id) {
          user.authorized = true
        }

        user.authorized = true

        return user
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`)
      }
    },
  },

  User: {
    id: (user: User): string => user._id,
    hasWallet: (user: User): boolean => Boolean(user.walletId),
    income: (user: User): number | null =>
      user.authorized ? user.income : null,
    bookings: async (
      user: User,
      { limit, page }: UserBookingArgs,
      { db }: { db: Database },
    ): Promise<UserBookingsData | null> => {
      try {
        if (!user.authorized) return null

        const data: UserBookingsData = {
          total: 0,
          result: [],
        }

        let cursor = await db.bookings.find({
          _id: { $in: user.bookings },
        })

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit)

        data.total = await db.bookings.countDocuments({
          _id: { $in: user.bookings },
        })

        data.result = await cursor.toArray()

        return data
      } catch (error) {
        throw new Error(`Failed to query user bookings: ${error}`)
      }
    },
    listings: async (
      user: User,
      { limit, page }: UserListingsArgs,
      { db }: { db: Database },
    ): Promise<UserListingsData | null> => {
      console.log(user.authorized)
      try {
        const data: UserListingsData = {
          total: 0,
          result: [],
        }

        let cursor = await db.listings.find({
          _id: { $in: user.listings },
        })

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit)

        data.total = await db.listings.countDocuments({
          _id: { $in: user.listings },
        })

        data.result = await cursor.toArray()

        return data
      } catch (error) {
        throw new Error(`Failed to query user listings: ${error}`)
      }
    },
  },
}
