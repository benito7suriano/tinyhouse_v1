import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Avatar } from 'antd'
import { HomeFilled, UserOutlined, LogoutOutlined } from '@ant-design/icons'

import { Viewer } from '../../../../lib/types'

import { useMutation } from '@apollo/react-hooks'
import { LOG_OUT } from '../../../../lib/graphql/mutations/LogOut'
import { LogOutMutation as LogOutData } from '../../../../gql/graphql'
import {
  displayErrorMessage,
  displaySuccessNotification,
} from '../../../../lib/utils'

const { Item, SubMenu } = Menu

interface Props {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

export const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut)
        displaySuccessNotification(`You've successfully logged out!`)
      }
    },
    onError: () => {
      displayErrorMessage(
        `Sorry! We weren't able to log you out. Please try again.`,
      )
    },
  })

  const handleLogOut = () => {
    logOut()
  }

  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu key={'header-submenu'} title={<Avatar src={viewer.avatar} />}>
        <Item key={`/user/${viewer.id}`}>
          <Link to={`/user/${viewer.id}`}>
            <UserOutlined />
            Profile
          </Link>
        </Item>
        <Item key={'/logout'}>
          <div onClick={handleLogOut}>
            <LogoutOutlined />
            Log out
          </div>
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
