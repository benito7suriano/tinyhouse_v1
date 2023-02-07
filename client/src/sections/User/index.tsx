import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { USER } from '../../lib/graphql/queries'
import { UserQuery as UserData, UserQueryVariables } from '../../gql/graphql'
import { useParams } from 'react-router-dom'

export const User = () => {
  const { id } = useParams()
  const { data, loading, error } = useQuery<UserData, UserQueryVariables>(
    USER,
    {
      variables: { id: id! },
    },
  )

  return (
    <div className=''>
      <h2>User</h2>
    </div>
  )
}
