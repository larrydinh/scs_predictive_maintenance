import { Table } from 'antd'
import React from 'react'
import { capitalizeFirstCharacter, MachineLog } from '../../models'

interface Props {
  data: MachineLog[]
}

export const LogsViewer: React.FC<Props> = ({ data }: Props) => {
  const getColumns = () => {
    const columnHeaders = Object.keys(data[data.length - 1])
    return columnHeaders.map(header => {
      return {
        title: capitalizeFirstCharacter(header),
        dataIndex: header,
        key: header,
        width: 'auto',
      }
    })
  }

  return (
    <Table
      key={data.length}
      size={'small'}
      dataSource={data}
      columns={getColumns()}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30'],
      }}
      footer={() => `Total Logs(#): ${data.length}`}
    />
  )
}
