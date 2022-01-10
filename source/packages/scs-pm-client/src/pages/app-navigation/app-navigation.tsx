import { BarsOutlined, DashboardOutlined, WalletOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import { DrawerProvider, IconButton } from '../../components'

export const AppNavigation: React.FC = () => {
  const drawerProvider = React.createRef<DrawerProvider>()
  const appNavigationAreas = [
    {
      label: 'Dashboard',
      value: '/dashboard',
      icon: <DashboardOutlined />,
    },
    {
      label: 'Resource Manager',
      value: '/resourceManagement',
      icon: <WalletOutlined />,
    },
  ]

  return (
    <>
      <IconButton
        size="middle"
        icon={<BarsOutlined />}
        style={{ marginLeft: 12, marginTop: 8 }}
        onClick={() => {
          if (drawerProvider.current) {
            drawerProvider.current.toggleOpen()
          }
        }}
        toolTip={``}
      />

      <DrawerProvider
        ref={drawerProvider}
        title={`SCS Predictive Maintenance`}
        width={400}
        isRelativePosition={true}
        placement="left"
      >
        <Route>
          {({ history }: RouteComponentProps<any>) => (
            <Menu
              onClick={({ key }) => {
                history.push(key.toString())
              }}
              mode="vertical"
            >
              {appNavigationAreas.map(({ label, value, icon }) => (
                <Menu.Item key={value} icon={icon}>
                  {label}
                </Menu.Item>
              ))}
            </Menu>
          )}
        </Route>
      </DrawerProvider>
    </>
  )
}
