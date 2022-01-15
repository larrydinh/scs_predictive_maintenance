import * as path from 'path'
import { MachineModelInfoResponse, MachineModelInformation, MachineTelemetry } from 'scs-pm-core'
import { config } from '../config'
import { log } from '../logger'
import { getCSVData, getDirectoryPath, readFile, writeFile } from '../utils'

export function getAllMachinesModelInformation(): MachineModelInfoResponse {
  const machinesModelInfoPath = path.join(
    getDirectoryPath(
      path.join(config.app.homeDir, config.app.appDirectory),
      config.app.machinesDirectory,
    ),
  )
  const machinesModelInfo = readFile(
    machinesModelInfoPath,
    config.app.machinesFileName,
    'JSON',
  ) as MachineModelInfoResponse
  return machinesModelInfo
}

export function addNewMachineToExistingMachines(
  newMachine: MachineModelInformation,
): MachineModelInformation[] {
  const existingMachines = getAllMachinesModelInformation().machines

  if (!existingMachines.includes(newMachine)) {
    existingMachines.push(newMachine)
    writeFile(
      config.getMachinesDirectory(),
      config.app.machinesFileName,
      JSON.stringify(existingMachines),
    )
    log.info(
      `New machine with identifier ${newMachine.identifier} is added to the system and total machines in system are(#): ${existingMachines.length}`,
    )
  } else {
    log.warn(`New machine with identifier ${newMachine.identifier} is already present`)
  }

  return existingMachines
}

export function getMachineVitals(
  machineId: string,
  callBack: (machineVitals: MachineTelemetry[]) => void,
) {
  getCSVData(
    path.join(config.getMachinesDirectory(), config.app.machineVitals),
    config.app.telemetryHeaders,
    (data: MachineTelemetry[]) => {
      const machineVitals = data.filter(mac => mac.machineID === machineId)
      callBack(machineVitals)
    },
  )
}
