import React, { Fragment, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { apiCallbackSubscription } from '../../apis/subscribe'
import WarningIcon from '../../components/svgs/warning'
import { useAuth } from '../../contexts/authProvider'
import getUrlParams from '../../hooks/getUrlParams'
import { Button } from '../../styled/button'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'

const SubscribeCallback = () => {
  const [error, setError] = useState(false)
  const { setToken } = useAuth()
  const history = useHistory()
  const query = getUrlParams()
  const session_id = query.get('session_id')
  const type = query.get('type') as any
  const queryClient = useQueryClient()

  const handleCallback = async () => {
    if (session_id && type) {
      const { data, error } = await apiCallbackSubscription(session_id, type)
      if (data && !error) {
        queryClient.setQueryData('activeSubscription', data)
        setToken('')
        history.push('/my-account/membership')
      } else {
        setError(true)
      }
    }
  }

  useEffect(() => {
    if (type === 'cancel' || type === 'success') handleCallback()
    return
  }, [])

  return (
    <Fragment>
      {error ? (
        <Wrapper>
          <Container>
            <WarningIcon size="7rem" color="#f08438" className="mb-2" />
            <h1>Error!</h1>
            <p className="mb-2"> Something went wrong...</p>
            <Button
              size="lg"
              btnType="secondary"
              onClick={() => history.push('/')}
            >
              Back to Dashboard
            </Button>
          </Container>
        </Wrapper>
      ) : (
        <LoadingWrapper>
          <Spinner type="primary" size="2rem" />
          <LoadingDots color="#f08438">Redirecting</LoadingDots>
        </LoadingWrapper>
      )}
    </Fragment>
  )
}

export default SubscribeCallback

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  width: 400px;
  min-height: 400px;
  margin: auto;
  border-radius: 6px;
  border: 1px solid #e7e7e7;
  h1 {
    margin-bottom: 0;
  }
  p {
    font-size: 1rem;
    max-width: 350px;
  }
  button {
    font-size: 1rem;
    width: 200px;
  }
`
