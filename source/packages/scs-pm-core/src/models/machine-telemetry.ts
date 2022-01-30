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
  speed_desired_max: number
  speed_avg: number
  temperature_avg: number
  temperature_max: number
  pressure_avg: number
  pressure_max: number
  cycle_start: string
  cycle_end: string
  temperature_avg_avg: number
  temperature_max_avg: number
  pressure_avg_avg: number
  pressure_max_avg: number
}

export interface MachinePrediction {
  machineID: string
}
export interface MachinePredictionResponse {
  machinePrediction: MachinePrediction
}

export interface MachineModelTrainedInformationResponse {
  machineModelTrainedInformation: MachineModelTrainedInformation[]
}

export interface MachineVitalsResponse {
  machineVitals: MachineTelemetry[]
}
