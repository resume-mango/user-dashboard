import React, { Fragment, ReactElement, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../contexts/authProvider'
import { useViewport } from '../../contexts/viewPort'
import { Button } from '../../styled/button'
import { DashHeader } from '../../styled/pages'

interface ILayout {
  name?: string
  title: string | ReactElement<any, any>
  customBtns?: boolean
  children?: ReactNode
}

const DashPageHeader: React.FC<ILayout> = ({
  name,
  title,
  children,
  customBtns,
}) => {
  const { user } = useAuth()
  const history = useHistory()
  const { width } = useViewport()

  return (
    <Fragment>
      <DashHeader>
        <div>
          {name && <p>{name}</p>}
          <h1>{title}</h1>
        </div>
        {width > 800 && (
          <div>
            {!customBtns ? (
              <Fragment>
                {user &&
                user.role &&
                Array.isArray(user.role) &&
                user.role.includes('ceo') ? (
                  <Button
                    onClick={() => history.push('/resumes/new')}
                    btnType="primary"
                    size="sm"
                  >
                    Create Resume
                  </Button>
                ) : (
                  <Button
                    onClick={() => history.push('/subscribe')}
                    btnType="primary"
                    size="sm"
                  >
                    Upgrade
                  </Button>
                )}

                <Button
                  onClick={() => history.push('/progress-tracker')}
                  btnType="ghost"
                  size="sm"
                >
                  Tracker
                </Button>
              </Fragment>
            ) : (
              children
            )}
          </div>
        )}
      </DashHeader>
    </Fragment>
  )
}

export default DashPageHeader
