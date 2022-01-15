import { parse } from 'csv-parse'
import * as fs from 'fs'
import { log } from '../logger'
import { getErrorMessage } from '../models'

export function getCSVData<T>(csvFilePath: string, headers: string[], callback: (f: T[]) => void) {
  const csvData: T[] = []

  try {
    fs.createReadStream(csvFilePath)
      .on('error', err => {
        log.error(`Unable to read the file at ${csvFilePath} due to error: ${getErrorMessage(err)}`)
        callback(csvData)
      })
      .pipe(parse({ delimiter: ',', columns: headers }))
      .on('data', (csvRow: T) => {
        csvData.push(csvRow)
      })
      .on('end', () => {
        callback(csvData)
      })
  } catch (error: unknown) {
    log.error(`Unable to read the file at ${csvFilePath} due to error: ${getErrorMessage(error)}`)
  }
}
