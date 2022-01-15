import { DualAxes } from '@ant-design/plots'
import React from 'react'

interface Props {
  data: any[]
  xField: string
  yField: string[]

  tickCount: number
}

export const MultiLinePlot: React.FC<Props> = ({ data, xField, yField, tickCount }: Props) => {
  const config = {
    data: [data, data],
    xField,
    yField,

    xAxis: {
      tickCount,
    },
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
      },
    ],
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  }

  return (
    <div style={{ padding: 10, width: 'auto', height: 200 }}>
      <DualAxes {...config} />
    </div>
  )
}
