import React from 'react'
import { List, Typography } from 'antd'
import { ListingCard } from '../../../../lib/components'
import { UserQuery } from '../../../../gql/graphql'

interface Props {
  userListings: UserQuery['user']['listings']
  listingsPage: number
  limit: number
  setListingsPage: (page: number) => void
}

const { Paragraph, Title } = Typography

export const UserListings = ({
  userListings,
  listingsPage,
  limit,
  setListingsPage,
}: Props) => {
  const { total, result } = userListings
  const userListingsList = (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }}
      dataSource={result}
      // helps introduce text for empty lists
      locale={{ emptyText: 'User does not have any listings yet!' }}
      pagination={{
        position: 'top',
        current: listingsPage,
        total,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setListingsPage(page),
      }}
      renderItem={(userListing) => (
        <List.Item>
          <ListingCard listing={userListing} />
        </List.Item>
      )}
    />
  )

  return (
    <div className='user-listings'>
      <Title level={4} className='user-listings__description'>
        Listings
      </Title>
      <Paragraph className='user-listings__description'>
        This section highlights the listings this user currently hosts and has
        made available for bookings.
      </Paragraph>
      {userListingsList}
    </div>
  )
}
