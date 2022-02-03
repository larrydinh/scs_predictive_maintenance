import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
export function getMachineModelTrainedInfoByMachineId(machineId: string): DocumentNode {
  const query = gql(`
    query machineModelTrainedInformation {
      queryResult @rest(type: "MachineModelTrainedInformationResponse", path: "machineModelTrainedInformation?machineId=${machineId}") {
        machineModelTrainedInformation
      }
    }
  `)
  return query
}
