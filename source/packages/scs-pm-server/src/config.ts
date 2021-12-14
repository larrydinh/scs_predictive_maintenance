import * as os from 'os'

export const config = {
  server: {
    port: 8080,
    version: process.env.npm_package_version,
  },
  app: {
    homeDir: os.homedir(),
    appDirectory: 'SCS_PM',
    logsDirectory: 'logs',
    logsFileName: 'scs-pm-server-logs.txt',
  },
}
