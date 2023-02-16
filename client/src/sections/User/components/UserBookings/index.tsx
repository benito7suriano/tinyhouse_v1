import React from 'react'
import { List, Typography } from 'antd'
import { ListingCard } from '../../../../lib/components'
import { UserQuery } from '../../../../gql/graphql'

interface Props {
  userBookings: UserQuery['user']['bookings']
  bookingsPage: number
  limit: number
  setBookingsPage: (page: number) => void
}

export const UserBookings = ({
  userBookings,
  bookingsPage,
  limit,
  setBookingsPage,
}: Props) => {
  return <div>UserBookings</div>
}
