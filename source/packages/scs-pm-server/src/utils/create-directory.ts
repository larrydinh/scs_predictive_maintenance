import * as fs from 'fs'
import { getDirectoryPath } from './get-directory-path'
import { log } from './logger'

export function createDirectory(destinationFolder: string, directoryName: string): void {
  const directoryPath = getDirectoryPath(destinationFolder, directoryName)
  if (!fs.existsSync(directoryPath)) {
    log.info(`Directory ${directoryName} will be created at location: ${directoryPath}`)
    fs.mkdirSync(directoryPath)
  } else {
    log.info(`Directory ${directoryName} is already present at location: ${directoryPath}`)
  }
}
