import { MongoClient } from "mongodb";

const user = 'beno7suriano'
const password = ''
const cluster = 'tinyhouse-v1.mmwkocb'

const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  const db = client.db('main')

  return {
    listings: db.collection('test_listings')
  }
}
