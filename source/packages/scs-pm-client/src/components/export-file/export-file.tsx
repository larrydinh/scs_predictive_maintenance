import { ExportOutlined } from '@ant-design/icons'
import React from 'react'
import { IconButton } from '..'

interface Props {
  infoToExport: string
  fileName: string
  toolTip?: string
}

export const ExportFile: React.FC<Props> = ({ infoToExport, fileName, toolTip }: Props) => {
  const exportInformation = () => {
    const hrefUrl = window.URL.createObjectURL(new Blob([infoToExport], { type: 'text/plain' }))
    const link = document.createElement('a')
    link.href = hrefUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <IconButton
      key="exportConfiguration"
      style={{ marginTop: 5, marginRight: 5 }}
      toolTip={toolTip || 'Export'}
      onClick={exportInformation}
      icon={<ExportOutlined />}
    />
  )
}
