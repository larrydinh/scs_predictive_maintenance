import { Checkbox, Form } from 'antd'
import { FieldProps } from 'formik'
import * as React from 'react'
import { FormFieldMeta } from './form-fields'
const FormItem = Form.Item

export type BooleanFieldProps = FieldProps<any> & {
  meta: FormFieldMeta
  layout: any
}
export const BooleanField: React.SFC<BooleanFieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
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
      <Checkbox disabled={meta.readonly} checked={field.value} {...field} onChange={field.onChange as any} />
    </FormItem>
  )
}
BooleanField.displayName = 'BooleanField'
