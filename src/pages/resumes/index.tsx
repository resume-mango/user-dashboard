import React, { Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ResumeProvider from '../../contexts/resume'
import { useViewport } from '../../contexts/viewPort'
import { Button } from '../../styled/button'
import { getResume } from '../../queries/resumeQueries'
import PageNotFound from '../404'
import ResumeBuilder from './builder'
import TemplateViewer from './template-viewer'
import NewResume from './createNew'

const SingleResume = () => {
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
            <NewResume templateName={id} />
          ) : ['edit', 'preview'].indexOf(type) !== -1 ? (
            <OldResume type={type} id={id} width={width} />
          ) : (
            <PageNotFound />
          )}
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default SingleResume

const OldResume = ({
  type,
  id,
  width,
}: {
  type: string
  id: string
  width: number
}) => {
  const {
    data: initialData,
    isError,
    isLoading,
  }: any = getResume(id, width > 768)

  return (
    <Fragment>
      {isError ? (
        <div className="align-center" style={{ height: '30vh' }}>
          <h3>Failed to load design!</h3>
        </div>
      ) : (
        <ResumeProvider initialData={initialData} templateName={'template1'}>
          {type === 'preview' ? (
            <TemplateViewer isLoading={isLoading} />
          ) : type === 'edit' ? (
            <ResumeBuilder isLoading={isLoading} />
          ) : null}
        </ResumeProvider>
      )}
    </Fragment>
  )
}
