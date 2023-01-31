import React from 'react'
import { Header } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'

import logo from './assets/hosty-logo.png'

import { MenuItems } from './components'

export const AppHeader = () => {
  return (
    <Header className='app-header'>
      <div className='app-header__logo-search-section'>
        <div className='app-header__logo'>
          <Link to={'/'}>
            <img src={logo} alt='App logo' />
          </Link>
        </div>
      </div>
      <div className='app-header__menu-section'>
        <MenuItems />
      </div>
    </Header>
  )
}
