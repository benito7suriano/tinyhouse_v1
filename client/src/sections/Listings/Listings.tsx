import React from 'react'

interface Props {
  title: string
}

export const Listings = ({ title }: Props) => {
  return <div>{title}</div>
}
