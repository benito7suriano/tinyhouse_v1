import { MongoClient } from "mongodb";

const user = 'beno7suriano'
const password = ''
const cluster = 'tinyhouse-v1.mmwkocb'

const url = `mongodb+srv://beno7suriano:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`

export const connectDatabase = () => {
  const client = MongoClient.connect(url)
}
