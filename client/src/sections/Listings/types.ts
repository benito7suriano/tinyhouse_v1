interface Listing {
  id: string
  title: string
  image: string
  address: string
  price: number
  numOfGuests: number
  numOfBeds: number
  numOfBaths: number
  rating: number
}

export type ListingsData = {
  listings: Listing[]
}

export interface DeleteListingData {
  listing: Listing
}

export interface DeleteListingVariables {
  id: string
}
