import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import styled, { css } from 'styled-components'
import { Box, Column, Grid, Heading, Text } from '@1e3/ui'

import AreaChart from '../components/AreaChart'
import AddButton from '../components/AddButton'

const GET_DATA = gql`
  {
    weights @client {
      date
      weight
    }
    filter @client {
      date
      by
    }
  }
`

const Home = styled(Grid)(
  ({
    theme: {
      colors: { white },
      scale,
    },
  }) => css`
    color: ${white};
    height: 100%;
    width: 100%;

    h1 {
      margin: ${scale(2)};
      text-align: center;
    }
  `,
)

const Day = styled(Box)(
  ({
    theme: {
      colors: { white },
    },
  }) => css`
    align-items: center;
    border: 1px solid ${white};
    color: ${white};
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
)

const getWeek = date => {
  const days = []

  for (let index = 0; index < 7; index += 1) {
    days.push(
      dayjs(date)
        .startOf('week')
        .add(index, 'day'),
    )
  }

  return days
}

export default () => {
  const {
    data: { weights, filter },
  } = useQuery(GET_DATA)

  const week = getWeek(filter.date)

  return (
    <Home>
      <Column align="end" justify="center">
        <Heading>
          Track my weight
          <AddButton />
        </Heading>
        <Grid columns={7} gap={2}>
          {week.map(day => {
            const entry = weights.find(
              ({ date }) => dayjs(date).format('YYYY-MM-DD') === day.format('YYYY-MM-DD'),
            )
            return (
              <Column key={day.format('YYYY-MM-DD')}>
                <Day padding={2}>
                  <Heading as="h2" fontSize={2}>
                    {day.format('ddd')}
                  </Heading>
                  <Heading as="h2" fontSize={2}>
                    {day.format('DD')}
                  </Heading>
                  {entry ? <Heading fontSize={3}>{entry.weight} kg</Heading> : <Text>No data</Text>}
                </Day>
              </Column>
            )
          })}
        </Grid>
      </Column>
      <Column align="end">
        <AreaChart data={weights} />
      </Column>
    </Home>
  )
}
