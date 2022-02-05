import { AlertOutlined, ExclamationCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { Table, Tag } from 'antd'
import React from 'react'
import { capitalizeFirstCharacter, MachineLog, MachineLogLevel } from '../../models'

interface Props {
  data: MachineLog[]
  filterTableColumns: string[]
}

const tagStyle: React.CSSProperties = {
  borderRadius: 25,
  border: '1px',
  padding: 8,
}

export const LogsViewer: React.FC<Props> = ({ data, filterTableColumns }: Props) => {
  const getMachineLevel = (text: string) => {
    switch (text.toLocaleLowerCase()) {
      case MachineLogLevel.CRITICAL.toLocaleLowerCase():
        return (
          <Tag
            style={tagStyle}
            icon={<AlertOutlined style={{ color: 'red', fontSize: 22 }} title={MachineLogLevel.CRITICAL} />}
          >
            {MachineLogLevel.CRITICAL}
          </Tag>
        )

      case MachineLogLevel.ERROR.toLocaleLowerCase():
        return (
          <Tag
            style={tagStyle}
            icon={<ExclamationCircleOutlined style={{ color: 'red', fontSize: 20 }} title={MachineLogLevel.ERROR} />}
          >
            {MachineLogLevel.ERROR}
          </Tag>
        )
      case MachineLogLevel.WARNING.toLocaleLowerCase():
        return (
          <Tag
            style={tagStyle}
            icon={<WarningOutlined style={{ color: 'orange', fontSize: 18 }} title={MachineLogLevel.WARNING} />}
          >
            {MachineLogLevel.WARNING}
          </Tag>
        )

      case MachineLogLevel.INFO.toLocaleLowerCase():
      default:
        return (
          <Tag
            style={tagStyle}
            icon={<InfoCircleOutlined style={{ color: 'blue', fontSize: 16 }} title={MachineLogLevel.INFO} />}
          >
            {MachineLogLevel.INFO}
          </Tag>
        )
    }
  }

  const getColumns = () => {
    const columnHeaders = Object.keys(data[data.length - 1]).filter(key => filterTableColumns.indexOf(key) === -1)
    return columnHeaders.map(header => {
      return {
        title: capitalizeFirstCharacter(header),
        dataIndex: header,
        key: header,
        width: 250,
        render: (text: any) => {
          if (header === 'Level'.toLocaleLowerCase()) {
            return getMachineLevel(text)
          } else {
            return text
          }
        },
      }
    })
  }

  return (
    <Table
      key={data.length}
      size={'small'}
      dataSource={data}
      style={{ maxHeight: 200, overflowY: 'auto' }}
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
