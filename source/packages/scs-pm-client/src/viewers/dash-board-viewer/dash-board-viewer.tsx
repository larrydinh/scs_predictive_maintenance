import { ExceptionOutlined, ProjectOutlined } from '@ant-design/icons'
import { Alert, Col, Collapse, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { client } from '../../apollo-client'
import { ExportFile, IconButton, LinePlotWithSlider, MultiLinePlot } from '../../components'
import {
  MachineLog,
  MachineLogsResponse,
  MachineModelInformation,
  MachineTelemetry,
  MachineVitalsResponse,
} from '../../models'
import { getMachineLogsByMachineId, getMachineVitalsByMachineId } from '../../queries'
import { getMachineExportInfo } from '../../utils'
import { DescriptionComponent } from './description-component'
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
            extra={
              <Space size="small">
                <ExportFile
                  infoToExport={getMachineExportInfo([machineModelInfo]).join(`\n\n\n`)}
                  fileName={`info_${machineModelInfo.givenName}_${new Date().toLocaleDateString()}.txt`}
                  toolTip={`Export  ${machineModelInfo.givenName} Information`}
                />
                {vitals && (
                  <CSVLink
                    data={vitals}
                    filename={`vitals_${machineModelInfo.givenName}_${new Date().toLocaleDateString()}.csv`}
                  >
                    <IconButton icon={<ProjectOutlined />} toolTip={`Export ${machineModelInfo.givenName} Vitals`} />
                  </CSVLink>
                )}

                {logs && (
                  <CSVLink
                    data={logs}
                    filename={`logs_${machineModelInfo.givenName}_${new Date().toLocaleDateString()}.csv`}
                  >
                    <IconButton icon={<ExceptionOutlined />} toolTip={`Export ${machineModelInfo.givenName} Logs`} />
                  </CSVLink>
                )}
              </Space>
            }
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
                      Date: z.timestamp,
                      temperature: z.temperature,
                    }
                  })}
                  xField="Date"
                  yField="temperature"
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
                      Date: z.timestamp,
                      pressure: z.pressure,
                    }
                  })}
                  xField="Date"
                  yField="pressure"
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
                      Date: z.timestamp,
                      speed: z.speed,
                    }
                  })}
                  xField="Date"
                  yField="speed"
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
              {logs ? <LogsViewer data={logs} /> : <Alert message="Logs are un-available" />}
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  )
}
