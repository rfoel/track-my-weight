import React, { useContext } from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import styled, { ThemeContext } from 'styled-components'
import { VictoryArea } from 'victory-area'

const StyledAreaChart = styled.div`
  svg {
    margin-bottom: -4px;
  }
`

const AreaChart = ({ data }) => {
  const {
    colors: { primary },
  } = useContext(ThemeContext)

  if (!data.length > 0) return null

  const maxWeight = Math.max(...data.map(({ weight }) => weight))
  const minWeight = Math.min(...data.map(({ weight }) => weight))

  return (
    <StyledAreaChart>
      <VictoryArea
        data={data}
        domain={{ y: [minWeight - 1, maxWeight + 1] }}
        padding={0}
        style={{ data: { fill: primary.dark } }}
        x={d => new Date(d.date)}
        y={d => d.weight}
        width={1000}
      />
    </StyledAreaChart>
  )
}

AreaChart.propTypes = {
  data: arrayOf(shape({ date: string, weight: number })),
}

AreaChart.defaultProps = {
  data: [],
}

export default AreaChart
