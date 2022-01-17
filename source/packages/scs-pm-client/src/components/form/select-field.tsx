import { Form, Select } from 'antd'
// tslint:disable-next-line:no-submodule-imports
import { SelectValue } from 'antd/lib/select'
import { FieldProps } from 'formik'
import * as React from 'react'
import { FormFieldMeta } from './form-fields'
const FormItem = Form.Item
const Option = Select.Option

export interface SetItem {
  label: string
  value: string
}

export interface SetFieldType extends FormFieldMeta {
  possibleValues: SetItem[]
  multipleSelect: boolean
}

export type SetFieldProps = FieldProps<any> & {
  meta: SetFieldType
  layout: any
  onChange?: (selectValue: SelectValue) => void
}

export const SetField: React.SFC<SetFieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  layout,
  meta,
  onChange,
}) => {
  const errorMsg = touched[field.name] && errors[field.name]
  return (
    <FormItem
      {...layout}
      label={meta.label}
      required={meta.isRequired}
      help={errorMsg}
      validateStatus={errorMsg ? 'error' : undefined}
    >
      <Select
        style={{ minWidth: 190 }}
        disabled={meta.readonly}
        mode={meta.multipleSelect ? 'multiple' : undefined}
        defaultValue={meta.multipleSelect ? (field.value || []).map((x: number) => x) : field.value}
        onChange={(val: SelectValue) => {
          setFieldValue(field.name, val)
          if (onChange) {
            onChange(val)
          }
        }}
      >
        {(meta.possibleValues || []).map((el: SetItem) => (
          <Option key={`${el.value}_${el.label}`} value={el.value}>
            {el.label}
          </Option>
        ))}
      </Select>
    </FormItem>
  )
}
