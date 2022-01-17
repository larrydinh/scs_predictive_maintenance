import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

export function constructAddMachineQuery(): DocumentNode {
  const query = gql(`
  mutation AddNewMachine {
    queryResult(input: $input) @rest(type: AddMachineResponse, path:"addMachine" method: "POST") {
      response
      machine
    }
  }
`)
  return query
}
