import React, { useContext } from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import { ThemeContext } from 'styled-components'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import dayjs from 'dayjs'

const Chart = ({ weights, week }) => {
  const {
    colors: { primary },
  } = useContext(ThemeContext)

  if (!weights.length > 0) return null

  const data = week.map(day => {
    return (
      weights.find(({ date }) => dayjs(date).format('YYYY-MM-DD') === day.format('YYYY-MM-DD')) || {
        date: day,
        weight: 0,
      }
    )
  })

  return (
    <ResponsiveContainer width="99%" height={300}>
      <AreaChart data={data} margin={{ left: 0, bottom: 0 }}>
        <Area dataKey="weight" fill={primary.dark} isAnimationActive={false} stroke="transparent" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

Chart.propTypes = {
  week: arrayOf(string),
  weights: arrayOf(shape({ date: string, weight: number })),
}

Chart.defaultProps = {
  week: [],
  weights: [],
}

export default Chart
