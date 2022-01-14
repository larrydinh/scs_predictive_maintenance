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
  },
  rawData: {
    path: `${__dirname}/raw-data/`,
    machineDummyData: 'dummy-machine.json',
    machineDummyLogs: 'logs.csv',
    machineDummyVitals: 'telemetry.csv',
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
