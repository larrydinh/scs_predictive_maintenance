import { Alert as AntdAlert } from 'antd'
import * as React from 'react'

type AlertType = 'error' | 'success' | 'info' | 'warning' | undefined

interface Props {
  message: any
  json?: JSON
  type?: AlertType
  closable?: boolean
}

function getMessage(err: Error) {
  return err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err)
}

function getHeader(type: AlertType) {
  switch (type) {
    case 'error':
      return 'Error'
    case 'info':
      return 'Information'
    case 'success':
      return 'Success'
    case 'warning':
      return 'Warning'
    default:
      return 'Error'
  }
}

export const Alert: React.FC<Props> = ({ message: errorMessage, type, closable }: Props) => (
  <AntdAlert
    message={getHeader(type)}
    description={getMessage(errorMessage)}
    type={type || 'error'}
    showIcon={true}
    style={{ margin: 20 }}
    closable={closable || false}
  />
)
