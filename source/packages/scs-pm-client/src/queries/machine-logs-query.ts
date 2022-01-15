import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
export function getMachineLogsByMachineId(machineId: string): DocumentNode {
  const query = gql(`
    query machineLogs {
      queryResult @rest(type: "MachineLogsResponse", path: "machineLogs?machineId=${machineId}") {
        machineLogs
      }
    }
  `)
  return query
}
