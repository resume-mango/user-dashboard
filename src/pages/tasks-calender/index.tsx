import dayjs from "dayjs"
import React, { Fragment } from "react"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import PageNotFound from "../404"
import Calender from "./calender"
import EventEdit from "./eventEdit"
import { Helmet } from "react-helmet"

const TaskCalender = () => {
  const { path, url } = useRouteMatch()
  const today = dayjs().format("YYYY/MM/DD")

  return (
    <Fragment>
      <Helmet>
        <title>Calendar</title>
        <meta name="description" content="Career Mango Calendar Page" />
      </Helmet>
      <Switch>
        <Redirect
          exact
          from={url || url + "/view"}
          to={{
            pathname: `${path}/view/${today}`,
          }}
        />

        <Route
          exact
          path={`${path}/view/:year?/:month?/:day?`}
          component={Calender}
        />
        <Route exact path={`${path}/event/:type`} component={EventEdit} />
        <Route component={PageNotFound} />
      </Switch>
    </Fragment>
  )
}

export default TaskCalender
