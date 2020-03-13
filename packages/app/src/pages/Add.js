import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Controller, useForm } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { Box, Button, Column, Grid, Heading } from '@1e3/ui'

import KgInput from '../components/KgInput'

const CREATE_WEIGHT = gql`
  mutation($input: WeightInput) {
    createWeight(input: $input) {
      id
    }
  }
`

const Wrapper = styled(Box)(
  () => css`
    color: white;
  `,
)

export default () => {
  const history = useHistory()
  const { control, errors, handleSubmit } = useForm()
  const [createWeight, { data }] = useMutation(CREATE_WEIGHT)

  const onSubmit = values => {
    createWeight({
      variables: {
        input: {
          date: new Date().toISOString(),
          weight: values.weight / 10,
        },
      },
    })
  }

  if (data && data.createWeight.id) history.push('/')

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gap={2}>
          <Column>
            <Heading>Add new entry</Heading>
          </Column>
          <Column>
            <Controller
              as={<KgInput hint={errors.weight && errors.weight.message} />}
              control={control}
              name="weight"
              rules={{ validate: value => Number(value) > 0 || 'Weight is required' }}
              defaultValue={0}
            />
          </Column>
          <Column>
            <Button full inverted type="submit">
              Save
            </Button>
          </Column>
        </Grid>
      </form>
    </Wrapper>
  )
}
