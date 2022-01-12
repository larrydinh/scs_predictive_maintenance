import React from 'react'
import { ExportFile } from '../../components'
import { MachineModelInformation } from '../../models'
import { getMachineExportInfo } from '../../utils'
import { DescriptionComponent } from './description-component'

interface Props {
  machineModelInfo: MachineModelInformation
}

export const DashboardViewer: React.FC<Props> = ({ machineModelInfo }: Props) => {
  return (
    <div className="control-panel-container">
      <div className="control-panel">
        <div style={{ flex: 1, marginRight: 10, flexGrow: 4 }}>
          <DescriptionComponent
            value={machineModelInfo}
            extra={
              <ExportFile
                infoToExport={getMachineExportInfo([machineModelInfo]).join(`\n\n\n`)}
                fileName={`${machineModelInfo.givenName}.txt`}
                toolTip="Export Machine Information"
              />
            }
          />
        </div>
      </div>
    </div>
  )
}
