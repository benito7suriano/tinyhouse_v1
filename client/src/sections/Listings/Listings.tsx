import React, { useState, useEffect } from 'react'
import { server, useQuery, useMutation } from '../../lib/api'
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
  Listing,
} from './types'

const LISTINGS = `
  query {
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

const DELETE_LISTING = `
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
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS)

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING)

  const handleDeleteListing = async (id: string) => {
    try {
      await deleteListing({ id })
      refetch()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteListingLoadingMessage = deleteListingLoading && (
    <h4>Deletion in progress...</h4>
  )

  const listings = data ? data.listings : null

  const listingsList = listings && (
    <ul>
      {listings.map((listing) => (
        <div key={listing.id}>
          <li>{listing.title}</li>
          <button onClick={() => handleDeleteListing(listing.id)}>
            Delete
          </button>
        </div>
      ))}
    </ul>
  )

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Uh oh! Something went wrong -- please try again later :(</h2>
  }

  return (
    <>
      <div>{title}</div>
      {listingsList}
      {deleteListingLoadingMessage}
    </>
  )
}
