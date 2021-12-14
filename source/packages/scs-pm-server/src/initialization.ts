import * as path from 'path'
import { config } from './config'
import { createDirectory } from './utils'

export function initialize() {
  createDirectory(config.app.homeDir, config.app.appDirectory)
  createDirectory(path.join(config.app.homeDir, config.app.appDirectory), config.app.logsDirectory)
}
