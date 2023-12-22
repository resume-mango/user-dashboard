import React, { Fragment } from "react"
import DashPageHeader from "../components/ui/dashPageHeader"
import { Helmet } from "react-helmet"

const Resources = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Resources</title>
        <meta name="description" content="Career Mango Resources Page" />
      </Helmet>
      <DashPageHeader
        name="Resources"
        title="Resources than will help you"
      ></DashPageHeader>
    </Fragment>
  )
}

export default Resources
