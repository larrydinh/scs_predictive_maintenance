import { Line, LineConfig } from '@ant-design/charts'
import React from 'react'

interface Props {
  data: any[]
  xField: string
  yField: string
  tickCount: number
  xAxisTitle: string
  yAxisTitle: string
}

export const LinePlotWithSlider: React.FC<Props> = ({
  data,
  xField,
  yField,
  xAxisTitle,
  yAxisTitle,
  tickCount,
}: Props) => {
  const config: LineConfig = {
    data,
    xField,
    yField,
    xAxis: {
      tickCount,
      title: {
        text: xAxisTitle,
      },
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
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
