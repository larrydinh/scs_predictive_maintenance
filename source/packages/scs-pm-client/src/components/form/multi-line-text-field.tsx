import { Form, Input } from 'antd'
import { FieldProps } from 'formik'
import * as React from 'react'
import { TextFieldProps } from '..'
const FormItem = Form.Item

export const MultilineTextField: React.FC<FieldProps<any> & TextFieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  meta,
  layout,
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
      <Input.TextArea
        allowClear={true}
        autoSize={{ minRows: 2, maxRows: 10 }}
        rows={4}
        disabled={meta.readonly}
        {...field}
        {...props}
        onChange={field.onChange}
      />
    </FormItem>
  )
}
