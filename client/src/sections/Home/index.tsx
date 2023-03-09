import React from 'react'
import { Layout } from 'antd'
import { HomeHero } from './components'
import { useNavigate } from 'react-router-dom'

import mapBackground from './assets/map-background.jpg'
import { displayErrorMessage } from '../../lib/utils'

const { Content } = Layout

export const Home = () => {
  const navigate = useNavigate()
  const onSearch = (value: string) => {
    // String.prototype.trim() -> The trim() method removes whitespace from both ends of a string and returns a new string, without modifying the original string.
    const trimmedValue = value.trim()

    console.log(`trimmed value: ${trimmedValue}`)

    if (trimmedValue) {
      navigate(`/listings/${trimmedValue}`)
    } else {
      displayErrorMessage('Please enter a valid search!')
    }
  }

  return (
    <Content
      className='home'
      style={{ backgroundImage: `url(${mapBackground})` }}>
      <HomeHero onSearch={onSearch} />
    </Content>
  )
}
