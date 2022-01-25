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

export interface MachineModelTrainedInformation {
  machineID: string
  cycle: number
  timestamp: string
  speed_desired_max: number
  speed_avg: number
  temperature_avg: number
  temperature_max: number
  pressure_avg: number
  pressure_max: number
  temperature_avg_avg: number
  temperature_max_avg: number
  pressure_avg_avg: number
  pressure_max_avg: number
}

export interface MachineModelTrainedInformationResponse {
  machineModelTrainedInformation: MachineModelTrainedInformation[]
}

export interface MachineVitalsResponse {
  machineVitals: MachineTelemetry[]
}
