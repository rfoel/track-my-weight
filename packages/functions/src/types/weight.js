import { gql } from 'apollo-server-lambda'

export default gql`
  input WeightInput {
    date: DateTime
    weight: Float
  }

  type Weight {
    id: ID
    date: DateTime
    weight: Float
  }
`
