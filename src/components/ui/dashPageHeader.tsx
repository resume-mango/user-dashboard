import React, { Fragment, ReactElement, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../contexts/authProvider'
import { useViewport } from '../../contexts/viewPort'
import { Button } from '../../styled/button'

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
      <Header>
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
                user.role.includes('standard') ? (
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
      </Header>
    </Fragment>
  )
}

export default DashPageHeader

const Header = styled.header`
  min-height: 175px;
  max-height: 175px;
  width: 100%;
  height: 100%;
  display: flex;
  border-bottom: 1px solid #e2e9f3;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  h1 {
    margin-bottom: 0;
    span {
      font-weight: normal;
    }
  }
  div:last-child {
    display: flex;
    button {
      margin: 0 1rem;
    }
  }
  @media (max-width: 768px) {
    div:last-child {
      flex-direction: column;
    }
  }
  @media (max-width: 480px) {
    max-height: 100px;
    min-height: 100px;
    h1 {
      margin: 0;
    }
    div:last-child {
      display: block;
      width: 100%;
    }
  }
`
