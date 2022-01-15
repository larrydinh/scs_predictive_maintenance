export interface MachineLog {
  timestamp: string
  level: string
  code: string
  machineID: string
}

export interface MachineLogsResponse {
  machineLogs: MachineLog[]
}
