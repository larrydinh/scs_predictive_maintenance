import React from 'react'
import { Layout } from '../components'
import { AppNavigation } from './app-navigation/app-navigation'

export const DashBoardPage: React.FC = () => {
  return (
    <Layout name="Dashboard" appNavigation={<AppNavigation />}>
      <p>Dashboard</p>
    </Layout>
  )
}
