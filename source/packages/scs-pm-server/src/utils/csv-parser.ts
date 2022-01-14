import { parse } from 'csv-parse'
import * as fs from 'fs'
import { log } from '../logger'

export function getCSVData(csvFilePath: string, headers: string[]) {
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' })

  parse(
    fileContent,
    {
      delimiter: ',',
      columns: headers,
    },
    (error, result: any[]) => {
      if (error) {
        log.error(`Unable to read the file present at ${csvFilePath} due to ${error.message}`)
      }

      console.log('Result', JSON.stringify(result, null, 2))
    },
  )
}
