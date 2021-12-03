import { pino } from 'pino'

const dest = pino.destination()

export const log = pino(
  {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: true,
        colorize: true,
      },
    },
  },
  dest,
)

export function flushSyncPinoLoggerDestination() {
  dest.flushSync()
}
