import { Alert, Col, Collapse, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { client } from '../../apollo-client'
import { LinePlotWithSlider, MultiLinePlot } from '../../components'
import {
  MachineLog,
  MachineLogsResponse,
  MachineModelInformation,
  MachineTelemetry,
  MachineVitalsResponse,
} from '../../models'
import { getMachineLogsByMachineId, getMachineVitalsByMachineId } from '../../queries'
import { DescriptionComponent } from './description-component'
import { ExportMachineInfoComponent } from './export-machine-info-component'
import { LogsViewer } from './logs-viewer'
interface Props {
  machineModelInfo: MachineModelInformation
}

const collapseStyle: React.CSSProperties = {
  borderRadius: 25,
  border: '1px solid #1890ff',
  padding: 8,
}

export const DashboardViewer: React.FC<Props> = ({ machineModelInfo }: Props) => {
  const [vitals, setVitals] = useState<MachineTelemetry[]>()
  const [logs, setLogs] = useState<MachineLog[]>()

  useEffect(() => {
    const { machineId } = machineModelInfo

    const queryCall = async () => {
      const machineVitalsQueryResult = await client.query({
        query: getMachineVitalsByMachineId(machineId),
      })
      const machineVitalsResult = machineVitalsQueryResult.data.queryResult as MachineVitalsResponse
      setVitals(machineVitalsResult.machineVitals)

      const machineLogsQueryResult = await client.query({ query: getMachineLogsByMachineId(machineId) })
      const machineLogsResult = machineLogsQueryResult.data.queryResult as MachineLogsResponse
      setLogs(machineLogsResult.machineLogs)
    }
    queryCall()
  }, [machineModelInfo])

  return (
    <>
      <div style={{ flex: 2, marginLeft: 10, marginRight: 10, flexGrow: 4 }}>
        <Collapse style={collapseStyle}>
          <Collapse.Panel
            header={`Machine Synopsis (${machineModelInfo.givenName})`}
            key="1"
            extra={<ExportMachineInfoComponent machineModelInfo={machineModelInfo} vitals={vitals} logs={logs} />}
          >
            <DescriptionComponent value={machineModelInfo} />
          </Collapse.Panel>
        </Collapse>
      </div>
      <Row style={{ marginTop: 8, marginLeft: 10, marginRight: 10 }} gutter={4}>
        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Temperature" key="1">
              {vitals ? (
                <LinePlotWithSlider
                  data={vitals.map(z => {
                    return {
                      timestamp: z.timestamp,
                      temperature: z.temperature,
                    }
                  })}
                  xField="timestamp"
                  yField="temperature"
                  xAxisTitle="Timestamp"
                  yAxisTitle="Temperature (°C)"
                  tickCount={5}
                />
              ) : (
                <Alert message="Data is un-available" />
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>
        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Pressure" key="1">
              {vitals ? (
                <LinePlotWithSlider
                  data={vitals.map(z => {
                    return {
                      timestamp: z.timestamp,
                      pressure: z.pressure,
                    }
                  })}
                  xField="timestamp"
                  yField="pressure"
                  xAxisTitle="Timestamp"
                  yAxisTitle="Pressure (kPa)"
                  tickCount={5}
                />
              ) : (
                <Alert message="Data is un-available" />
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
      <Row style={{ marginTop: 8, marginLeft: 10, marginRight: 10 }} gutter={4}>
        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Speed" key="1">
              {vitals ? (
                <LinePlotWithSlider
                  data={vitals.map(z => {
                    return {
                      timestamp: z.timestamp,
                      speed: z.speed,
                    }
                  })}
                  xField="timestamp"
                  yField="speed"
                  xAxisTitle="Timestamp"
                  yAxisTitle="Speed (rpm)"
                  tickCount={5}
                />
              ) : (
                <Alert message="Data is un-available" />
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>

        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Pressure Vs Ambient Pressure" key="1">
              {vitals ? (
                <MultiLinePlot
                  data={vitals.map(z => {
                    return {
                      timestamp: z.timestamp,
                      pressure: z.pressure,
                      ambientPressure: z.ambient_pressure,
                    }
                  })}
                  xField="timestamp"
                  yField={['pressure', 'ambientPressure']}
                  xAxis={{
                    title: {
                      text: 'Timestamp',
                    },
                  }}
                  yAxis={{
                    pressure: {
                      tickCount: 5,
                      title: {
                        text: 'Pressure (kPa)',
                      },
                    },
                    ambientPressure: {
                      tickCount: 5,
                      title: {
                        text: 'Ambient Pressure (kPa)',
                      },
                    },
                  }}
                />
              ) : (
                <Alert message="Data is un-available" />
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
      <Row style={{ marginTop: 8, marginLeft: 10, marginRight: 10 }} gutter={4}>
        <Col span={24}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Logs" key="1">
              {logs && logs.length !== 0 ? <LogsViewer data={logs} /> : <Alert message="Logs are un-available" />}
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  )
}
