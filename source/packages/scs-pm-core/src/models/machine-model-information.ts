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
  isActive: boolean
  machineId: string
  model: string
  manufactureYear: string
  manufacturerName: string
  purchaseDate: string
  inductionDate: string
  departmentName: string
  description: string
  operatingManualLink: string
}

export interface MachineModelInfoResponse {
  machines: MachineModelInformation[]
}

export interface AddMachineResponse {
  response: string
  machine: MachineModelInformation
}
