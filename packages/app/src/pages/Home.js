import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import styled, { css } from 'styled-components'
import ResizeObserver from 'resize-observer-polyfill'
import { Box, Column, Grid, Heading } from '@1e3/ui'

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
    min-height: 100%;
    grid-template-rows: 100px 150px 1fr;
    overflow: hidden;
    width: 100%;

    h1 {
      margin: ${scale(1)};
      text-align: center;
    }
  `,
)

const Week = styled.div(
  ({ justify }) => css`
    align-items: flex-start;
    display: flex;
    justify-content: ${justify};
    overflow-x: auto;
  `,
)

const Day = styled(Box)(
  ({
    off,
    theme: {
      colors: { primary, white },
      scale,
    },
  }) => css`
    color: ${white};
    padding: ${scale(2)};
    text-align: center;

    span {
      font-size: ${scale(2)};
    }

    h1 {
      white-space: nowrap;
    }

    ${off &&
      css`
        color: ${primary.dark};
        font-size: ${scale(1)};
      `}
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
  const ref = useRef(null)
  const {
    data: { weights, filter },
  } = useQuery(GET_DATA)
  const [start, setStart] = useState(false)

  const week = getWeek(filter.date)

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { target } = entry
      setStart(target.scrollWidth > target.clientWidth)
    })

    const element = ref.current
    observer.observe(element)
    return () => {
      observer.unobserve(element)
    }
  }, [ref])

  return (
    <Home>
      <Column align="center">
        <Heading>
          Track my weight
          <AddButton />
        </Heading>
      </Column>
      <Week justify={start ? 'flex-start' : 'center'} ref={ref}>
        {week.map(day => {
          const entry = weights.find(
            ({ date }) => dayjs(date).format('YYYY-MM-DD') === day.format('YYYY-MM-DD'),
          )
          return (
            <Day key={day.format('YYYY-MM-DD')} off={!entry}>
              <Heading fontSize={1.5}>{day.format('dd').slice(0, 1)}</Heading>
              <Heading fontSize={2}>{day.format('DD')}</Heading>
              {entry && (
                <Heading fontSize={3}>
                  {entry.weight} <span>kg</span>
                </Heading>
              )}
            </Day>
          )
        })}
      </Week>
      <Column align="end">
        <AreaChart weights={weights} week={week} />
      </Column>
    </Home>
  )
}
