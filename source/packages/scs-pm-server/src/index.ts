import * as http from 'http'
import { app } from './app'
import { config } from './config'
import { initialize } from './initialization'
import { log } from './utils'

const server = http.createServer(app)
server.listen(config.server.port, () => {
  initialize()
  log.info(`Starting server at port: ${config.server.port}`)
})
