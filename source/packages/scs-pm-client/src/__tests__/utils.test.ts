import { convertIsoStringToDate, MachineModelInformation } from '../models'
import { getMachineExportInfo } from '../utils'
import { machineModelInfoTestData } from './setup/setup'

describe('Utils', () => {
  test(`Get Machine Export Info For 2 Machines`, () => {
    const expectedExportInfos = machineModelInfoTestData.map((machineInfo: MachineModelInformation, index: number) => {
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
      } = machineInfo

      const exportConfig = `${
        index + 1
      }. Machine with name ${name}, model: ${model}(year: ${manufactureYear}) is purchased from ${manufacturerName} on ${convertIsoStringToDate(
        purchaseDate,
      )}.\nThe machine is commissioned on ${convertIsoStringToDate(
        inductionDate,
      )}, in ${departmentName} department.\nThe machine with in the organization is known as ${givenName}.\nThe machine is best described as ${description} and it's handbook can be found at ${operatingManualLink}`
      return exportConfig
    })

    const exportInfoResult = getMachineExportInfo(machineModelInfoTestData)

    expect(exportInfoResult).toBeDefined()
    expect(exportInfoResult.length).toEqual(expectedExportInfos.length)
    expect(exportInfoResult.length).toBe(2)
    expect(exportInfoResult[0]).toEqual(expectedExportInfos[0])
    expect(exportInfoResult[1]).toEqual(expectedExportInfos[1])
  })

  test(`Get Machine Export Info For 1 Machine`, () => {
    const expectedExportInfos = machineModelInfoTestData.map((machineInfo: MachineModelInformation, index: number) => {
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
      } = machineInfo

      const exportConfig = `${
        index + 1
      }. Machine with name ${name}, model: ${model}(year: ${manufactureYear}) is purchased from ${manufacturerName} on ${convertIsoStringToDate(
        purchaseDate,
      )}.\nThe machine is commissioned on ${convertIsoStringToDate(
        inductionDate,
      )}, in ${departmentName} department.\nThe machine with in the organization is known as ${givenName}.\nThe machine is best described as ${description} and it's handbook can be found at ${operatingManualLink}`
      return exportConfig
    })

    const exportInfoResult = getMachineExportInfo([machineModelInfoTestData[0]])

    expect(exportInfoResult).toBeDefined()
    expect(exportInfoResult.length).toEqual(1)
    expect(exportInfoResult[0]).toEqual(expectedExportInfos[0])
  })
})
