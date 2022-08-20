import React, { Fragment, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../../styled/button'
import { Spinner } from '../../styled/loader'
import { createNewCoverletter } from '../../helpers/coverletter'

const NewCoverLetter = ({ templateName }: { templateName: string }) => {
  const [error, setError] = useState(false)
  const history = useHistory()

  const queryClient = useQueryClient()

  // const createNew = async () => {
  //   setError(false)
  //   const { data, error } = await newCoverLetter(templateName)
  //   if (data) {
  //     queryClient.setQueryData(['coverletter', data._id], data)
  //     history.replace(`/coverletters/edit/${data._id}`)
  //   }
  //   if (error) setError(true)
  // }

  const createNew = async () => {
    setError(false)
    const result = await createNewCoverletter(
      templateName,
      history,
      queryClient
    )
    if (!result) setError(true)
    return
  }

  useEffect(() => {
    createNew()
  }, [])

  return (
    <Fragment>
      <div className="flex-center h-100">
        {error ? (
          <ErrWrapper>
            <h2>Failed to create coverletter.</h2>
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

export default NewCoverLetter

const ErrWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
