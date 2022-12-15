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
  return <div>{title}</div>
}
