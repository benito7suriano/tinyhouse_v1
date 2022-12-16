import React, { useState } from 'react'
import { server } from '../../lib/api'
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
  const [listings, setListings] = useState<Listing[] | null>(null)

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS })
    setListings(data.listings)
  }

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    })
    // must re-fetch to update the UI with the list w/o deleted item.
    fetchListings()
  }

  const listingsList = listings && (
    <ul>
      {listings.map((listing) => (
        <div key={listing.id}>
          <li>{listing.title}</li>
          <button onClick={() => deleteListing(listing.id)}>Delete me</button>
        </div>
      ))}
    </ul>
  )

  return (
    <>
      <div>{title}</div>
      {listingsList}
      <button onClick={fetchListings}>Query Listings!</button>
    </>
  )
}
