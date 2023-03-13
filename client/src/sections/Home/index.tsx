import React from 'react'
import { Layout, Col, Row, Typography, Button } from 'antd'
import { HomeHero } from './components'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { displayErrorMessage } from '../../lib/utils'

import mapBackground from './assets/map-background.jpg'
import sanFranciscoImage from './assets/san-francisco.jpg'
import cancunImage from './assets/cancun.jpg'

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

      <div className='home__listings'>
        <Title level={4} className='home__listings-title'>
          Listings of any kind
        </Title>
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Link to={'/listings/san%20francisco'}>
              <div className='home__listings-img-cover'>
                <img
                  src={sanFranciscoImage}
                  alt='San Francisco'
                  className='home__listings-img'
                />
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={12}>
            <Link to={'/listings/cancun'}>
              <div className='home__listings-img-cover'>
                <img
                  src={cancunImage}
                  alt='Cancún'
                  className='home__listings-img'
                />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    </Content>
  )
}
