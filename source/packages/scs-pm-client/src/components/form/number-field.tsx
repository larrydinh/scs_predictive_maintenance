import { Form, InputNumber } from 'antd'
import { FieldProps } from 'formik'
import * as React from 'react'
import { FormFieldMeta } from './form-fields'
const FormItem = Form.Item

export interface NumberFieldType extends FormFieldMeta {
  min?: number
  max?: number
  step: number
}

export type NumberFieldProps = FieldProps<any> & {
  meta: NumberFieldType
  layout: any
}

export const NumberField: React.SFC<NumberFieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  layout,
  meta,
}) => {
  const { min, max, step } = meta
  const errorMsg = touched[field.name] && errors[field.name]
  return (
    <FormItem
      {...layout}
      label={meta.label}
      required={meta.isRequired}
      help={errorMsg}
      validateStatus={errorMsg ? 'error' : undefined}
    >
      <InputNumber
        min={min || 0}
        max={max || 1000000}
        step={step}
        disabled={meta.readonly}
        defaultValue={field.value}
        onChange={(num: number | string | undefined) => setFieldValue(field.name, num)}
      />
    </FormItem>
  )
}
