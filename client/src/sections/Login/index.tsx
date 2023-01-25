import React from 'react'
import { Layout, Card, Typography } from 'antd'
import { useApolloClient } from '@apollo/react-hooks'

import googleLogo from './assets/google_logo.jpg'
import { Viewer } from '../../lib/types'
import { AUTH_URL } from '../../lib/graphql/queries/AuthUrl'
import { AuthUrlQuery } from '../../gql/graphql'

const { Content } = Layout
const { Text, Title } = Typography

interface Props {
  setViewer: (viewer: Viewer) => void
}

export const Login = ({ setViewer }: Props) => {
  const client = useApolloClient()

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlQuery>({
        query: AUTH_URL,
      })
      window.location.href = data.authUrl
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Content className='log-in'>
      <Card className='log-in-card'>
        <div className='log-in-card__intro'>
          <Title level={3} className='log-in-card__intro-title'>
            <span role='img' aria-label='wave'>
              👋
            </span>
          </Title>
          <Title level={3} className='log-in-card__intro-title'>
            Log in to TinyHouse!
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button
          className='log-in-card__google-button'
          onClick={handleAuthorize}>
          <img
            src={googleLogo}
            alt='Google Logo'
            className='log-in-card__google-button-logo'
          />
          <span className='log-in-card__google-button-text'>
            Sign in with Google
          </span>
        </button>
        <Text type='secondary'>
          Note: by signing in, you'll be redirected to the Google consent form
          to sign in with your Google account.
        </Text>
      </Card>
    </Content>
  )
}
