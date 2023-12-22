import React, { Fragment } from "react"
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom"
import DashPageHeader from "../../../components/ui/dashPageHeader"
import SubNavBar from "../../../components/ui/subNavbar"
import PageNotFound from "../../404"
import ResumeTemplates from "./templates"
import MyDesigns from "./my-designs"
import { Helmet } from "react-helmet"

const ResumeDashboard = () => {
  const { path, url } = useRouteMatch()

  return (
    <Fragment>
      <Helmet>
        <title>Resume List - Career Mango App</title>
        <meta name="description" content="Career Mango Resume List Page" />
      </Helmet>
      <DashPageHeader title="Resume Templates"></DashPageHeader>
      <SubNavBar>
        <SubNavBar.Link>
          <NavLink exact to={`${url}`}>
            My Designs
          </NavLink>
        </SubNavBar.Link>
        <SubNavBar.Link>
          <NavLink to={`${url}/templates/all`}>All Templates </NavLink>
        </SubNavBar.Link>
        <SubNavBar.Link>
          <NavLink to={`${url}/templates/image`}>With image</NavLink>
        </SubNavBar.Link>
        <SubNavBar.Link>
          <NavLink to={`${url}/templates/noimage`}>Without image</NavLink>
        </SubNavBar.Link>
      </SubNavBar>

      <Switch>
        <Route exact path={path} component={MyDesigns} />

        <Route
          exact
          path={`${path}/templates/:type`}
          component={ResumeTemplates}
        />

        <Route component={PageNotFound} />
      </Switch>
    </Fragment>
  )
}

export default ResumeDashboard
