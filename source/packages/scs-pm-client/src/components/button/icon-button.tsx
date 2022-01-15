import { Button, Tooltip } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import * as React from 'react'
import { MinimalComponentProps } from '../../models'

export type ButtonType = 'link' | 'text' | 'default' | 'primary' | 'ghost' | 'dashed' | undefined

export interface ButtonProps extends MinimalComponentProps {
  toolTip?: string
  icon?: React.ReactNode
  type?: ButtonType
  size?: SizeType
  danger?: boolean
  loading?: boolean
  hide?: boolean
}

interface Props extends ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const IconButton: React.FC<Props> = ({
  loading,
  toolTip,
  icon,
  onClick,
  type,
  size,
  hide,
  danger,
  ...rest
}: Props) =>
  hide !== true ? (
    <Tooltip title={toolTip} placement="bottom">
      <Button
        {...rest}
        type={type || 'primary'}
        htmlType="button"
        shape="circle"
        size={size ? size : 'small'}
        icon={icon}
        danger={danger || false}
        onClick={onClick}
        loading={loading || false}
      />
    </Tooltip>
  ) : null
