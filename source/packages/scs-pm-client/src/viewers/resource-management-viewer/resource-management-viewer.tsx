import { Card, Space, Typography } from 'antd'
import React from 'react'
import { MachineModelInformation } from '../../models'

interface Props {
  entityName: string
  entities: MachineModelInformation[]
}

export const ResourceManagementViewer: React.FC<Props> = ({ entityName, entities }: Props) => {
  return (
    <Card
      title={
        <div className="control-panel-container">
          <div className="control-panel">
            <Space align="center">
              <Typography.Title level={5}>{entityName}</Typography.Title>
            </Space>
          </div>
        </div>
      }
      bordered={true}
      style={{ margin: 9.5, overflowX: 'auto' }}
    >
      {/* <Table
        key={this.state.ds.length}
        expandable={{
          expandedRowRender: record => <JsonViewer name={entity} json={record as any} />,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        size={'small'}
        dataSource={this.state.ds}
        columns={this.getColumns(entity, schema)}
        rowSelection={rowSelection}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        footer={() => `Total Items (${getTitle(entity)}): ${this.state.ds.length}`}
      /> */}

      <p>{JSON.stringify(entities, null, 2)}</p>
    </Card>
  )
}
