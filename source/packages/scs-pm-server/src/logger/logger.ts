import * as path from 'path'
import { pino } from 'pino'
import { config } from '../config'

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
            destination: path.join(config.getLogsDirectory(), config.app.logsFileName),
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
