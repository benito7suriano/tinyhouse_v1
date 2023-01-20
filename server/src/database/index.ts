import { MongoClient } from 'mongodb'
import { Database, Booking, User, Listing } from '../lib/types'

const user = process.env.MONGODB_CLIENT_USER
const password = process.env.MONGODB_CLIENT_PASSWORD
const cluster = process.env.MONGODB_CLUSTER

const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    // these options are no longer needed
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  const db = client.db('main')

  return {
    bookings: db.collection<Booking>('bookings'),
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('users'),
  }
}
