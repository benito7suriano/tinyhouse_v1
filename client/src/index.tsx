import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/react-hooks'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Affix } from 'antd'

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

const client = new ApolloClient({ uri: '/api', cache: new InMemoryCache() })

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer)
  return (
    <Router>
      <Affix offsetTop={0} className='app__affix-header'>
        <AppHeader viewer={viewer} />
      </Affix>
      <React.StrictMode>
        <Routes>
          {/* React Router v6 doesn't use exact, because all routes match exactly by default */}
          <Route path='/' element={<Home />} />
          <Route path='/host' element={<Host />} />
          <Route path='/listing/:id' element={<Listing />} />
          <Route path='/listings/:location?' element={<Listings />} />
          <Route path='/user/:id' element={<User />} />
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
