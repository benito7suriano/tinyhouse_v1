import React from 'react'
import { Layout, Col, Row, Typography, Button } from 'antd'
import { HomeHero } from './components'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import mapBackground from './assets/map-background.jpg'
import { displayErrorMessage } from '../../lib/utils'

const { Content } = Layout
const { Paragraph, Title } = Typography

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

      <div className='home__cta-section'>
        <Title level={2} className='home__cta-section-title'>
          Your guide to all things rental
        </Title>
        <Paragraph>
          Helping you make the best decisions in renting your last minute
          locations.
        </Paragraph>
        <Link to={'/listings/united%20states'}>
          <Button className='ant-btn ant-btn-primary ant-btn-lg home__cta-section-button'>
            Popular listings in the United States
          </Button>
        </Link>
      </div>
    </Content>
  )
}
