import React from 'react'
import { Divider, Skeleton, Alert } from 'antd'

interface Props {
  title: string
  error: boolean
}

export const ListingsSkeleton = ({ title, error = false }: Props) => {
  const errorAlert = error ? (
    <Alert
      type='error'
      message='Uh oh! Somethin went wrong :('
      className='listings-skeleton__alert'
    />
  ) : null
  return (
    <div className='listings-skeleton'>
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
    </div>
  )
}
