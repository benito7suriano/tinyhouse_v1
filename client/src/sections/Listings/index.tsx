import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Layout, List, Typography } from 'antd'
import { ListingCard } from '../../lib/components'
import { LISTINGS } from '../../lib/graphql/queries'
import {
  ListingsQuery as ListingsData,
  ListingsQueryVariables,
} from '../../gql/graphql'
import { ListingsFilter } from '../../gql/graphql'

const { Content } = Layout
const { Title } = Typography
const PAGE_LIMIT = 8

export const Listings = () => {
  const { location } = useParams()
  const { data } = useQuery<ListingsData, ListingsQueryVariables>(LISTINGS, {
    variables: {
      location: location!,
      filter: ListingsFilter.PriceLowToHigh,
      limit: PAGE_LIMIT,
      page: 1,
    },
  })

  // When data is available from our query, we'll look to obtain the listings field from data and assign it to a listings constant.
  const listings = data ? data.listings : null
  const listingsRegion = listings ? listings.region : null

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

  const listingsRegionElement = listingsRegion && (
    <Title level={3} className='listings__title'>
      Results for '{listingsRegion}'
    </Title>
  )

  return (
    <Content className='listings'>
      {listingsRegionElement}
      {listingsSectionElement}
    </Content>
  )
}
