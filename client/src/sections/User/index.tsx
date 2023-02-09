import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'

import { USER } from '../../lib/graphql/queries'
import { UserQuery as UserData, UserQueryVariables } from '../../gql/graphql'
import { UserProfile } from './components'
import { Viewer } from '../../lib/types'
import { ErrorBanner, PageSkeleton } from '../../lib/components'

const { Content } = Layout

interface Props {
  viewer: Viewer
}

export const User = ({ viewer }: Props) => {
  const { id } = useParams()
  const { data, loading, error } = useQuery<UserData, UserQueryVariables>(
    USER,
    {
      variables: { id: id! },
    },
  )

  if (loading) {
    return (
      <Content className='user'>
        <PageSkeleton />
      </Content>
    )
  }

  if (error) {
    return (
      <Content>
        <ErrorBanner description='This user may not exist or we have encountered a problem. Please try again soon.' />
        <PageSkeleton />
      </Content>
    )
  }

  const user = data ? data.user : null
  const viewerIsUser = viewer.id === id
  const userProfileElement = user && (
    <UserProfile user={user} viewerIsUser={viewerIsUser} />
  )

  return (
    <Content className='user'>
      <Row gutter={12} typeof='flex' justify={'space-between'}>
        <Col xs={24}>{userProfileElement}</Col>
      </Row>
    </Content>
  )
}
