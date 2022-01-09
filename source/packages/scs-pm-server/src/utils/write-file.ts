import * as fs from 'fs'
import * as path from 'path'
import { log } from '../logger'
import { validateFileExistence } from './validate-file'

export function writeFile(destinationFolder: string, fileName: string, data: string): boolean {
  const filePath = path.join(destinationFolder, fileName)
  let result = true
  if (validateFileExistence(filePath)) {
    fs.writeFileSync(filePath, data)
  } else {
    log.info(`File: ${fileName} can not be written`)
    result = false
  }

  return result
}
