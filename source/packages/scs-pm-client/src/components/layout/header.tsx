import * as React from 'react'
import './header.css'

export interface HeaderProps {
  appName: string
  name?: string
  action?: React.ReactNode
  appNavigation: React.ReactNode
}

const LogoStyle: React.CSSProperties = { cursor: 'pointer' }

export const Header: React.FC<HeaderProps> = ({ appName, name, action, appNavigation }: HeaderProps) => (
  <header className="main-header">
    {appNavigation}
    <h1 className="app-name" style={LogoStyle}>
      {appName} {name ? <em> ({name})</em> : null}
    </h1>
    {action ? action : null}
  </header>
)
