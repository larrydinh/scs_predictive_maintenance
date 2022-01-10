import React from 'react'
import { Layout } from '../components'
import { AppNavigation } from './app-navigation/app-navigation'

export const ResourceManagementPage: React.FC = () => {
  return (
    <Layout name="Resource Manager" appNavigation={<AppNavigation />}>
      <p>Resource Manager</p>
    </Layout>
  )
}
