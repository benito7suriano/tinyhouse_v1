import React, { useState, useEffect } from 'react'
import { server, useQuery } from '../../lib/api'
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
  const { data } = useQuery<ListingsData>(LISTINGS)

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    })
    // must re-fetch to update the UI with the list w/o deleted item.
    // fetchListings()
  }

  const listings = data ? data.listings : null

  const listingsList = listings && (
    <ul>
      {listings.map((listing) => (
        <div key={listing.id}>
          <li>{listing.title}</li>
          <button onClick={() => deleteListing(listing.id)}>Delete</button>
        </div>
      ))}
    </ul>
  )

  return (
    <>
      <div>{title}</div>
      {listingsList}
    </>
  )
}
