import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import useWeightLoader from './hooks/useWeightLoader'
import { Add, Home } from './pages'
import Error from './components/Error'
import Loader from './components/Loader'

export default () => {
  const { loading, error } = useWeightLoader()

  if (loading) return <Loader />
  if (error) return <Error />

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/add">
          <Add />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
