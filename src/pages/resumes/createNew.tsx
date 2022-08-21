import React, { Fragment, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { newResume } from '../../apis/resume'
import { Button } from '../../styled/button'
import { Spinner } from '../../styled/loader'

const NewResume = ({ templateName }: { templateName: string }) => {
  const [error, setError] = useState(false)
  const history = useHistory()

  const queryClient = useQueryClient()

  const createNew = async () => {
    setError(false)
    const { data, error } = await newResume(templateName)
    if (data) {
      queryClient.setQueryData(['resume', data._id], data)
      history.replace(`/resumes/edit/${data._id}`)
    }
    if (error) setError(true)
  }

  useEffect(() => {
    createNew()
  }, [])

  return (
    <Fragment>
      <div className="flex-center h-100">
        {error ? (
          <ErrWrapper>
            <h2>Failed to create resume.</h2>
            <Button btnType="primary" size="lg" onClick={() => createNew()}>
              Try Again
            </Button>
          </ErrWrapper>
        ) : (
          <Spinner size="2.5rem" type="primary" />
        )}
      </div>
    </Fragment>
  )
}

export default NewResume

const ErrWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
