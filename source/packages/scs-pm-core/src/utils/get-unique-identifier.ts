import { v4 as uuidv4 } from 'uuid'

export function getUniqueIdentifier(): string {
  const uniqueId = uuidv4()
  return uniqueId
}
