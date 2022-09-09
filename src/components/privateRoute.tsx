import React from 'react'
import { Route, RouteProps, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/authProvider'
import UpgradePlan from './upcgradeModal'

interface Props extends RouteProps {
  role: string[]
  component: any
}

const Protected: React.FC<Props> = (props) => {
  const { user } = useAuth()
  const history = useHistory()
  const { component, role, ...rest } = props
  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.role && user.role.some((r: string) => role.includes(r)) ? (
          // <Component {...props} />
          component
        ) : (
          <UpgradePlan handleClose={() => history.replace('/')} />
        )
      }
    />
  )
}

export default Protected
