import { config } from './config'
import { createDirectory, createFile, readFile } from './utils'

export function initialize() {
  createDirectory(config.app.homeDir, config.app.appDirectory)
  createDirectory(config.getAppsDirectory(), config.app.logsDirectory)
  createDirectory(config.getAppsDirectory(), config.app.machinesDirectory)
  createFile(
    config.getMachinesDirectory(),
    config.app.machinesFileName,
    JSON.stringify(readFile(config.rawData.path, config.rawData.machineDummyData), null, 2),
  )
}
