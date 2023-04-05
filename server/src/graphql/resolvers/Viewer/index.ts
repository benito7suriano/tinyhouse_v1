import { IResolvers } from '@graphql-tools/utils'
import { Google } from '../../../lib/api'
import crypto from 'crypto'
import { Viewer, Database, User } from '../../../lib/types'
import { LogInArgs } from './types'
import { Request, Response } from 'express'
import { update } from 'lodash'

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development' ? false : true,
}

const logInViaGoogle = async (
  code: string,
  token: string,
  db: Database,
  res: Response,
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code)

  if (!user) {
    throw new Error('Google login error')
  }

  // Names/Photos/Email Lists
  const userNamesList = user.names && user.names.length ? user.names : null
  const userPhotosList = user.photos && user.photos.length ? user.photos : null
  const userEmailsList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : null

  // User Display Name
  const userName = userNamesList ? userNamesList[0].displayName : null

  // User Id
  const userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null

  // User Avatar
  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null

  // User Email
  const userEmail =
    userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null

  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error('Google login error')
  }

  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token,
      },
    },
    { returnDocument: 'after' },
  )

  // if the user doesn't exist, insert and add a new user to the database.
  let viewer = updateRes.value

  if (!viewer) {
    const insertResultId = await db.users.insertOne({
      _id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      income: 0,
      bookings: [],
      listings: [],
    })
    viewer = await db.users.findOne({ _id: insertResultId })
  }

  // Set a new cookie with the key of `viewer`. For the value of the cookie, we'll use the `userId` of the user we've obtained.
  // We could take an additional security step here to encode the `userId` value as we set it as the value of the cookie and decode it when we attempt to retrieve the cookie. Since we've already signing the cookie, we won't take this additional step.
  res.cookie('viewer', userId, {
    ...cookieOptions,
    // Cookie expiration. Set to a year in millisecond format.
    maxAge: 365 * 24 * 60 * 60 * 1000,
  })

  return viewer
}

const logInViaCookie = async (
  token: string,
  db: Database,
  req: Request,
  res: Response,
): Promise<User | undefined> => {
  const updateRes = await db.users.findOneAndUpdate(
    { _id: req.signedCookies.viewer },
    { $set: { token } },
    { returnDocument: 'after' },
  )

  const viewer = updateRes.value

  if (!viewer) {
    res.clearCookie('viewer', cookieOptions)
  }

  return viewer
}

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`)
      }
    },
  },

  Mutation: {
    // will fire in one of two cases:
    // 1. when the viewer signs-in with the Google Auth URL and consent screen.
    // 2. when the viewer signs-in with their cookie session
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response },
    ): Promise<Viewer> => {
      try {
        // check if code from Google API exists
        const code = input ? input.code : null
        // create a random string to use as a session token
        const token = crypto.randomBytes(16).toString('hex')

        const viewer: User | undefined = code
          ? await logInViaGoogle(code, token, db, res)
          : await logInViaCookie(token, db, req, res)

        if (!viewer) {
          return { didRequest: true }
        }

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true,
        }
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`)
      }
    },
    logOut: (
      _root: undefined,
      _args: unknown,
      { res }: { res: Response },
    ): Viewer => {
      try {
        // Clear this `viewer` cookie when the viewer ever signs out.We'll access the `res` object available as context and use the `res.clearCookie()` of `cookie-parser` to specify that the viewer cookie is the cookie we'll like to clear. Most web browsers will only clear the cookie if the given options is identical to those given to `res.cookie()` (excluding `expires` or `maxAge`).
        res.clearCookie('viewer', cookieOptions)
        return { didRequest: true }
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`)
      }
    },
    connectStripe: (): Viewer => {
      return { didRequest: true }
    },
    disconnectStripe: (): Viewer => {
      return { didRequest: true }
    },
  },

  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id
    },
    hasWallet: (viewer: Viewer): boolean => {
      return viewer.walletId ? true : false
    },
  },
}
