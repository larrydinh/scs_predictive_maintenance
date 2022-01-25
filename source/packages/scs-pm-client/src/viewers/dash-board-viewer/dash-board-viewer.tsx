import { PlayCircleOutlined } from '@ant-design/icons'
import { Alert, Col, Collapse, Row, Switch, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { client } from '../../apollo-client'
import { IconButton, LinePlotWithSlider, MultiLinePlot } from '../../components'
import {
  capitalizeFirstCharacter,
  MachineLog,
  MachineLogsResponse,
  MachineModelInformation,
  MachineModelTrainedInformation,
  MachineModelTrainedInformationResponse,
  MachineTelemetry,
  MachineVitalsResponse,
} from '../../models'
import {
  getMachineLogsByMachineId,
  getMachineModelTrainedInfoByMachineId,
  getMachineVitalsByMachineId,
} from '../../queries'
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
  const [machineModelTrainedInfo, setMachineModelTrainedInfo] = useState<MachineModelTrainedInformation[]>()

  const [isGraphView, setIsGraphView] = useState<boolean>(true)
  const [tableColumns] = useState<string[]>([
    'machineID',
    'speed_desired',
    'ambient_temperature',
    'ambient_pressure',
    'speed_desired_max',
  ])

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

      const machineModelTrainedInfoQueryResult = await client.query({
        query: getMachineModelTrainedInfoByMachineId(machineId),
      })
      const machineModelTrainedResult = machineModelTrainedInfoQueryResult.data
        .queryResult as MachineModelTrainedInformationResponse
      setMachineModelTrainedInfo(machineModelTrainedResult.machineModelTrainedInformation)
    }
    queryCall()
  }, [machineModelInfo])

  const getColumns = (
    ds: MachineTelemetry[] | MachineModelTrainedInformation[],
    isActionColumnRequired = false,
  ): ColumnProps<any>[] => {
    const cols: ColumnProps<any>[] = Object.keys(ds[ds.length - 1] || [])
      .filter(key => tableColumns.indexOf(key) === -1)
      .map(key => {
        return {
          title: capitalizeFirstCharacter(key),
          dataIndex: key,
          key: key,
          width: 250,
          render: (text: any) => {
            return text
          },
        }
      })
    if (isActionColumnRequired) {
      cols.push({
        title: '',
        key: 'action',
        render: (_text: any, record: any) => (
          <IconButton
            toolTip="Execute Task"
            icon={<PlayCircleOutlined />}
            onClick={() => console.log(`record: ${JSON.stringify(record)}`)}
          />
        ),
      })
    }

    return cols
  }

  return (
    <>
      <div style={{ flex: 2, marginLeft: 10, marginRight: 10, flexGrow: 4 }}>
        <Collapse style={collapseStyle}>
          <Collapse.Panel
            header={`Machine Synopsis (${machineModelInfo.givenName})`}
            key="1"
            extra={
              <>
                <Switch
                  style={{ marginRight: 5 }}
                  checkedChildren="Graph View"
                  unCheckedChildren="Table View"
                  defaultChecked={isGraphView}
                  onChange={(checked, e) => {
                    e.stopPropagation()
                    setIsGraphView(checked)
                  }}
                />
                <ExportMachineInfoComponent machineModelInfo={machineModelInfo} vitals={vitals} logs={logs} />
              </>
            }
          >
            <DescriptionComponent value={machineModelInfo} />
          </Collapse.Panel>
        </Collapse>
      </div>

      {isGraphView ? (
        <>
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
        </>
      ) : (
        <Row style={{ marginTop: 8, marginLeft: 10, marginRight: 10 }} gutter={4}>
          <Col span={24}>
            <Collapse defaultActiveKey="1" style={collapseStyle}>
              <Collapse.Panel header="Machine Vitals" key="1">
                {vitals ? (
                  <Table
                    key={vitals.length}
                    size={'small'}
                    dataSource={vitals}
                    columns={getColumns(vitals)}
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                      pageSizeOptions: ['10', '20', '30'],
                    }}
                    footer={() => `Total(#): ${vitals.length}`}
                  />
                ) : (
                  <Alert message="Data is un-available" />
                )}
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      )}

      <Row style={{ marginTop: 8, marginLeft: 10, marginRight: 10 }} gutter={4}>
        <Col span={24}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Logs" key="1">
              {logs && logs.length !== 0 ? (
                <LogsViewer data={logs} filterTableColumns={tableColumns} />
              ) : (
                <Alert message="Logs are un-available" />
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>

      <Row style={{ marginTop: 8, marginLeft: 10, marginRight: 10 }} gutter={4}>
        <Col span={24}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Machine Cycles" key="1">
              {machineModelTrainedInfo ? (
                <Table
                  style={{ maxWidth: 1600, overflowX: 'auto' }}
                  key={machineModelTrainedInfo.length}
                  size={'small'}
                  dataSource={machineModelTrainedInfo}
                  columns={getColumns(machineModelTrainedInfo, true)}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                  }}
                  footer={() => `Total(#): ${machineModelTrainedInfo.length}`}
                />
              ) : (
                <Alert message="Data is un-available" />
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  )
}
