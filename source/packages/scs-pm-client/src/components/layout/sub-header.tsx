import { Tooltip } from 'antd'
import * as React from 'react'
import './header.css'

export interface Props {
  name: string
  subTitle?: string
  actions?: React.ReactNode[]
}

export const SubHeader: React.FC<Props> = ({ name, subTitle, actions }: Props) => (
  <header className="main-header">
    <Tooltip title={name} placement="bottom">
      <h3 className="sub-header">
        <em>
          {name.length > 30 ? `${name.substring(0, 30)}...` : name} {subTitle}
        </em>
      </h3>
    </Tooltip>
    <div className="sub-header-control-panel-container">
      <div className="sub-header-control-panel">{actions && actions.map(action => action)}</div>
    </div>
  </header>
)
