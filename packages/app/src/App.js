import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from '@1e3/ui'

import client from './client'
import Router from './Router'
import GlobalStyle from './components/GlobalStyle'
import Layout from './components/Layout'

const App = () => {
  const theme = { colors: { primary: '#ef4b4b' } }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Router />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
