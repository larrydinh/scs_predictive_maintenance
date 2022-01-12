import gql from 'graphql-tag'

export const getAllMachineModelInformationQuery = gql`
  query machines {
    queryResult @rest(type: "MachineModelInfoResponse", path: "machines") {
      machines
    }
  }
`
