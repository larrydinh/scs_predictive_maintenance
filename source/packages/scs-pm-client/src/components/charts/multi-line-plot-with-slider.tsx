import { DualAxes, DualAxesConfig, Options } from '@ant-design/plots'
import { Axis } from '@ant-design/plots/node_modules/@antv/g2plot'
import React from 'react'

interface Props {
  data: any[]
  xField: string
  yField: string[]
  xAxis: Axis
  yAxis: Options['yAxis'][] | Record<string, Options['yAxis']>
}

export const MultiLinePlot: React.FC<Props> = ({ data, xField, yField, xAxis, yAxis }: Props) => {
  const config: DualAxesConfig = {
    data: [data, data],
    xField,
    yField,
    xAxis,
    yAxis,
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
        smooth: true,
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
        smooth: true,
      },
    ],

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
