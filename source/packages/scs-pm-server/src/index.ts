import * as http from 'http'
import { app } from './app'
import { config } from './config'
import { log } from './utils'

const server = http.createServer(app)
server.listen(config.server.port, () => {
  log.info(`Starting server at port: ${config.server.port}`)
})
