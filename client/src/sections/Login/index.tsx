import React, { useEffect, useRef } from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { Viewer } from '../../lib/types'
import { AUTH_URL } from '../../lib/graphql/queries/AuthUrl'
import { AuthUrlQuery as AuthUrlData } from '../../gql/graphql'
import { LOG_IN } from '../../lib/graphql/mutations/LogIn'
import {
  LogInMutation as LogInData,
  LogInMutationVariables,
} from '../../gql/graphql'

// Components
import { ErrorBanner } from '../../lib/components'
import {
  displaySuccessNotification,
  displayErrorMessage,
} from '../../lib/utils'

// Ant Design & Assets
import { Layout, Card, Typography, Spin } from 'antd'
import googleLogo from './assets/google_logo.jpg'
const { Content } = Layout
const { Text, Title } = Typography

interface Props {
  setViewer: (viewer: Viewer) => void
}

export const Login = ({ setViewer }: Props) => {
  const client = useApolloClient()
  const [logIn, { data: LogInData, loading: logInLoading, error: logInError }] =
    useMutation<LogInData, LogInMutationVariables>(LOG_IN, {
      onCompleted: (data) => {
        if (data && data.logIn) {
          setViewer(data.logIn)
          displaySuccessNotification(`You've successfully logged in!`)
        }
      },
    })
  const logInRef = useRef(logIn)

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')
    if (code) {
      // Since the login request is being instantiated within the component, we won't add it as a dependency. This is why we're using the `useRef` hook. It accepts an argument with which it returns a mutuable object which will persist for the lifetime of the component.
      // The `logInRef.current` property will reference the original function regardless of how many renders happen again. Our `useEffect` hook recognizes this and doesn't require us to specify the `logInRef` property in the dependencies list.
      logInRef.current({
        variables: {
          input: { code },
        },
      })
    }
  }, [])

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      })
      window.location.href = data.authUrl
    } catch (error) {
      console.error(error)
      displayErrorMessage(
        `Sorry! We weren't able to log you in. Please try again later!`,
      )
    }
  }

  const logInErrorBannerElement = logInError && (
    <ErrorBanner
      description={`We weren't able to log you in. Please try again soon.`}
    />
  )

  logInLoading && (
    <Content className='log-in'>
      <Spin size='large' tip='Logging you in...' />
    </Content>
  )

  return (
    <Content className='log-in'>
      {logInErrorBannerElement}
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
