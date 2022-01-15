export interface MachineTelemetry {
  timestamp: string
  speed_desired: number
  ambient_temperature: number
  ambient_pressure: number
  speed: number
  temperature: number
  pressure: number
  machineID: string
}

export interface MachineVitalsResponse {
  machineVitals: MachineTelemetry[]
}
