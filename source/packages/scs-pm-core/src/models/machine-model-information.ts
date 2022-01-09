import { Resource } from './resource'

export interface Person extends Resource {
  firstName: string
  lastName: string
  contactNumber: number
  email: string
}

export interface MachineModelInformation extends Resource {
  name: string
  givenName: string
  model: string
  manufactureYear: string
  manufacturerName: string
  manufacturerContactPerson: Person
  purchaseDate: string
  inductionDate: string
  departmentName: string
  description: string
  operatingManualLink: string
}
