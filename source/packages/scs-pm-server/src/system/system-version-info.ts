import { config } from '../config'
import { VersionInfo } from '../models'

export function getVersionInformation(): VersionInfo {
  const versionInfo: VersionInfo = {
    version: config.server.version,
    targetEnvironment: config.server.environment,
  }
  return versionInfo
}
