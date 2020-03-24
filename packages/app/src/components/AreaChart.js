import React, { useContext } from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import { ThemeContext } from 'styled-components'
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts'

const Chart = ({ weights }) => {
  const {
    colors: { primary },
  } = useContext(ThemeContext)

  if (!weights.length > 0) return null

  const data = weights.length === 1 ? [...weights, ...weights] : weights

  const maxWeight = Math.max(...data.map(({ weight }) => weight))
  const minWeight = Math.min(...data.map(({ weight }) => weight))

  return (
    <ResponsiveContainer width="99.9999%" height={300}>
      <AreaChart data={data} margin={{ left: 0, bottom: 0 }}>
        <Area dataKey="weight" fill={primary.dark} isAnimationActive={false} stroke="transparent" />
        <YAxis domain={[minWeight - 3, maxWeight]} hide type="number" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

Chart.propTypes = {
  weights: arrayOf(shape({ date: string, weight: number })),
}

Chart.defaultProps = {
  weights: [],
}

export default Chart
