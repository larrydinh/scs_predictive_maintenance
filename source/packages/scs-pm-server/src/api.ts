import { spawn } from 'child_process'
import { Request, Response, Router } from 'express'
import * as http from 'http'
import * as path from 'path'
import {
  getErrorMessage,
  MachineLog,
  MachineModelInformation,
  MachineModelTrainedInformation,
  MachineTelemetry,
} from 'scs-pm-core'
import { config } from './config'
import { log } from './logger'
import {
  addNewMachineToExistingMachines,
  getAllMachinesModelInformation,
  getMachineLogs,
  getMachineModelTrainedInformation,
  getMachineModelTrainedInformationByMachineIdAndCycle,
  getMachineVitals,
} from './machine'
import { getVersionInformation, verifySystem } from './system'

export const api = Router()
const pythonServerPath = path.join(__dirname, './python-server/app.py')
const pythonProcess = spawn('python3', [pythonServerPath], {
  stdio: 'inherit',
})

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
  const { machineId, cycle } = req.query
  if (cycle && machineId) {
    try {
      log.info(`Prediction for Machine:${machineId} for cycle: ${cycle} is requested`)
      log.info(`Python process is started with pid: ${pythonProcess.pid}`)
      const modelPath = path.join(__dirname, './raw-data/pm_pro3.pkl')
      const headers = config.app.modelHeaders

      getMachineModelTrainedInformationByMachineIdAndCycle(
        machineId as string,
        +cycle,
        (dataRow: MachineModelTrainedInformation[]) => {
          log.info(`Total ${dataRow.length} trained rows are found for machine id:${machineId}`)

          const data = dataRow[0]
          const columnNames = headers.join(',')
          const dataPoints: Partial<MachineModelTrainedInformation> = {}
          headers.forEach(h => {
            dataPoints[h] = +data[h]
          })
          log.info(`Data points before passing: ${JSON.stringify(dataPoints, null, 2)}`)

          const httpsReq = http.request(
            `http://127.0.0.1:5000/api/machinePrediction?machineId=M_0001&modelPath=${modelPath}&columnNames${columnNames}&dataPoints=${JSON.stringify(
              dataPoints,
            )}`,
            httpsRes => {
              httpsRes.setEncoding('utf8')
              httpsRes.on('data', d => {
                log.info(`The prediction of machine ${machineId} on cycle: ${cycle} is ${d}`)

                const predictionResult =
                  d.trim() === '"F1"'
                    ? 'Severe State'
                    : d.trim() === '"F2"'
                    ? 'Bad State'
                    : 'Machine is working fine'

                res.status(200).json({
                  machineId,
                  cycle: +cycle,
                  prediction: d.trim(),
                  predictionResult,
                })
              })
            },
          )

          httpsReq.on('error', err => {
            log.warn(`Killing python server with pid: ${pythonProcess.pid}`)
            res.status(500).json({ responseId: undefined, errorMessage: err.message })
          })

          // httpsReq.write(JSON.stringify({ machineId }))

          httpsReq.end()
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
}

api.get('/verify', verifyServerSetup)
api.get('/version', systemInformation)
api.get('/machines', machinesModelInformation)
api.get('/machineVitals', machineVitalsInformation)
api.get('/machineLogs', machineLogsInformation)
api.get('/machineModelTrainedInformation', machineModelTrainedInformation)
api.post('/addMachine', addNewMachine)
api.get('/machinePrediction', machinePrediction)
