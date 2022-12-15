import React from 'react'
import { server } from '../../lib/api'

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

interface Props {
  title: string
}

export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch({ query: LISTINGS })
    console.log(data)
  }
  return (
    <>
      <div>{title}</div>
      <button onClick={fetchListings}>Query Listings!</button>
    </>
  )
}
