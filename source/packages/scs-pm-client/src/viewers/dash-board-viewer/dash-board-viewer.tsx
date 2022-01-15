import { Alert, Col, Collapse, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { client } from '../../apollo-client'
import { ExportFile, LinePlotWithSlider, MultiLinePlot } from '../../components'
import { MachineModelInformation, MachineTelemetry, MachineVitalsResponse } from '../../models'
import { getMachineVitalsByMachineId } from '../../queries'
import { getMachineExportInfo } from '../../utils'
import { DescriptionComponent } from './description-component'

interface Props {
  machineModelInfo: MachineModelInformation
}

const collapseStyle: React.CSSProperties = {
  borderRadius: 25,
  border: '1px solid #1890ff',
  padding: 8,
}

export const DashboardViewer: React.FC<Props> = ({ machineModelInfo }: Props) => {
  const [data, setData] = useState<MachineTelemetry[]>()

  useEffect(() => {
    const queryCall = async () => {
      const result = await client.query({ query: getMachineVitalsByMachineId(machineModelInfo.machineId) })
      console.log(`Result: ${JSON.stringify(result, null, 2)}`)
      const r = result.data.queryResult as MachineVitalsResponse
      setData(r.machineVitals)
    }
    queryCall()
  }, [machineModelInfo.machineId])

  return (
    <>
      <div style={{ flex: 2, marginLeft: 10, marginRight: 10, flexGrow: 4 }}>
        <Collapse style={collapseStyle}>
          <Collapse.Panel header={`Machine Synopsis (${machineModelInfo.givenName})`} key="1">
            <DescriptionComponent
              value={machineModelInfo}
              extra={
                <ExportFile
                  infoToExport={getMachineExportInfo([machineModelInfo]).join(`\n\n\n`)}
                  fileName={`${machineModelInfo.givenName}.txt`}
                  toolTip="Export Machine Information"
                />
              }
            />
          </Collapse.Panel>
        </Collapse>
      </div>
      <Row style={{ marginTop: 8, marginLeft: 10, marginRight: 10 }} gutter={4}>
        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Temperature" key="1">
              {data ? (
                <LinePlotWithSlider
                  data={data.map(z => {
                    return {
                      Date: z.timestamp,
                      temperature: z.temperature,
                    }
                  })}
                  xField="Date"
                  yField="temperature"
                  tickCount={5}
                />
              ) : (
                <Alert message="No Data is Found" />
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>
        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Pressure" key="1">
              {data ? (
                <LinePlotWithSlider
                  data={data.map(z => {
                    return {
                      Date: z.timestamp,
                      pressure: z.pressure,
                    }
                  })}
                  xField="Date"
                  yField="pressure"
                  tickCount={5}
                />
              ) : (
                <Alert message="No Data is Found" />
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
      <Row style={{ marginTop: 8, marginLeft: 10, marginRight: 10 }} gutter={4}>
        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Speed" key="1">
              {data ? (
                <LinePlotWithSlider
                  data={data.map(z => {
                    return {
                      Date: z.timestamp,
                      speed: z.speed,
                    }
                  })}
                  xField="Date"
                  yField="speed"
                  tickCount={5}
                />
              ) : (
                <Alert message="No Data is Found" />
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>

        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Pressure Vs Ambient Pressure" key="1">
              {data ? (
                <MultiLinePlot
                  data={data.map(z => {
                    return {
                      Date: z.timestamp,
                      pressure: z.pressure,
                      ambientPressure: z.ambient_pressure,
                    }
                  })}
                  xField="Date"
                  yField={['pressure', 'ambientPressure']}
                  tickCount={5}
                />
              ) : (
                <Alert message="No Data is Found" />
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  )
}
