import { DatePicker, Form } from 'antd'
import { FieldProps } from 'formik'
import * as React from 'react'
import { FormFieldMeta } from './form-fields'
const FormItem = Form.Item

export interface CalendarPickerType extends FormFieldMeta {
  picker: 'year' | 'week'
}

export type CalendarPickerFieldProps = FieldProps<any> & {
  meta: CalendarPickerType
  layout: any
}
export const CalendarPickerField: React.SFC<CalendarPickerFieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  layout,
  meta,
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
      <DatePicker
        disabled={meta.readonly}
        onChange={(_value, dateString) => {
          setFieldValue(field.name, dateString)
        }}
        picker={meta.picker}
      />
    </FormItem>
  )
}
CalendarPickerField.displayName = 'CalendarPickerField'
