import { Line } from '@ant-design/charts'
import React from 'react'

interface LinePlotData {
  x: string | number
  y: string | number
}

interface Props {
  data: LinePlotData[]
  xField: string
  yField: string
  tickCount: number
}

export const LinePlotWithSlider: React.FC<Props> = ({ data, xField, yField, tickCount }: Props) => {
  const config = {
    data,
    xField,
    yField,
    xAxis: {
      tickCount,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  }
  return (
    <div style={{ padding: 10, width: 'auto', height: 170 }}>
      <Line {...config} />
    </div>
  )
}
