import React, { Fragment } from "react"
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom"
import styled from "styled-components"
import DashPageHeader from "../../components/ui/dashPageHeader"
import SubNavBar from "../../components/ui/subNavbar"
import PageNotFound from "../404"
import Memberships from "./memberships"
import Payments from "./payments"
import Profile from "./profile"
import { Helmet } from "react-helmet"

const MyAccount = () => {
  const { path, url } = useRouteMatch()

  return (
    <Fragment>
      <Helmet>
        <title>My Account - Career Mango App</title>
        <meta name="description" content="Career Mango Account Page" />
      </Helmet>
      <DashPageHeader name="Setting" title="My Account"></DashPageHeader>

      <SubNavBar>
        <SubNavBar.Link>
          <NavLink exact to={`${url}`}>
            Profile
          </NavLink>
        </SubNavBar.Link>
        <SubNavBar.Link>
          <NavLink to={`${url}/membership`}>Membership </NavLink>
        </SubNavBar.Link>
        <SubNavBar.Link>
          <NavLink to={`${url}/payments`}>Payment History </NavLink>
        </SubNavBar.Link>
      </SubNavBar>
      <SubLayout>
        <Switch>
          <Route exact path={path} component={Profile} />
          <Route exact path={`${path}/membership`} component={Memberships} />
          <Route exact path={`${path}/payments`} component={Payments} />
          <Route exact component={PageNotFound} />
        </Switch>
      </SubLayout>
    </Fragment>
  )
}

export default MyAccount

const SubLayout = styled.div`
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (max-width: 480px) {
    margin: 1.5rem 1rem;
  }
`
