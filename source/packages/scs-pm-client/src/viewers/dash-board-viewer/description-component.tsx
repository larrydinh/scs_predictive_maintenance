import { Descriptions } from 'antd'
import React from 'react'
import { Hyperlink } from 'src/components'
import { convertIsoStringToDate, MachineModelInformation } from '../../models'

interface Props {
  value: MachineModelInformation
  extra?: React.ReactNode
}

export const DescriptionComponent: React.FC<Props> = ({ value, extra }: Props) => {
  const { givenName, machineId, inductionDate, departmentName, description, operatingManualLink } = value
  return (
    <Descriptions size="small" title={`Machine Synopsis: (${givenName}- ${machineId})`} bordered={true} extra={extra}>
      <Descriptions.Item label="Machine Id">{machineId}</Descriptions.Item>
      <Descriptions.Item label="Induction Date">{convertIsoStringToDate(inductionDate)}</Descriptions.Item>
      <Descriptions.Item label="Department">{departmentName}</Descriptions.Item>
      <Descriptions.Item label="Handbook">
        <Hyperlink title="Manual" url={operatingManualLink} />
      </Descriptions.Item>
      <Descriptions.Item label="Description">{description}</Descriptions.Item>
    </Descriptions>
  )
}
