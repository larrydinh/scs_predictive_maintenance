import { convertIsoStringToDate, MachineModelInformation } from '../models'

export function getMachineExportInfo(machineModelInfos: MachineModelInformation[]): string[] {
  return machineModelInfos.map((machineModelInfo: MachineModelInformation, index: number) => {
    const {
      name,
      givenName,
      model,
      manufactureYear,
      manufacturerName,
      purchaseDate,
      inductionDate,
      departmentName,
      description,
      operatingManualLink,
    } = machineModelInfo

    const exportConfig = `${
      index + 1
    }. Machine with name ${name}, model: ${model}(year: ${manufactureYear}) is purchased from ${manufacturerName} on ${convertIsoStringToDate(
      purchaseDate,
    )}.\nThe machine is commissioned on ${convertIsoStringToDate(
      inductionDate,
    )}, in ${departmentName} department.\nThe machine with in the organization is known as ${givenName}.\nThe machine is best described as ${description} and it's handbook can be found at ${operatingManualLink}`

    return exportConfig
  })
}
