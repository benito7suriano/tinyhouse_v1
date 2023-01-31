import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu } from 'antd'
import { HomeFilled } from '@ant-design/icons'

const { Item, SubMenu } = Menu

export const MenuItems = () => {
  return (
    <Menu mode='horizontal' selectable={false} className='menu'>
      <Item key='/host'>
        <Link to={'/host'}>
          <HomeFilled />
          Host
        </Link>
      </Item>
      <Item key={'/login'}>
        <Link to={'/login'}>
          <Button type='primary'>Sign in</Button>
        </Link>
      </Item>
    </Menu>
  )
}
