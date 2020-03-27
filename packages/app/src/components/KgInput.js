/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useCallback } from 'react'
import { func, number } from 'prop-types'
import styled from 'styled-components'
import { Column, Grid, Input } from '@1e3/ui'

const VALID_FIRST = /^[1-9]{1}$/
const VALID_NEXT = /^[0-9]{1}$/
const DELETE_KEY_CODE = 8

const StyledKgInput = styled(Grid)`
  align-items: center;

  input {
    text-align: center;
  }
`

const KgInput = forwardRef(({ max, onChange, value, ...props }, ref) => {
  const valueAbsTrunc = Math.trunc(Math.abs(value))
  if (value !== valueAbsTrunc || !Number.isFinite(value) || Number.isNaN(value)) {
    throw new Error('invalid value property')
  }
  const handleKeyDown = useCallback(
    e => {
      const { key, keyCode } = e
      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
      ) {
        return
      }
      const valueString = value.toString()
      let nextValue
      if (keyCode !== DELETE_KEY_CODE) {
        const nextValueString = value === 0 ? key : `${valueString}${key}`
        nextValue = Number.parseInt(nextValueString, 10)
      } else {
        const nextValueString = valueString.slice(0, -1)
        nextValue = nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10)
      }
      if (nextValue > max) {
        return
      }
      onChange(nextValue)
    },
    [max, onChange, value],
  )

  const handleChange = useCallback(() => {}, [])
  const valueDisplay = (value / 10).toLocaleString(undefined, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
    style: 'decimal',
  })

  return (
    <StyledKgInput columns="1fr auto" gap={2}>
      <Column>
        <Input
          inverted
          inputMode="numeric"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={ref}
          value={valueDisplay}
          {...props}
        />
      </Column>
      <Column>Kg</Column>
    </StyledKgInput>
  )
})

KgInput.propTypes = {
  max: number,
  onChange: func,
  value: number,
}

KgInput.defaultProps = {
  max: Number.MAX_SAFE_INTEGER,
  onChange: () => {},
  value: 0,
}

export default KgInput
