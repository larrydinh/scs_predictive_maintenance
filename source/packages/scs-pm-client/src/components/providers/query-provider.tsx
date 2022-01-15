import { DocumentNode } from 'graphql'
import * as React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { client } from '../../apollo-client'
import { FaCC } from '../../models/component'
import { Alert } from '../loading-icon/alert'
import { LoadingIcon } from '../loading-icon/loading-icon'

interface Props {
  query: DocumentNode
  variables?: any
}

export const QueryProvider: FaCC<Props, any> = props => {
  return (
    <Query query={props.query} variables={props.variables} fetchPolicy="no-cache" errorPolicy="all" client={client}>
      {({ loading, error, data, refetch }: QueryResult<any>) => {
        if (loading) {
          return <LoadingIcon />
        } else if (error) {
          return <Alert message={error} />
        } else {
          return props.children({ data, refetch })
        }
      }}
    </Query>
  )
}
