import { Select } from 'antd'
import * as React from 'react'
import { MinimalComponentProps } from '../../models/component'

interface SelectorProps extends MinimalComponentProps {
  domainValues: string[]
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
      <Select.Option key={domainValue} value={domainValue}>
        {domainValue}
      </Select.Option>
    ))}
  </Select>
)
