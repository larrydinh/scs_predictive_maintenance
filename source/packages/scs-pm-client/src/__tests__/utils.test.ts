import { convertIsoStringToDate, MachineModelInformation } from '../models'
import { getFileName, getMachineExportInfo } from '../utils'
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

  test(`Get FileName with txt extension & info prefix`, () => {
    const fileName = 'Machine A1'
    const date = new Date().toLocaleDateString()
    const prefix = 'info'

    const resultFileName = getFileName(fileName, 'txt', prefix)

    expect(resultFileName).toBeDefined()
    expect(resultFileName).toEqual(`${prefix}_${fileName}_${date}.txt`)
  })

  test(`Get FileName with txt extension & no prefix`, () => {
    const fileName = 'Machine A1'
    const date = new Date().toLocaleDateString()

    const resultFileName = getFileName(fileName, 'txt')

    expect(resultFileName).toBeDefined()
    expect(resultFileName).toEqual(`${fileName}_${date}.txt`)
  })

  test(`Get FileName with csv extension & vitals prefix`, () => {
    const fileName = 'Machine A1'
    const date = new Date().toLocaleDateString()
    const prefix = 'vitals'

    const resultFileName = getFileName(fileName, 'csv', prefix)

    expect(resultFileName).toBeDefined()
    expect(resultFileName).toEqual(`${prefix}_${fileName}_${date}.csv`)
  })

  test(`Get FileName with csv extension & logs prefix`, () => {
    const fileName = 'Machine A1'
    const date = new Date().toLocaleDateString()
    const prefix = 'logs'

    const resultFileName = getFileName(fileName, 'csv', prefix)

    expect(resultFileName).toBeDefined()
    expect(resultFileName).toEqual(`${prefix}_${fileName}_${date}.csv`)
  })

  test(`Get FileName with csv extension & no prefix`, () => {
    const fileName = 'Machine A1'
    const date = new Date().toLocaleDateString()

    const resultFileName = getFileName(fileName, 'csv')

    expect(resultFileName).toBeDefined()
    expect(resultFileName).toEqual(`${fileName}_${date}.csv`)
  })
})
