import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Avatar } from 'antd'
import { HomeFilled, UserOutlined, LogoutOutlined } from '@ant-design/icons'

import { Viewer } from '../../../../lib/types'

const { Item, SubMenu } = Menu

interface Props {
  viewer: Viewer
}

export const MenuItems = ({ viewer }: Props) => {
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key={'/user'}>
          <UserOutlined />
          Profile
        </Item>
        <Item key={'/logout'}>
          <LogoutOutlined />
          Log out
        </Item>
      </SubMenu>
    ) : (
      <Item key={'/login'}>
        <Link to={'/login'}>
          <Button type='primary'>Sign in</Button>
        </Link>
      </Item>
    )

  return (
    <Menu mode='horizontal' selectable={false} className='menu'>
      <Item key='/host'>
        <Link to={'/host'}>
          <HomeFilled />
          Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  )
}
