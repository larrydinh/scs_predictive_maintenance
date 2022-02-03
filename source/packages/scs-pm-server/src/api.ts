import { Request, Response, Router } from 'express'
import * as fs from 'fs'
import * as jpickle from 'jpickle'
import * as path from 'path'
import {
  getErrorMessage,
  MachineLog,
  MachineModelInformation,
  MachineModelTrainedInformation,
  MachineTelemetry,
} from 'scs-pm-core'
import { log } from './logger'
import {
  addNewMachineToExistingMachines,
  getAllMachinesModelInformation,
  getMachineLogs,
  getMachineModelTrainedInformation,
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
    res.status(200).json(machinesModelInfo)
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

    res.status(200).json({ machine: newMachine, allMachines: updatedMachines, response: 'OK' })
  } catch (err) {
    const errorMessage = `Unable to add new machine to the system due to: ${getErrorMessage(err)}`
    log.error(errorMessage)
    res.status(500).json({ error: errorMessage, response: 'Error' })
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

function machineModelTrainedInformation(req: Request, res: Response) {
  const { machineId } = req.query
  try {
    log.info(`Machine trained model information for machine id:${machineId} are requested`)
    getMachineModelTrainedInformation(
      machineId as string,
      (data: MachineModelTrainedInformation[]) => {
        log.info(`Total ${data.length} trained rows are found for machine id:${machineId}`)
        res.status(200).json({ machineModelTrainedInformation: data })
      },
    )
  } catch (err) {
    const errorMessage = `Unable to get the machine model trained  data for the machine ${machineId} due to: ${getErrorMessage(
      err,
    )}`
    log.error(errorMessage)
    res.status(500).json({ error: errorMessage })
  }
}

async function machinePrediction(req: Request, res: Response) {
  const { machineId } = req.query
  try {
    log.info(`Prediction for Machine:${machineId} are requested`)

    const modelPath = path.join(__dirname, './raw-data/pm_pro3.pkl')
    console.log(`model path: ${JSON.stringify(modelPath, null, 2)}`)
    const modelData = fs.readFileSync(modelPath, 'binary')

    const f = await jpickle.loads(modelData)

    console.log(`f: ${f}`)
    console.log(`f: ${JSON.stringify(f, null, 2)}`)
    res.status(200).json({ machinePrediction: `prediction for ${machineId} is done` })
  } catch (err) {
    const errorMessage = `Unable to get the machine model trained  data for the machine ${machineId} due to: ${getErrorMessage(
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
api.get('/machineModelTrainedInformation', machineModelTrainedInformation)
api.post('/addMachine', addNewMachine)
api.get('/machinePrediction', machinePrediction)
