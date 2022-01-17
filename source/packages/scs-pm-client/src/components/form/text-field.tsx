import { Form, Input } from 'antd'
import { FieldProps } from 'formik'
import * as React from 'react'
import { FormFieldMeta } from './form-fields'
const FormItem = Form.Item

export interface TextFieldProps {
  meta: FormFieldMeta
  layout: any
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const TextField: React.FC<FieldProps<any> & TextFieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  meta,
  layout,
  onChange,
  ...props
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
      <Input
        disabled={meta.readonly}
        {...field}
        {...props}
        onChange={e => {
          if (onChange) {
            onChange(e)
          }
          field.onChange(e)
        }}
      />
    </FormItem>
  )
}
