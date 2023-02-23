import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { LISTING } from '../../lib/graphql/queries'
import { Layout } from 'antd'
import { PageSkeleton } from '../../lib/components'
import {
  ListingQuery as ListingData,
  ListingQueryVariables,
} from '../../gql/graphql'
import { useParams } from 'react-router-dom'

const { Content } = Layout
const PAGE_LIMIT = 3

export const Listing = () => {
  const { id } = useParams()
  const [bookingsPage, setBookingsPage] = useState(1)
  const { loading, data, error } = useQuery<ListingData, ListingQueryVariables>(
    LISTING,
    {
      variables: {
        id: id!,
        bookingsPage,
        limit: PAGE_LIMIT,
      },
    },
  )

  if (loading) {
    return (
      <Content className='listings'>
        <PageSkeleton />
      </Content>
    )
  }

  return <div>Listing</div>
}
