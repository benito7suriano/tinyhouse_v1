import React from 'react'
import { Header } from 'antd/es/layout/layout'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Layout } from 'antd'

import logo from './assets/hosty-logo.png'

import { MenuItems } from './components'
import { Viewer } from '../../lib/types'
import { displayErrorMessage } from '../../lib/utils'

interface Props {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

const { Search } = Input

export const AppHeader = ({ viewer, setViewer }: Props) => {
  const navigate = useNavigate()
  const onSearch = (value: string) => {
    const trimmedValue = value.trim()

    if (trimmedValue) {
      navigate(`/listings/${trimmedValue}`)
    } else {
      displayErrorMessage('Please enter a valid search!')
    }
  }
  return (
    <Header className='app-header'>
      <div className='app-header__logo-search-section'>
        <div className='app-header__logo'>
          <Link to={'/'}>
            <img src={logo} alt='App logo' />
          </Link>
        </div>
      </div>
      <div className='app-header__search-input'>
        <Search
          placeholder={`Search 'San Francisco'`}
          enterButton
          onSearch={onSearch}
        />
      </div>
      <div className='app-header__menu-section'>
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  )
}
