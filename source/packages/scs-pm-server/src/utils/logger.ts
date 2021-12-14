import path = require('path/posix')
import { pino } from 'pino'
import { config } from '../config'
import { getDirectoryPath } from './get-directory-path'

const dest = pino.destination()

export const log = pino(
  {
    transport: {
      targets: [
        {
          level: 'trace',
          target: 'pino-pretty',
          options: {
            translateTime: true,
            colorize: true,
          },
        },
        {
          level: 'trace',
          target: 'pino/file',
          options: {
            translateTime: true,
            colorize: true,
            destination: path.join(
              getDirectoryPath(
                path.join(config.app.homeDir, config.app.appDirectory),
                config.app.logsDirectory,
              ),
              config.app.logsFileName,
            ),
          },
        },
      ],
    },
  },
  dest,
)

export function flushSyncPinoLoggerDestination() {
  dest.flushSync()
}
