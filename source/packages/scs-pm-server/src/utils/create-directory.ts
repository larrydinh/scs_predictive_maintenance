import * as fs from 'fs'
import { getDirectoryPath } from './get-directory-path'
import { log } from './logger'
import { validateDirectoryExistence } from './validate-directory-path'

export function createDirectory(destinationFolder: string, directoryName: string): void {
  const directoryPath = getDirectoryPath(destinationFolder, directoryName)
  if (!validateDirectoryExistence(directoryPath)) {
    log.info(`Directory ${directoryName} will be created at location: ${directoryPath}`)
    fs.mkdirSync(directoryPath)
  } else {
    log.info(`Directory ${directoryName} is already present at location: ${directoryPath}`)
  }
}
