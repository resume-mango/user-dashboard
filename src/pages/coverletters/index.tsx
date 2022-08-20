import React, { Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useViewport } from '../../contexts/viewPort'
import { Button } from '../../styled/button'
import PageNotFound from '../404'
import NewCoverLetter from './createNew'
import OldCoverLetter from './oldCoverletter'

const SingleCoverLetter = () => {
  const { id, type } = useParams<{ id: string; type: string }>()
  const { width } = useViewport()
  const history = useHistory()
  return (
    <Fragment>
      {width < 768 && width !== 0 ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '90%',
          }}
        >
          <h3 style={{ textAlign: 'center' }}>
            Builder not available, Please visit desktop site...
          </h3>
          <Button
            btnType="primary"
            size="lg"
            style={{
              width: 'fit-content',
              padding: '0 1rem',
              marginTop: '1rem',
            }}
            onClick={() => history.push('/')}
          >
            Back to Dashboard
          </Button>
        </div>
      ) : width >= 768 ? (
        <Fragment>
          {type === 'new' ? (
            <NewCoverLetter templateName={id} />
          ) : ['edit', 'preview'].indexOf(type) !== -1 ? (
            <OldCoverLetter type={type} id={id} width={width} />
          ) : (
            <PageNotFound />
          )}
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default SingleCoverLetter
