import { Col, Collapse, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { ExportFile, LinePlotWithSlider } from '../../components'
import { MachineModelInformation } from '../../models'
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
  const [data, setData] = useState([])

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        console.log('fetch data failed', error)
      })
  }
  useEffect(() => {
    asyncFetch()
  }, [])

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
              <LinePlotWithSlider data={data} xField="Date" yField="scales" tickCount={5} />
            </Collapse.Panel>
          </Collapse>
        </Col>
        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Pressure" key="1">
              <LinePlotWithSlider data={data} xField="Date" yField="scales" tickCount={5} />
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
      <Row style={{ marginTop: 8, marginLeft: 10, marginRight: 10 }} gutter={4}>
        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Speed" key="1">
              <LinePlotWithSlider data={data} xField="Date" yField="scales" tickCount={5} />
            </Collapse.Panel>
          </Collapse>
        </Col>
        <Col span={12}>
          <Collapse defaultActiveKey="1" style={collapseStyle}>
            <Collapse.Panel header="Desired Speed" key="1">
              <LinePlotWithSlider data={data} xField="Date" yField="scales" tickCount={5} />
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  )
}
