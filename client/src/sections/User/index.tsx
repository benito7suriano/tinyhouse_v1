import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'

import { USER } from '../../lib/graphql/queries'
import { UserQuery as UserData, UserQueryVariables } from '../../gql/graphql'
import { UserProfile } from './components'
import { Viewer } from '../../lib/types'
import { ErrorBanner, PageSkeleton } from '../../lib/components'
import { UserListings, UserBookings } from './components'

const { Content } = Layout

interface Props {
  viewer: Viewer
}

const PAGE_LIMIT = 4

export const User = ({ viewer }: Props) => {
  const { id } = useParams()
  const [listingsPage, setListingsPage] = useState(1)
  const [bookingsPage, setBookingsPage] = useState(1)

  const { data, loading, error } = useQuery<UserData, UserQueryVariables>(
    USER,
    {
      variables: { id: id!, bookingsPage, listingsPage, limit: PAGE_LIMIT },
    },
  )

  if (loading) {
    return (
      <Content className='user'>
        <PageSkeleton />
      </Content>
    )
  }

  if (error) {
    return (
      <Content>
        <ErrorBanner description='This user may not exist or we have encountered a problem. Please try again soon.' />
        <PageSkeleton />
      </Content>
    )
  }

  const user = data ? data.user : null
  const viewerIsUser = viewer.id === id
  const userProfileElement = user && (
    <UserProfile user={user} viewerIsUser={viewerIsUser} />
  )

  const userListings = user ? user.listings : null
  const userBookings = user ? user.bookings : null

  const userListingsElement = userListings && (
    <UserListings
      userListings={userListings}
      listingsPage={listingsPage}
      limit={PAGE_LIMIT}
      setListingsPage={setListingsPage}
    />
  )

  const userBookingsElement = userBookings && (
    <UserBookings
      userBookings={userBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  )

  return (
    <Content className='user'>
      <Row gutter={12} typeof='flex' justify={'space-between'}>
        <Col xs={24}>{userProfileElement}</Col>
        <Col>
          {userListingsElement}
          {userBookingsElement}
        </Col>
      </Row>
    </Content>
  )
}
