import React, { Fragment } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import PageNotFound from "../404"
import SubscribeCallback from "./callback"
import MainSubscribe from "./main"
import { Helmet } from "react-helmet"

const Subscribe = () => {
  const { path } = useRouteMatch()

  return (
    <Fragment>
      <Helmet>
        <title>Subscribe - Career Mango App</title>
        <meta name="description" content="Career Mango Subscribe Page" />
      </Helmet>
      <Switch>
        <Route exact path={path} component={MainSubscribe} />
        <Route path={`${path}/callback`} component={SubscribeCallback} />
        <Route component={PageNotFound} />
      </Switch>
    </Fragment>
  )
}

export default Subscribe
