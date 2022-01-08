import { Request, Response, Router } from 'express'
import * as path from 'path'
import { config } from './config'
import { getVersionInformation, verifySystem } from './system'
import { getDirectoryPath, log, readFile } from './utils'

export const api = Router()

function verifyServerSetup(_req: Request, res: Response) {
  const verificationResult = verifySystem()
  res.status(200).json({ verificationResult })
}

function systemInformation(_req: Request, res: Response) {
  const versionInfo = getVersionInformation()
  res.status(200).json({ versionInfo })
}

function machinesModelInformation(_req: Request, res: Response) {
  try {
    const machinesModelInfoPath = path.join(
      getDirectoryPath(
        path.join(config.app.homeDir, config.app.appDirectory),
        config.app.machinesDirectory,
      ),
    )
    const machinesModelInfo = readFile(machinesModelInfoPath, config.app.machinesFileName)
    res.status(200).json({ machinesModelInfo })
  } catch (err) {
    const errorMessage = `Unable to fetch the machines model information due: ${
      (err as Error).message
    }`
    log.error(errorMessage)
    res.status(500).json({ error: errorMessage })
  }
}

api.get('/verify', verifyServerSetup)
api.get('/version', systemInformation)
api.get('/machines', machinesModelInformation)
