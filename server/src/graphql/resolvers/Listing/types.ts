import { Booking } from '../../../lib/types'

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
