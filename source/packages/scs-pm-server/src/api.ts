import { Request, Response, Router } from 'express'
import { verifySystem } from './system-verification'

export const api = Router()

function verifyServerSetup(_req: Request, res: Response) {
  const result = verifySystem()
  res
    .status(200)
    .json({ message: `Server is connected and verified as : ${JSON.stringify(result)}` })
}

api.get('/verify', verifyServerSetup)
