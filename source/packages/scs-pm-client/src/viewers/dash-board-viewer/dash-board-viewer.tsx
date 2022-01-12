import React from 'react'
import { MachineModelInformation } from '../../models'
import { DescriptionComponent } from './description-component'

interface Props {
  machineModelInfo: MachineModelInformation
}

export const DashboardViewer: React.FC<Props> = ({ machineModelInfo }: Props) => {
  return (
    <div className="control-panel-container">
      <div className="control-panel">
        <div style={{ flex: 1, marginRight: 10, flexGrow: 4 }}>
          <DescriptionComponent value={machineModelInfo} />
        </div>
      </div>
    </div>
  )
}
