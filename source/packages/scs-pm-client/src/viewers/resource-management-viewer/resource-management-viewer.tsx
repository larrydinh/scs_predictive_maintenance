import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Card, Space, Typography } from 'antd'
import Table, { ColumnProps } from 'antd/lib/table'
import React, { useState } from 'react'
import { client } from '../../apollo-client'
import { ExportFile, Hyperlink, IconButton, notifyUser } from '../../components'
import {
  AddMachineResponse,
  AppEntity,
  capitalizeFirstCharacter,
  convertIsoStringToDate,
  generateUniqueSchemeIdentifier,
  getErrorMessage,
  MachineModelInformation,
  SchemeNames,
} from '../../models'
import { constructAddMachineQuery } from '../../queries'
import { getMachineExportInfo } from '../../utils'
import { MachineInfoDialog } from './machine-info-dialog'

interface Props {
  appEntityName: string
  dataSource: MachineModelInformation[]
}

export const ResourceManagementViewer: React.FC<Props> = ({ appEntityName, dataSource }: Props) => {
  const [machines, setMachines] = useState<MachineModelInformation[]>(dataSource)
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
          'isActive',
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
              } else if (key === 'isActive') {
                return text && text === true ? (
                  <CheckCircleOutlined style={{ color: 'green', fontSize: 24 }} title="Active" />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red', fontSize: 24 }} title="In-Active" />
                )
              } else {
                return text
              }
            },
          }
        })
        return tableColumns
    }
  }

  const onHandleAdd = async (newMachine: MachineModelInformation): Promise<void> => {
    try {
      const newIdentifier = generateUniqueSchemeIdentifier(SchemeNames.Machine, newMachine.givenName)
      newMachine.identifier = newIdentifier
      const response = await client.mutate({
        mutation: constructAddMachineQuery(),
        variables: {
          input: {
            machine: newMachine,
          },
        },
      })
      const queryResponse = response.data.queryResult as AddMachineResponse
      if (queryResponse.response === 'OK' && queryResponse.machine.identifier === newIdentifier) {
        const updatedMachineSet = machines.map(x => x)
        updatedMachineSet.push(newMachine)
        setMachines(updatedMachineSet)
        notifyUser(`New machine ${queryResponse.machine.givenName} is successfully added to the system`, 'Success')
      }
    } catch (err) {
      notifyUser(`Failed to add new machine, due to ${getErrorMessage(err)}`, 'Error')
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
            infoToExport={getMachineExportInfo(machines).join(`\n\n\n`)}
            fileName="Machines.txt"
            toolTip="Export Machine Information"
          />
        </Space>
      }
      style={{ margin: 9.5, overflowX: 'auto' }}
    >
      <Table
        key={machines.length}
        size={'small'}
        dataSource={machines}
        columns={getColumns()}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        footer={() => `Total Items (${appEntityName}): ${machines.length}`}
      />
      <MachineInfoDialog
        ref={machineInfoDlg}
        machineModelInfo={{ isActive: true } as MachineModelInformation}
        onOk={onHandleAdd}
      />
    </Card>
  )
}
