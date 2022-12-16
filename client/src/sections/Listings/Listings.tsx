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
    console.log(data)
  }

  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: '639a8321cbf1c2407f64f903',
      },
    })
    console.log(data)
  }

  return (
    <>
      <div>{title}</div>
      <button onClick={fetchListings}>Query Listings!</button>
      <button onClick={deleteListing}>Delete a Listing!</button>
    </>
  )
}
