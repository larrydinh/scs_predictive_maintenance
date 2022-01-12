import React, { useState } from 'react'
import { DashboardViewer } from 'src/viewers'
import { Layout, QueryProvider, Selector } from '../components'
import { MachineModelInfoResponse, MachineModelInformation } from '../models'
import { getAllMachineModelInformationQuery } from '../queries'
import { AppNavigation } from './app-navigation/app-navigation'
import './dash-board-page.css'

export const DashBoardPage: React.FC = () => {
  const [machine, setMachine] = useState<MachineModelInformation>()
  return (
    <QueryProvider query={getAllMachineModelInformationQuery}>
      {({ data }) => {
        const machineModelInfo: MachineModelInformation[] = (data.queryResult as MachineModelInfoResponse).machines
        return (
          <Layout name="Dashboard" appNavigation={<AppNavigation />}>
            <div className="control-panel-container">
              <div className="control-panel">
                <Selector
                  style={{ flex: 1, marginRight: '10px' }}
                  domainValues={machineModelInfo.map(x => {
                    return {
                      value: x.identifier,
                      label: x.givenName,
                    }
                  })}
                  selectedValue={machine?.identifier || 'Select A Machine'}
                  placeholder="Select An Entity"
                  onValueChanged={selectedMachineIdentifier => {
                    const selectedMachine = machineModelInfo.filter(
                      mac => mac.identifier === selectedMachineIdentifier,
                    )[0]
                    setMachine(selectedMachine)
                  }}
                />
              </div>
              {machine ? (
                <DashboardViewer machineModelInfo={machine} />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/ic_scs.png`}
                  alt={`${process.env.PUBLIC_URL}/ic_scs.png`}
                  style={{
                    minWidth: '25%',
                    maxHeight: '100%',
                    display: 'inline-block',
                    margin: '0 auto',
                    marginTop: 50,
                  }}
                />
              )}
            </div>
          </Layout>
        )
      }}
    </QueryProvider>
  )
}
