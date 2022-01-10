import React from 'react'
import { Layout } from '../components'
import { AppNavigation } from './app-navigation/app-navigation'
import './dash-board-page.css'

export const DashBoardPage: React.FC = () => {
  return (
    <Layout name="Dashboard" appNavigation={<AppNavigation />}>
      <>
        <div className="control-panel-container">
          <div className="control-panel">
            <p>Dashboard</p>
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/ic_scs.png`}
            alt={`${process.env.PUBLIC_URL}/ic_scs.png`}
            style={{
              minWidth: '25%',
              maxHeight: '100%',
              display: 'inline-block',
              margin: '0 auto',
              marginTop: 50,
            }}
          />
        </div>
      </>
    </Layout>
  )
}
