import { Request } from 'express'
import { Database, User } from '../types'

// we're using null instead of undefined as the returned type because Mongo's `findOne()` function either returns the intended document object or `null`.
export const authorize = async (
  db: Database,
  req: Request,
): Promise<User | null> => {
  const token = req.get('X-CSRF-TOKEN')
  const viewer = await db.users.findOne({
    _id: req.signedCookies.viewer,
    token,
  })

  return viewer
}
