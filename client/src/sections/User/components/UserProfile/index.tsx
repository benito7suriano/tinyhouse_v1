import React, { Fragment } from 'react'
import { UserQuery } from '../../../../gql/graphql'
import { Avatar, Card, Divider, Typography, Button } from 'antd'

const { Paragraph, Text, Title } = Typography

interface Props {
  user: UserQuery['user']
  viewerIsUser: boolean
}

export const UserProfile = ({ user, viewerIsUser }: Props) => {
  const additionalDetailsSection = viewerIsUser && (
    <Fragment>
      <Divider />
      <div className='user-profile__details'>
        <Title level={4}>Additional Details</Title>
        <Paragraph>
          Interested in become a Hosty host? Register with your Stripe account!
        </Paragraph>
        <Button type='primary' className='user-profile__details-cta'>
          Connect with Stripe!
        </Button>
        <Paragraph>
          Hosty uses{' '}
          <a
            href='https://stripe.com'
            target={'blank'}
            rel='noopener noreferrer'>
            Stripe
          </a>{' '}
          to help transfer your earnings in a secure and trusted manner.
        </Paragraph>
      </div>
    </Fragment>
  )

  return (
    <div className='user-profile'>
      <Card className='user-profile__card'>
        <div className='user-profile__avatar'>
          <Avatar size={100} src={user.avatar} />
        </div>
        <Divider />
        <div className='user-profile__details'>
          <Title level={4}>Details</Title>
          <Paragraph>
            Name: <Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Contact: <Text strong>{user.contact}</Text>
          </Paragraph>
        </div>
        {additionalDetailsSection}
      </Card>
    </div>
  )
}
