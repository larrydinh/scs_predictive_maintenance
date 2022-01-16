import { PlusOutlined } from '@ant-design/icons'
import { Card, Space, Typography } from 'antd'
import Table, { ColumnProps } from 'antd/lib/table'
import React from 'react'
import { ExportFile, Hyperlink, IconButton } from '../../components'
import { AppEntity, capitalizeFirstCharacter, convertIsoStringToDate, MachineModelInformation } from '../../models'
import { getMachineExportInfo } from '../../utils'
import { MachineInfoDialog } from './machine-info-dialog'

interface Props {
  appEntityName: string
  dataSource: MachineModelInformation[]
}

export const ResourceManagementViewer: React.FC<Props> = ({ appEntityName, dataSource }: Props) => {
  const machineInfoDlg = React.createRef<MachineInfoDialog>()

  const onHandleOpenMachineInfoDialog = () => {
    if (machineInfoDlg.current) {
      machineInfoDlg.current?.toggleOpen()
    }
  }
  const getColumns = (): ColumnProps<any>[] => {
    switch (appEntityName) {
      case AppEntity.MACHINES:
      default:
        const columnKeys = [
          'name',
          'givenName',
          'machineId',
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
      extra={
        <Space size="small">
          <IconButton
            style={{ marginTop: 5 }}
            icon={<PlusOutlined />}
            toolTip={`Add new machine`}
            onClick={onHandleOpenMachineInfoDialog}
          />
          <ExportFile
            infoToExport={getMachineExportInfo(dataSource).join(`\n\n\n`)}
            fileName="Machines.txt"
            toolTip="Export Machine Information"
          />
        </Space>
      }
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
      <MachineInfoDialog
        ref={machineInfoDlg}
        machineModelInfo={{} as MachineModelInformation}
        onOk={data => {
          console.log(`helloWorld ${JSON.stringify(data, null, 2)}`)
        }}
      />
    </Card>
  )
}
