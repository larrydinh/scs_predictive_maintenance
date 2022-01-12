import { cloneJson, MachineModelInformation } from '../../models'
import machineModelInformationTestData from '../test-data/machine-model-information.json'

export let machineModelInfoTestData: MachineModelInformation[]

beforeEach(() => {
  machineModelInfoTestData = cloneJson(machineModelInformationTestData) as MachineModelInformation[]
})
