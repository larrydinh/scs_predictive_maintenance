import { Request, Response, Router } from 'express'

export const api = Router()

function verifyServerConnection(_req: Request, res: Response) {
  res.status(200).json({ message: 'Server is connected' })
}

api.get('/verify', verifyServerConnection)
