import React, { Fragment } from "react"
import DashPageHeader from "../components/ui/dashPageHeader"
import { Helmet } from "react-helmet"

const TipsTricks = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Tips & Tricks - Career Mango App</title>
        <meta name="description" content="Career Mango Tips & Tricks Page" />
      </Helmet>
      <DashPageHeader title="Tips & Tricks"></DashPageHeader>
    </Fragment>
  )
}

export default TipsTricks
