import React from "react"
import { Helmet } from "react-helmet"

const AccessDenied = () => {
  return (
    <div className="align-center">
      <Helmet>
        <title>Access Denied - Career Mango App</title>
        <meta name="description" content="Career Mango Access Denied Page" />
      </Helmet>
      <div>
        <h3 className="text-center">Access Denied</h3>
      </div>
    </div>
  )
}

export default AccessDenied
