import React from 'react'
import { Route, RouteProps, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/authProvider'
import { LoadingWrapper, Spinner } from '../styled/loader'
import Alert from './ui/alert'
import UpgradePlan from './upcgradeModal'

interface Props extends RouteProps {
  role: string[]
  component: any
}

const Protected: React.FC<Props> = (props) => {
  const { user, isLoading } = useAuth()
  const history = useHistory()

  const { component, role, ...rest } = props
  return (
    <Route
      {...rest}
      render={() =>
        isLoading ? (
          <LoadingWrapper>
            <Spinner size="2.5rem" type="primary" />
          </LoadingWrapper>
        ) : !user ? (
          <Alert
            show={true}
            type="warning"
            heading="Oops"
            message="Please reload the page..."
            handleRedirect={() => history.go(0)}
          />
        ) : !user ? null : user &&
          user.role &&
          user.role.some((r: string) => role.includes(r)) ? (
          component
        ) : (
          <UpgradePlan handleClose={() => history.replace('/')} />
        )
      }
    />
  )
}

export default Protected
