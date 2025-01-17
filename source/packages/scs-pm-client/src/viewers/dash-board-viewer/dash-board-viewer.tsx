import { PlayCircleOutlined } from '@ant-design/icons'
import { Alert, Col, Collapse, Row, Switch, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { client } from '../../apollo-client'
import { IconButton, LinePlotWithSlider, notifyUser } from '../../components'
import {
  capitalizeFirstCharacter,
  MachineLog,
  MachineLogsResponse,
  MachineModelInformation,
  MachineModelTrainedInformation,
  MachineModelTrainedInformationResponse,
  MachinePredictionResponse,
  MachineTelemetry,
  MachineVitalsResponse,
  PredictionResult,
} from '../../models'
import {
  getMachineLogsByMachineId,
  getMachineModelTrainedInfoByMachineId,
  getMachinePredictionByMachineId,
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
  const [vitalsDs, setVitalsDs] = useState<MachineTelemetry[]>()

  const [vitals, setVitals] = useState<MachineTelemetry[]>()
  const [logs, setLogs] = useState<MachineLog[]>()
  const [machineModelTrainedInfo, setMachineModelTrainedInfo] = useState<MachineModelTrainedInformation[]>()

  const [isGraphView, setIsGraphView] = useState<boolean>(true)
  const [tableColumns] = useState<string[]>([
    'key',
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
      setVitalsDs(machineVitalsResult.machineVitals)
      setVitals(machineVitalsResult.machineVitals)

      const machineLogsQueryResult = await client.query({ query: getMachineLogsByMachineId(machineId) })
      const machineLogsResult = machineLogsQueryResult.data.queryResult as MachineLogsResponse
      const upLogs = machineLogsResult.machineLogs.map(c => {
        return {
          ...c,
          key: `${c.machineID}_${c.timestamp.toString()}`,
        }
      })
      setLogs(upLogs)

      const machineModelTrainedInfoQueryResult = await client.query({
        query: getMachineModelTrainedInfoByMachineId(machineId),
      })
      const machineModelTrainedResult = machineModelTrainedInfoQueryResult.data
        .queryResult as MachineModelTrainedInformationResponse
      setMachineModelTrainedInfo(
        machineModelTrainedResult.machineModelTrainedInformation.map(x => {
          return {
            ...x,
            key: `${x.machineID}_${x.cycle.toString()}`,
          }
        }),
      )
    }
    queryCall()
  }, [machineModelInfo])

  const getMachinePrediction = async (record: MachineModelTrainedInformation) => {
    const { machineID, cycle } = record
    const machinePredictionQueryResponse = await client.query({
      query: getMachinePredictionByMachineId(machineID, cycle),
    })

    const machinePredictionResult = machinePredictionQueryResponse.data.queryResult as MachinePredictionResponse
    const { machineId, prediction, predictionResult } = machinePredictionResult

    const notificationType =
      predictionResult === PredictionResult.SEVERE_STATE
        ? 'Error'
        : predictionResult === PredictionResult.BAD_STATE
        ? 'Warn'
        : 'Info'
    notifyUser(
      `Prediction for machine with id ${machineId} in cycle: ${cycle} is  ${prediction} (${predictionResult})`,
      notificationType,
    )
  }

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
            onClick={() => getMachinePrediction(record)}
          />
        ),
      })
    }

    return cols
  }

  const updateGraphs = (row: MachineModelTrainedInformation) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { cycle_start, cycle_end } = row

    const filteredVitals = vitalsDs?.filter(
      x =>
        new Date(x.timestamp).toISOString() >= new Date(cycle_start).toISOString() &&
        new Date(x.timestamp).toISOString() <= new Date(cycle_end).toISOString(),
    )
    setVitals(filteredVitals)
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
                <Collapse.Panel header="Logs" key="1">
                  {logs && logs.length !== 0 ? (
                    <LogsViewer data={logs} filterTableColumns={tableColumns} />
                  ) : (
                    <Alert message="Logs are un-available" type="info" />
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
                  rowSelection={{
                    type: 'radio',
                    onChange: (_selectedRowKeys: React.Key[], selectedRows: any[]) => {
                      updateGraphs(selectedRows[0])
                    },
                    hideSelectAll: true,
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
