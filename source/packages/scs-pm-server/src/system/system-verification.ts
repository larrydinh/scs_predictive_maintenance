import * as path from 'path'
import { config } from '../config'
import { DirectoryType, getLabelValueFromEnum, VersionInfo } from '../models'
import { getDirectoryPath, log, validateDirectoryExistence } from '../utils'
import { getVersionInformation } from './system-version-info'

interface VerificationResult {
  status: boolean
  message: string
  version: VersionInfo
}

export function verifySystem(): VerificationResult {
  log.info(`Verifying system files and directories`)
  const directories = getLabelValueFromEnum(DirectoryType)
  const result: VerificationResult = {
    status: false,
    message: 'Verification Failed',
    version: getVersionInformation(),
  }
  directories.forEach(directory => {
    switch (directory.label) {
      case DirectoryType.LOGS: {
        const directoryPath = getDirectoryPath(
          path.join(config.app.homeDir, config.app.appDirectory),
          config.app.logsDirectory,
        )
        const validationResult = validateDirectoryExistence(directoryPath)
        result.status = result.status || validationResult
        result.message = validationResult
          ? 'Logs directory is present'
          : 'Logs directory is not present'
        break
      }
      case DirectoryType.MACHINES: {
        const directoryPath = getDirectoryPath(
          path.join(config.app.homeDir, config.app.appDirectory),
          config.app.machinesDirectory,
        )
        const validationResult = validateDirectoryExistence(directoryPath)
        result.status = result.status || validationResult
        result.message = validationResult
          ? result.message?.concat(', Machines directory is present')
          : result.message?.concat(', Machines directory is not present')
        break
      }
      default: {
        log.error(`Unknown directory type`)
        result.status = false
        result.message = result.message?.concat(', Unknown directory type found')
        break
      }
    }
  })
  log.info(`System verification is complete with result: ${JSON.stringify(result, null, 2)}`)
  return result
}
