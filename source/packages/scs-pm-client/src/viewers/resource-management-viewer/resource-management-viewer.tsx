import { Card, Space, Typography } from 'antd'
import Table, { ColumnProps } from 'antd/lib/table'
import React from 'react'
import { Hyperlink } from '../../components'
import { AppEntity, capitalizeFirstCharacter, convertIsoStringToDate, MachineModelInformation } from '../../models'

interface Props {
  appEntityName: string
  dataSource: MachineModelInformation[]
}

export const ResourceManagementViewer: React.FC<Props> = ({ appEntityName, dataSource }: Props) => {
  const getColumns = (): ColumnProps<any>[] => {
    switch (appEntityName) {
      case AppEntity.MACHINES:
      default:
        const columnKeys = [
          'name',
          'givenName',
          'model',
          'manufactureYear',
          'manufacturerName',
          'purchaseDate',
          'inductionDate',
          'departmentName',
          'description',
          'operatingManualLink',
        ]
        const tableColumns: ColumnProps<any>[] = columnKeys.map(key => {
          return {
            title: capitalizeFirstCharacter(key),
            dataIndex: key,
            key: key,
            width: 'auto',
            render: (text: any) => {
              if (key === 'name') {
                return <a>{text}</a>
              } else if (key === 'operatingManualLink') {
                return <Hyperlink title="Manual" url={text} />
              } else if (key === 'purchaseDate' || key === 'inductionDate') {
                return convertIsoStringToDate(text)
              } else {
                return text
              }
            },
          }
        })
        return tableColumns
    }
  }

  return (
    <Card
      title={
        <div className="control-panel-container">
          <div className="control-panel">
            <Space align="center">
              <Typography.Title level={5}>{appEntityName}</Typography.Title>
            </Space>
          </div>
        </div>
      }
      bordered={true}
      style={{ margin: 9.5, overflowX: 'auto' }}
    >
      <Table
        key={dataSource.length}
        size={'small'}
        dataSource={dataSource}
        columns={getColumns()}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        footer={() => `Total Items (${appEntityName}): ${dataSource.length}`}
      />
    </Card>
  )
}
