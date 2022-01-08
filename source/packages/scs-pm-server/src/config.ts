import * as os from 'os'

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
    machinesDirectory: 'machines',
    logsFileName: 'scs-pm-server-logs.txt',
  },
}
