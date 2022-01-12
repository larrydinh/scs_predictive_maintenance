import React from 'react'
import { convertIsoStringToDate, MachineModelInformation } from '../../models'
import { DescriptionComponent } from './description-component'
import { ExportInfoComponent } from './export-info-component'

interface Props {
  machineModelInfo: MachineModelInformation
}

export const DashboardViewer: React.FC<Props> = ({ machineModelInfo }: Props) => {
  const {
    name,
    givenName,
    model,
    manufactureYear,
    manufacturerName,
    purchaseDate,
    inductionDate,
    departmentName,
    description,
    operatingManualLink,
  } = machineModelInfo

  const exportConfig = `Machine with name ${name}, model: ${model}(year: ${manufactureYear}) is purchased from ${manufacturerName} on ${convertIsoStringToDate(
    purchaseDate,
  )}.\nThe machine is commissioned on ${convertIsoStringToDate(inductionDate)}, in ${departmentName} department.
  \nThe machine with in the organization is known as ${givenName}.\nThe machine is best described as ${description} and it's handbook can be found at ${operatingManualLink}`

  return (
    <div className="control-panel-container">
      <div className="control-panel">
        <div style={{ flex: 1, marginRight: 10, flexGrow: 4 }}>
          <DescriptionComponent
            value={machineModelInfo}
            extra={
              <ExportInfoComponent
                infoToExport={exportConfig}
                fileName={`${givenName}.txt`}
                toolTip="Export Machine Information"
              />
            }
          />
        </div>
      </div>
    </div>
  )
}
