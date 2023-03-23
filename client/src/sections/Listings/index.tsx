import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Layout, List } from 'antd'
import { ListingCard } from '../../lib/components'
import { LISTINGS } from '../../lib/graphql/queries'
import {
  ListingsQuery as ListingsData,
  ListingsQueryVariables,
} from '../../gql/graphql'
import { ListingsFilter } from '../../gql/graphql'

const { Content } = Layout
const PAGE_LIMIT = 8

export const Listings = () => {
  const { data } = useQuery<ListingsData, ListingsQueryVariables>(LISTINGS, {
    variables: {
      filter: ListingsFilter.PriceLowToHigh,
      limit: PAGE_LIMIT,
      page: 1,
    },
  })

  // When data is available from our query, we'll look to obtain the listings field from data and assign it to a listings constant.
  const listings = data ? data.listings : null

  const listingsSectionElement = listings && (
    <List
      grid={{ gutter: 8, xs: 1, sm: 2, lg: 4 }}
      dataSource={listings.result}
      renderItem={(listing) => (
        <List.Item>
          <ListingCard listing={listing} />
        </List.Item>
      )}
    />
  )

  return <div>Listings</div>
}
