import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useMutation,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/react-hooks'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Affix, Layout, Spin } from 'antd'

import { Viewer } from './lib/types'
import 'antd/dist/reset.css'
import {
  Home,
  Host,
  Listing,
  Listings,
  Login,
  NotFound,
  User,
  AppHeader,
} from './sections'
import './styles/index.css'
import { AppHeaderSkeleton, ErrorBanner } from './lib/components'

import { LOG_IN } from './lib/graphql/mutations/LogIn'
import {
  LogInMutation as LogInData,
  LogInMutationVariables,
} from './gql/graphql'

const httpLink = new HttpLink({ uri: '/api' })

const authMiddleware = new ApolloLink((operation, forward) => {
  // Our ApolloClient configuration is unaware of the `viewer` state object because it's created/defined otuside the context of our React app. We'll have the token as part of our client's `sessionStorage` and retrieve the token from here.
  const token = sessionStorage.getItem('token')
  operation.setContext({
    headers: { 'X-CSRF-TOKEN': token || '' },
  })
  return forward(operation)
})

//www.apollographql.com/docs/react/networking/advanced-http-networking/
const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
})

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer)
  const [logIn, { error }] = useMutation<LogInData, LogInMutationVariables>(
    LOG_IN,
    {
      onCompleted: (data) => {
        if (data && data.logIn) {
          setViewer(data.logIn)
          // when we successfully log-in with a cookie in the App component, we'll set our token in sessionStorage
          if (data.logIn.token) {
            sessionStorage.setItem('token', data.logIn.token)
          } else {
            sessionStorage.removeItem('token')
          }
        }
      },
    },
  )

  const logInRef = useRef(logIn)

  useEffect(() => {
    logInRef.current()
  }, [])

  if (!viewer.didRequest && !error) {
    return (
      <Layout className='app-skeleton'>
        <AppHeaderSkeleton />
        <div className='app-skeleton__spin-section'>
          <Spin size='large' tip='Launching Hosty...' />
        </div>
      </Layout>
    )
  }

  const logInErrorBannerElement = error && (
    <ErrorBanner description='We were not able to verify if you were logged in' />
  )

  return (
    <Router>
      {logInErrorBannerElement}
      <Affix offsetTop={0} className='app__affix-header'>
        <AppHeader viewer={viewer} setViewer={setViewer} />
      </Affix>
      <React.StrictMode>
        <Routes>
          {/* React Router v6 doesn't use exact, because all routes match exactly by default */}
          <Route path='/' element={<Home />} />
          <Route path='/host' element={<Host />} />
          <Route path='/listing/:id' element={<Listing />} />
          <Route path='/listings/:location?' element={<Listings />} />
          {/* React Router v6 swtiched from `render` or `component` to `element` */}
          <Route path='/user/:id' element={<User viewer={viewer} />} />
          {/* In React Router v6 we switched from using v5's <Route component> and <Route render> APIs to <Route element>. */}
          <Route path='/login' element={<Login setViewer={setViewer} />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </React.StrictMode>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
