export interface Person {
  firstName: string
  lastName: string
  contactNumber: number
  email: string
}

export interface MachineModelInformation {
  identifier: string
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
