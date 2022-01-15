import { ExceptionOutlined, ProjectOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'
import { CSVLink } from 'react-csv'
import { ExportFile, IconButton } from '../../components'
import { MachineLog, MachineModelInformation, MachineTelemetry } from '../../models'
import { getFileName, getMachineExportInfo } from '../../utils'

interface Props {
  machineModelInfo: MachineModelInformation
  vitals?: MachineTelemetry[]
  logs?: MachineLog[]
}

export const ExportMachineInfoComponent: React.FC<Props> = ({ machineModelInfo, vitals, logs }: Props) => {
  const { givenName } = machineModelInfo

  return (
    <Space size="small">
      <ExportFile
        infoToExport={getMachineExportInfo([machineModelInfo]).join(`\n\n\n`)}
        fileName={getFileName(givenName, 'txt', 'info')}
        toolTip={`Export  ${givenName} Information`}
      />
      {vitals && (
        <CSVLink data={vitals} filename={getFileName(givenName, 'csv', 'vitals')}>
          <IconButton
            icon={<ProjectOutlined />}
            toolTip={`Export ${givenName} Vitals`}
            onClick={e => e.stopPropagation()}
          />
        </CSVLink>
      )}

      {logs && (
        <CSVLink data={logs} filename={getFileName(givenName, 'csv', 'logs')}>
          <IconButton
            icon={<ExceptionOutlined />}
            toolTip={`Export ${givenName} Logs`}
            onClick={e => e.stopPropagation()}
          />
        </CSVLink>
      )}
    </Space>
  )
}
