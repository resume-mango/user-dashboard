import React from "react"
import { Helmet } from "react-helmet"

const PageNotFound = () => {
  return (
    <div className="align-center">
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Career Mango Not Found Page" />
      </Helmet>
      <div>
        <h3 className="text-center">This page could not be found</h3>
      </div>
    </div>
  )
}

export default PageNotFound
