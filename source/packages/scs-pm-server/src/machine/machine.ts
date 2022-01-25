import * as path from 'path'
import {
  MachineLog,
  MachineModelInformation,
  MachineModelTrainedInformation,
  MachineTelemetry,
} from 'scs-pm-core'
import { config } from '../config'
import { log } from '../logger'
import { getCSVData, getDirectoryPath, readFile, writeFile } from '../utils'

export function getAllMachinesModelInformation() {
  const machinesModelInfoPath = path.join(
    getDirectoryPath(
      path.join(config.app.homeDir, config.app.appDirectory),
      config.app.machinesDirectory,
    ),
  )
  const machinesModelInfo = readFile(machinesModelInfoPath, config.app.machinesFileName, 'JSON')
  return machinesModelInfo
}

export function addNewMachineToExistingMachines(
  newMachine: MachineModelInformation,
): MachineModelInformation[] {
  const { machines } = getAllMachinesModelInformation()
  if (!machines.includes(newMachine)) {
    machines.push(newMachine)
    writeFile(
      config.getMachinesDirectory(),
      config.app.machinesFileName,
      JSON.stringify({ machines }),
    )
    log.info(
      `New machine with identifier ${newMachine.identifier} is added to the system and total machines in system are(#): ${machines.length}`,
    )
  } else {
    log.warn(`New machine with identifier ${newMachine.identifier} is already present`)
  }

  return machines
}

export function getMachineVitals(
  machineId: string,
  callBack: (machineVitals: MachineTelemetry[]) => void,
) {
  getCSVData<MachineTelemetry>(
    path.join(config.getMachinesDirectory(), config.app.machineVitals),
    config.app.telemetryHeaders,
    (data: MachineTelemetry[]) => {
      const machineVitals = data.filter(mac => mac.machineID === machineId)
      callBack(machineVitals)
    },
  )
}

export function getMachineLogs(machineId: string, callBack: (machineLogs: MachineLog[]) => void) {
  getCSVData<MachineLog>(
    path.join(config.getMachinesDirectory(), config.app.machineLogs),
    config.app.logHeaders,
    (data: MachineLog[]) => {
      const machineLogs = data.filter(mac => mac.machineID === machineId)
      callBack(machineLogs)
    },
  )
}

export function getMachineModelTrainedInformation(
  machineId: string,
  callBack: (machineModelTrainedInformation: MachineModelTrainedInformation[]) => void,
) {
  getCSVData<MachineModelTrainedInformation>(
    path.join(config.getMachinesDirectory(), config.app.machineModelTrainedInformation),
    config.app.machineModelTrainedInfoHeaders,
    (data: MachineModelTrainedInformation[]) => {
      const machineModelTrainedInformation = data.filter(mac => mac.machineID === machineId)
      callBack(machineModelTrainedInformation)
    },
  )
}
