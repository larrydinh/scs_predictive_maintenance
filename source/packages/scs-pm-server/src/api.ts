import { Request, Response, Router } from 'express'
import { getVersionInformation, verifySystem } from './system'

export const api = Router()

function verifyServerSetup(_req: Request, res: Response) {
  const verificationResult = verifySystem()
  res.status(200).json({ verificationResult })
}

function systemInformation(_req: Request, res: Response) {
  const versionInfo = getVersionInformation()
  res.status(200).json({ versionInfo })
}

api.get('/verify', verifyServerSetup)
api.get('/version', systemInformation)
