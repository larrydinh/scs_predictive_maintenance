import { Layout as AntdLayout } from 'antd'
import * as React from 'react'
import { MinimalComponentProps } from '../../models'
import { Header } from './header'
import './layout.css'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../../package.json')
const { Footer } = AntdLayout

export interface LayoutProps extends MinimalComponentProps {
  children?: React.ReactNode
  name?: string
  action?: React.ReactNode
  appNavigation: React.ReactNode
}

const DefaultHeader = (props: any) => (
  <Header appName={props.appName} name={props.name} action={props.action} appNavigation={props.appNavigation} />
)

export const Layout: React.FC<LayoutProps> = ({ name, children, action, appNavigation }: LayoutProps) => (
  <div className="viewport">
    <DefaultHeader appName="SCS Predictive Maintenance" name={name} action={action} appNavigation={appNavigation} />
    <div className="flex-row">
      <div className="content-scroll-container">{children}</div>
    </div>
    <Footer style={{ textAlign: 'center' }}>
      SCS Predictive Maintenance ©2021 Created by SCS Group, Version: {version}, HostName:
      {window.location.hostname}
    </Footer>
  </div>
)
