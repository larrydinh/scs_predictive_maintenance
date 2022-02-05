import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
export function getMachinePredictionByMachineId(machineId: string, cycle: number): DocumentNode {
  const query = gql(`
    query machinePrediction {
      queryResult @rest(type: "MachinePredictionResponse", path: "machinePrediction?machineId=${machineId}&cycle=${cycle}") {
        machineId
        cycle
        prediction
        predictionResult
      }
    }
  `)
  return query
}
