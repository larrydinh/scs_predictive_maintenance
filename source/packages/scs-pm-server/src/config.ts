import * as os from 'os'
import * as path from 'path'

export const config = {
  server: {
    port: 8081,
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV?.toLowerCase(),
  },
  app: {
    homeDir: os.homedir(),
    appDirectory: 'scs_pm',
    logsDirectory: 'logs',
    logsFileName: 'scs-pm-server-logs.txt',
    machinesDirectory: 'machines',
    machinesFileName: 'scs-pm-machines.json',
    machineVitals: 'telemetry.csv',
    machineLogs: 'logs.csv',
    machineModelTrainedInformation: 'trained-data.csv',
    machineModel: 'pm_pro3.pkl',
    telemetryHeaders: [
      'index',
      'timestamp',
      'speed_desired',
      'ambient_temperature',
      'ambient_pressure',
      'speed',
      'temperature',
      'pressure',
      'machineID',
    ],
    logHeaders: ['index', 'timestamp', 'machineID', 'level', 'code'],
    machineModelTrainedInfoHeaders: [
      'index',
      'machineID',
      'cycle',
      'speed_desired_max',
      'speed_avg',
      'temperature_avg',
      'temperature_max',
      'pressure_avg',
      'pressure_max',
      'cycle_start',
      'cycle_end',
      'temperature_avg_avg',
      'temperature_max_avg',
      'pressure_avg_avg',
      'pressure_max_avg',
    ],
  },
  rawData: {
    path: `${__dirname}/raw-data/`,
    machineDummyData: 'dummy-machine.json',
    machineDummyLogs: 'logs.csv',
    machineDummyVitals: 'telemetry.csv',
    machineModelTrainedDummyInformation: 'trained-data.csv',
    machineModelDummy: 'pm_pro3.pkl',
  },
  getAppsDirectory(): string {
    return path.join(config.app.homeDir, config.app.appDirectory)
  },
  getLogsDirectory(): string {
    return path.join(
      path.join(config.app.homeDir, config.app.appDirectory),
      config.app.logsDirectory,
    )
  },
  getMachinesDirectory(): string {
    return path.join(
      path.join(config.app.homeDir, config.app.appDirectory),
      config.app.machinesDirectory,
    )
  },
}
