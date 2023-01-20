import { Collection, ObjectId } from 'mongodb'

export interface BookingsIndexMonth {
  [key: string]: boolean
}

export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth
}

export interface BookingsIndex {
  [key: string]: BookingsIndexYear
}

export interface Booking {
  _id: ObjectId
}

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
}

export interface Listing {
  _id: ObjectId
  title: string
  description: string
  image: string
  host: string
  type: ListingType
  address: string
  country: string
  admin: string
  city: string
  bookings: ObjectId[]
  bookingsIndex: BookingsIndex
  price: number
  numOfGuests: number
}

export interface User {
  _id: ObjectId
  token: string
  name: string
  avatar: string
  contact: string
  walletId?: string
  income: number
  bookings: ObjectId[]
  listings: ObjectId[]
}

export interface Database {
  bookings: Collection<Booking>
  listings: Collection<Listing>
  users: Collection<User>
}
