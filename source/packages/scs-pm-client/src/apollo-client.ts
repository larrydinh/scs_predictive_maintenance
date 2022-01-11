import { HttpLink } from '@apollo/client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import { fetch, Headers } from 'cross-fetch'
import * as dotenv from 'dotenv'
dotenv.config()
global.Headers = Headers

export const apiUrl = process.env.REACT_APP_SERVER_NAME || 'http://localhost:8080/api/'
export type ApolloClientType = 'graphqlClient' | 'restClient'

function getApolloClient(link: RestLink | HttpLink) {
  return new ApolloClient({
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link: link as any,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  })
}

export const client = getApolloClient(
  new RestLink({
    uri: apiUrl,
    customFetch: fetch,
  }),
)
