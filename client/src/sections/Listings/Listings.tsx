import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/react-hooks'
// import {
//   ListingsData,
//   DeleteListingData,
//   DeleteListingVariables,
//   Listing,
// } from './types'
import {
  Listing,
  ListingsQuery,
  Mutation,
  MutationDeleteListingArgs,
} from '../../gql/graphql'
import { List } from 'antd'
import './styles/Listings.css'

// import { server, useQuery, useMutation } from '../../lib/api'

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`

interface Props {
  title: string
}

export const Listings = ({ title }: Props) => {
  const { data, loading, error, refetch } = useQuery<ListingsQuery>(LISTINGS)

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<Mutation, MutationDeleteListingArgs>(DELETE_LISTING)

  const handleDeleteListing = async (id: string) => {
    try {
      await deleteListing({ variables: { id } })
      refetch()
    } catch (error) {
      console.error(error)
    }
  }

  const listings = data ? data.listings : null

  const listingsList = listings && (
    <List
      itemLayout='horizontal'
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item>
          <List.Item.Meta title={listing.title} />
        </List.Item>
      )}
    />
  )

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Uh oh! Something went wrong -- please try again later :(</h2>
  }

  const deleteListingLoadingMessage = deleteListingLoading && (
    <h4>Deletion in progress...</h4>
  )

  const deleteListingErrorMessage = deleteListingError && (
    <h4>
      Uh oh! Something went wrong while deleting :(. Please try again soon.
    </h4>
  )

  return (
    <div className='listings'>
      <div>{title}</div>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  )
}
