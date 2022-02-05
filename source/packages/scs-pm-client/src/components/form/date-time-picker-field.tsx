import { DatePicker, Form } from 'antd'
import moment from 'antd/node_modules/moment'
import { FieldProps } from 'formik'
import * as React from 'react'
import { FormFieldMeta } from './form-fields'
const FormItem = Form.Item

export type DateTimePickerProps = FieldProps<any> & {
  meta: FormFieldMeta
  layout: any
}
export const DateTimePickerField: React.SFC<DateTimePickerProps> = ({
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
        format="YYYY-MM-DD HH:mm:ss"
        disabled={meta.readonly}
        disabledDate={current => {
          return current && current < moment().endOf('day')
        }}
        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
        onChange={value => {
          setFieldValue(field.name, value?.format())
        }}
      />
    </FormItem>
  )
}
DateTimePickerField.displayName = 'DateTimePickerField'
