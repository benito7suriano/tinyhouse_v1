import { Booking, Listing } from '../../../lib/types'

export interface ListingArgs {
  id: string
}

export interface ListingBookingArgs {
  limit: number
  page: number
}

export interface ListingBookingsData {
  total: number
  result: Booking[]
}

export enum ListingsFilter {
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
}

export interface ListingsArgs {
  location: string | null
  filter: ListingsFilter
  limit: number
  page: number
}

export interface ListingsData {
  region: string | null
  total: number
  result: Listing[]
}

export interface ListingsQuery {
  country?: string
  admin?: string
  city?: string
}
