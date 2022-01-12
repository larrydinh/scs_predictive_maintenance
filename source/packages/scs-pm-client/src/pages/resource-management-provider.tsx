import React from 'react'
import { QueryProvider } from '../components'
import { AppEntity, MachineModelInfoResponse, MachineModelInformation } from '../models'
import { getAllMachineModelInformationQuery } from '../queries'
import { ResourceManagementViewer } from '../viewers'

interface Props {
  entity: string
}

export const ResourceManagementProvider: React.FC<Props> = ({ entity }: Props) => {
  const selectQueryForEntity = () => {
    switch (entity) {
      case AppEntity.MACHINES:
      default:
        return getAllMachineModelInformationQuery
    }
  }
  return (
    <QueryProvider query={selectQueryForEntity()}>
      {({ data }) => {
        const machineModelInfo: MachineModelInformation[] = (data.queryResult as MachineModelInfoResponse).machines
        return <ResourceManagementViewer appEntityName={entity} dataSource={machineModelInfo} />
      }}
    </QueryProvider>
  )
}
