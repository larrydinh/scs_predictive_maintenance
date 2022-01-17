import camelcase from 'camelcase'
import { getUniqueIdentifier } from './get-unique-identifier'

export enum SchemeNames {
  Machine = 'Machine',
}

export function generateUniqueSchemeIdentifier(schemeName: SchemeNames, name?: string): string {
  const uniqueIdentifier = name
    ? `${camelcase(name)}_${schemeName}_${getUniqueIdentifier()}`
    : `${schemeName}_${getUniqueIdentifier()}`

  return uniqueIdentifier
}
