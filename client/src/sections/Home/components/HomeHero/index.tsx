import React from 'react'
import { Card, Col, Input, Row, Typography } from 'antd'

import torontoImage from '../../assets/toronto.jpg'
import dubaiImage from '../../assets/dubai.jpg'
import losAngelesImage from '../../assets/los-angeles.jpg'
import londonImage from '../../assets/london.jpg'

const { Title } = Typography
const { Search } = Input

export const HomeHero = () => {
  return (
    <div className='home-hero'>
      <div className='home-hero__search'>
        <Title className='home-hero__title'>
          Find a place you'll love to stay at
        </Title>
        <Search
          placeholder={`Search 'San Francisco'`}
          size={'large'}
          enterButton
          className='home-hero__search-input'
        />
      </div>
      <Row gutter={12} className='home-hero__cards'></Row>
    </div>
  )
}
