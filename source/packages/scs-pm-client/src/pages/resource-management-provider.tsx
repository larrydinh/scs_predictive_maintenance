import React from 'react'
import { QueryProvider } from '../components'
import { AppEntity, MachineModelInformation } from '../models'
import { getAllMachineModelInformationQuery } from '../queries'

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
        const machineModelInfo: MachineModelInformation[] = data.queryResult

        return <p>{JSON.stringify(machineModelInfo, null, 2)}</p>
      }}
    </QueryProvider>
  )
}
