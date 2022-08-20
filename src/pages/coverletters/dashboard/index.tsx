import React, { Fragment } from 'react'
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom'
import DashPageHeader from '../../../components/ui/dashPageHeader'
import SubNavBar from '../../../components/ui/subNavbar'
import PageNotFound from '../../404'
import ResumeTemplates from './templates'
import MyDesigns from './my-designs'

const CoverLetterDashboard = () => {
  const { path, url } = useRouteMatch()

  return (
    <Fragment>
      <DashPageHeader title="Cover Letters"></DashPageHeader>
      <SubNavBar>
        <SubNavBar.Link>
          <NavLink exact to={`${url}`}>
            My Designs
          </NavLink>
        </SubNavBar.Link>
        <SubNavBar.Link>
          <NavLink to={`${url}/all-templates`}>All Templates </NavLink>
        </SubNavBar.Link>
      </SubNavBar>

      <Switch>
        <Route exact path={path} component={MyDesigns} />

        <Route
          exact
          path={`${path}/all-templates`}
          component={ResumeTemplates}
        />

        <Route component={PageNotFound} />
      </Switch>
    </Fragment>
  )
}

export default CoverLetterDashboard
