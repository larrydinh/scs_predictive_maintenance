import { Request, Response, Router } from 'express'
import { getErrorMessage, MachineLog, MachineModelInformation, MachineTelemetry } from 'scs-pm-core'
import { log } from './logger'
import {
  addNewMachineToExistingMachines,
  getAllMachinesModelInformation,
  getMachineLogs,
  getMachineVitals,
} from './machine'
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

function machinesModelInformation(_req: Request, res: Response) {
  try {
    const machinesModelInfo = getAllMachinesModelInformation()
    res.status(200).json({ machines: machinesModelInfo.machines })
  } catch (err) {
    const errorMessage = `Unable to fetch the machines model information due to: ${
      (err as Error).message
    }`
    log.error(errorMessage)
    res.status(500).json({ error: errorMessage })
  }
}

function addNewMachine(req: Request, res: Response) {
  try {
    const newMachine: MachineModelInformation = req.body.machine
    const updatedMachines = addNewMachineToExistingMachines(newMachine)

    res.status(200).json({ machines: updatedMachines })
  } catch (err) {
    const errorMessage = `Unable to add new machine to the system due t: ${getErrorMessage(err)}`
    log.error(errorMessage)
    res.status(500).json({ error: errorMessage })
  }
}

function machineVitalsInformation(req: Request, res: Response) {
  const { machineId } = req.query
  try {
    log.info(`Vitals for machine id:${machineId} are requested`)
    getMachineVitals(machineId as string, (data: MachineTelemetry[]) => {
      log.info(`Total ${data.length} vitals are found for machine id:${machineId}`)
      res.status(200).json({ machineVitals: data })
    })
  } catch (err) {
    const errorMessage = `Unable to get the vitals for the machine ${machineId} due to: ${getErrorMessage(
      err,
    )}`
    log.error(errorMessage)
    res.status(500).json({ error: errorMessage })
  }
}

function machineLogsInformation(req: Request, res: Response) {
  const { machineId } = req.query
  try {
    log.info(`Logs for machine id:${machineId} are requested`)
    getMachineLogs(machineId as string, (data: MachineLog[]) => {
      log.info(`Total ${data.length} logs are found for machine id:${machineId}`)
      res.status(200).json({ machineLogs: data })
    })
  } catch (err) {
    const errorMessage = `Unable to get the logs for the machine ${machineId} due to: ${getErrorMessage(
      err,
    )}`
    log.error(errorMessage)
    res.status(500).json({ error: errorMessage })
  }
}

api.get('/verify', verifyServerSetup)
api.get('/version', systemInformation)
api.get('/machines', machinesModelInformation)
api.get('/machineVitals', machineVitalsInformation)
api.get('/machineLogs', machineLogsInformation)
api.post('/addMachine', addNewMachine)
