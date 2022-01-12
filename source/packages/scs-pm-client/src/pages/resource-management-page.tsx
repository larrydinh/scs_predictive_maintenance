import React, { useState } from 'react'
import { Layout, Selector } from '../components'
import { AppEntity, getLabelValueFromEnum } from '../models'
import { AppNavigation } from './app-navigation/app-navigation'
import './dash-board-page.css'
import { ResourceManagementProvider } from './resource-management-provider'

export const ResourceManagementPage: React.FC = () => {
  const [entity, setEntity] = useState<string>()

  return (
    <Layout name="Resource Manager" appNavigation={<AppNavigation />}>
      <>
        <div className="control-panel-container">
          <div className="control-panel">
            <Selector
              style={{ flex: 1, marginRight: '10px' }}
              domainValues={getLabelValueFromEnum(AppEntity).map(f => f.label)}
              selectedValue={entity || 'Select An Entity'}
              placeholder="Select An Entity"
              onValueChanged={selectedEntity => {
                console.log(`selectedEntity: ${selectedEntity}`)
                setEntity(selectedEntity)
              }}
            />
          </div>
          {entity ? (
            <ResourceManagementProvider entity={entity} />
          ) : (
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
          )}
        </div>
      </>
    </Layout>
  )
}
