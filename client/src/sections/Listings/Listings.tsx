import React from 'react'
import { server } from '../../lib/api'
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
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
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS })
    console.log(data)
  }
  return (
    <>
      <div>{title}</div>
      <button onClick={fetchListings}>Query Listings!</button>
    </>
  )
}
