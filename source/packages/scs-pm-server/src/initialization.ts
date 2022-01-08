import * as path from 'path'
import { config } from './config'
import { createDirectory, createFile, getDirectoryPath, readFile } from './utils'

export function initialize() {
  createDirectory(config.app.homeDir, config.app.appDirectory)
  createDirectory(path.join(config.app.homeDir, config.app.appDirectory), config.app.logsDirectory)
  createDirectory(
    path.join(config.app.homeDir, config.app.appDirectory),
    config.app.machinesDirectory,
  )
  createFile(
    path.join(
      getDirectoryPath(
        path.join(config.app.homeDir, config.app.appDirectory),
        config.app.machinesDirectory,
      ),
    ),
    config.app.machinesFileName,
    JSON.stringify(readFile(config.rawData.path, config.rawData.machineDummyData), null, 2),
  )
}
