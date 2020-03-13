import { ApolloServer, gql } from 'apollo-server-lambda'
import { GraphQLDateTime } from 'graphql-iso-date'

import { weightType } from './types'
import { weights, createWeight } from './resolvers'
import connectDb from './utils/connectDb'

const typeDefs = gql`
  scalar DateTime

  ${weightType}

  enum FilterBy {
    day
    week
    month
  }

  input Filter {
    date: DateTime!
    by: FilterBy
  }

  type Query {
    weights(filter: Filter): [Weight]!
  }

  type Mutation {
    createWeight(input: WeightInput): Weight!
  }
`

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    weights,
  },
  Mutation: {
    createWeight,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    await connectDb()
    return null
  },
})

export const handler = server.createHandler()
