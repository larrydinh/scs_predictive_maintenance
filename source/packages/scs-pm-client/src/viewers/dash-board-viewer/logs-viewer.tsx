import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { client } from '../../apollo-client'
import { Alert } from '../../components'
import { capitalizeFirstCharacter, MachineLog, MachineLogsResponse } from '../../models'
import { getMachineLogsByMachineId } from '../../queries'

interface Props {
  machineId: string
}

export const LogsViewer: React.FC<Props> = ({ machineId }: Props) => {
  const [data, setData] = useState<MachineLog[]>()

  useEffect(() => {
    const queryCall = async () => {
      const result = await client.query({ query: getMachineLogsByMachineId(machineId) })
      const r = result.data.queryResult as MachineLogsResponse
      setData(r.machineLogs)
    }
    queryCall()
  }, [machineId])

  const getColumns = () => {
    if (data && data.length !== 0) {
      const columnHeaders = Object.keys(data[data.length - 1])
      return columnHeaders.map(header => {
        return {
          title: capitalizeFirstCharacter(header),
          dataIndex: header,
          key: header,
          width: 'auto',
        }
      })
    } else {
      return []
    }
  }

  return (
    <>
      {data && data.length !== 0 ? (
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
      ) : (
        <Alert message="No Logs is Found" />
      )}
    </>
  )
}
