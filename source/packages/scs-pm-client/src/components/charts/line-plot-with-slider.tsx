import { Line, LineConfig } from '@ant-design/charts'
import React from 'react'

interface Props {
  data: any[]
  xField: string
  yField: string
  tickCount: number
}

export const LinePlotWithSlider: React.FC<Props> = ({ data, xField, yField, tickCount }: Props) => {
  const config: LineConfig = {
    data,
    xField,
    yField,
    xAxis: {
      tickCount,
    },
    legend: {
      layout: 'horizontal',

      position: 'top',
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  }
  return (
    <div style={{ padding: 10, width: 'auto', height: 200 }}>
      <Line {...config} />
    </div>
  )
}
