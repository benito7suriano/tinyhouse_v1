import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Layout, List, Typography, Affix } from 'antd'
import { Link } from 'react-router-dom'
import { ListingCard, ErrorBanner } from '../../lib/components'
import { LISTINGS } from '../../lib/graphql/queries'
import {
  ListingsQuery as ListingsData,
  ListingsQueryVariables,
} from '../../gql/graphql'
import { ListingsFilter } from '../../gql/graphql'
import {
  ListingsFilters,
  ListingsPagination,
  ListingsSkeleton,
} from './components'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography
const PAGE_LIMIT = 4

export const Listings = () => {
  const [filter, setFilter] = useState(ListingsFilter.PriceLowToHigh)
  const [page, setPage] = useState(1)

  const { location } = useParams()

  const locationRef = useRef(location)

  const { data, loading, error } = useQuery<
    ListingsData,
    ListingsQueryVariables
  >(LISTINGS, {
    skip: locationRef.current !== location && page !== 1,
    variables: {
      location: location!,
      filter: filter,
      limit: PAGE_LIMIT,
      page,
    },
  })

  useEffect(() => {
    setPage(1)
    locationRef.current = location
  }, [location])

  if (loading) {
    return (
      <Content className='listings'>
        <ListingsSkeleton />
      </Content>
    )
  }

  if (error) {
    return (
      <Content className='listings'>
        <ErrorBanner
          description={`We either couldn't find anything matching your search or have encountered and error. If you're searching for a unique location, try searching again with more common keywords.`}
        />
      </Content>
    )
  }

  // When data is available from our query, we'll look to obtain the listings field from data and assign it to a listings constant.
  const listings = data ? data.listings : null
  const listingsRegion = listings ? listings.region : null

  console.log('filter:', filter)

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
