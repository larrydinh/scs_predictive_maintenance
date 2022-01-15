import { parse } from 'csv-parse'
import * as fs from 'fs'
import { log } from '../logger'
import { getErrorMessage, MachineTelemetry } from '../models'

export function getCSVData(
  csvFilePath: string,
  headers: string[],
  callback: (f: MachineTelemetry[]) => void,
) {
  const csvData: MachineTelemetry[] = []

  try {
    fs.createReadStream(csvFilePath)
      .on('error', err => {
        log.error(`Unable to read the file at ${csvFilePath} due to error: ${getErrorMessage(err)}`)
        callback(csvData)
      })
      .pipe(parse({ delimiter: ',', columns: headers }))
      .on('data', (csvRow: MachineTelemetry) => {
        csvData.push(csvRow)
      })
      .on('end', () => {
        callback(csvData)
      })
  } catch (error: unknown) {
    log.error(`Unable to read the file at ${csvFilePath} due to error: ${getErrorMessage(error)}`)
  }
}
