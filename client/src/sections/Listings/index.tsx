import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Layout, List, Typography, Affix } from 'antd'
import { Link } from 'react-router-dom'
import { ListingCard } from '../../lib/components'
import { LISTINGS } from '../../lib/graphql/queries'
import {
  ListingsQuery as ListingsData,
  ListingsQueryVariables,
} from '../../gql/graphql'
import { ListingsFilter } from '../../gql/graphql'
import { ListingsFilters, ListingsPagination } from './components'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography
const PAGE_LIMIT = 4

export const Listings = () => {
  const [filter, setFilter] = useState(ListingsFilter.PriceLowToHigh)
  const [page, setPage] = useState(1)
  const { location } = useParams()
  const { data } = useQuery<ListingsData, ListingsQueryVariables>(LISTINGS, {
    variables: {
      location: location!,
      filter: ListingsFilter.PriceLowToHigh,
      limit: PAGE_LIMIT,
      page,
    },
  })

  // When data is available from our query, we'll look to obtain the listings field from data and assign it to a listings constant.
  const listings = data ? data.listings : null
  const listingsRegion = listings ? listings.region : null

  console.log(listings)

  const listingsSectionElement =
    listings && listings.result.length ? (
      <div>
        <Affix offsetTop={64}>
          <div>
            <ListingsPagination
              total={listings.total}
              page={page}
              limit={PAGE_LIMIT}
              setPage={setPage}
            />
            <ListingsFilters filter={filter} setFilter={setFilter} />
          </div>
        </Affix>
        <List
          grid={{ gutter: 8, xs: 1, sm: 2, lg: 4 }}
          dataSource={listings.result}
          renderItem={(listing) => (
            <List.Item>
              <ListingCard listing={listing} />
            </List.Item>
          )}
        />
      </div>
    ) : (
      <div className=''>
        <Paragraph>
          It appears that no listings have yet been created for{' '}
          <Text mark>"{listingsRegion}"</Text>
        </Paragraph>
        <Paragraph>
          Be the first person to create a{' '}
          <Link to='/host'>listing in this area</Link>.
        </Paragraph>
      </div>
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
