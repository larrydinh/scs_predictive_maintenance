import { Select } from 'antd'
import * as React from 'react'
import { LabelValue, MinimalComponentProps } from '../../models'

interface SelectorProps extends MinimalComponentProps {
  domainValues: LabelValue[]
  selectedValue: string | undefined
  placeholder?: string
  onValueChanged?: (value: string) => void
}

export const Selector: React.FC<SelectorProps> = ({
  domainValues,
  selectedValue,
  placeholder = 'Select',
  onValueChanged,
  ...rest
}: SelectorProps) => (
  <Select
    {...rest}
    defaultActiveFirstOption={true}
    showArrow={true}
    placeholder={placeholder || 'Select'}
    value={selectedValue}
    onChange={onValueChanged}
    showSearch={true}
    onSearch={() => undefined}
  >
    {domainValues.map(domainValue => (
      <Select.Option key={domainValue.value} value={domainValue.value}>
        {domainValue.label}
      </Select.Option>
    ))}
  </Select>
)
