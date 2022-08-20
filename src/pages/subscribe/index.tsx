import React, { Fragment } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import PageNotFound from '../404'
import SubscribeCallback from './callback'
import MainSubscribe from './main'

const Subscribe = () => {
  const { path } = useRouteMatch()

  return (
    <Fragment>
      <Switch>
        <Route exact path={path} component={MainSubscribe} />
        <Route path={`${path}/callback`} component={SubscribeCallback} />
        <Route component={PageNotFound} />
      </Switch>
    </Fragment>
  )
}

export default Subscribe
