import { MachineLogLevel } from './enums'

export interface MachineLog {
  timestamp: string
  level: MachineLogLevel
  code: string
  machineID: string
  message?: string
}

export interface MachineLogsResponse {
  machineLogs: MachineLog[]
}
