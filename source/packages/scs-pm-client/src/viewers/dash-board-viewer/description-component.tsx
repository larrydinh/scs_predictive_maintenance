import { Collapse, Descriptions } from 'antd'
import React from 'react'
import { Hyperlink } from 'src/components'
import { convertIsoStringToDate, MachineModelInformation } from '../../models'

interface Props {
  value: MachineModelInformation
}

export const DescriptionComponent: React.FC<Props> = ({ value }: Props) => {
  const { givenName, inductionDate, departmentName, description, operatingManualLink } = value
  return (
    <Collapse
      defaultActiveKey="1"
      style={{
        borderRadius: 25,
        border: '1px solid #1890ff',
        padding: 8,
      }}
    >
      <Collapse.Panel header={`Machine Synopsis: (${givenName})`} key="1">
        <Descriptions size="small" bordered={true}>
          <Descriptions.Item label="Induction Date">{convertIsoStringToDate(inductionDate)}</Descriptions.Item>
          <Descriptions.Item label="Department">{departmentName}</Descriptions.Item>
          <Descriptions.Item label="Handbook">
            <Hyperlink title="Manual" url={operatingManualLink} />
          </Descriptions.Item>
          <Descriptions.Item label="Description">{description}</Descriptions.Item>
        </Descriptions>
      </Collapse.Panel>
    </Collapse>
  )
}
