import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
export function getMachinePredictionByMachineId(machineId: string): DocumentNode {
  const query = gql(`
    query machinePrediction {
      queryResult @rest(type: "MachinePredictionResponse", path: "machinePrediction?machineId=${machineId}") {
        machinePrediction
      }
    }
  `)
  return query
}
