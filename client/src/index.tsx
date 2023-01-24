import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/react-hooks'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
  const [viewer, setViewer] = useState(initialViewer)
  return (
    <Router>
      <Routes>
        {/* React Router v6 doesn't use exact, because all routes match exactly by default */}
        <Route path='/' element={<Home />} />
        <Route path='/host' element={<Host />} />
        <Route path='/listing/:id' element={<Listing />} />
        <Route path='/listings/:location?' element={<Listings />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
