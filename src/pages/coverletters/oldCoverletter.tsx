import { Fragment } from 'react'
import CoverLetterProvider from '../../contexts/coverLetter'
import { getCoverLetter } from '../../queries/coverLetterQueries'
import CoverLetterBuilder from './builder'
import TemplateViewer from './template-viewer'

const OldCoverLetter = ({
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
  }: any = getCoverLetter(id, width > 768)

  return (
    <Fragment>
      {isError ? (
        <div className="align-center" style={{ height: '30vh' }}>
          <h3>Failed to load design!</h3>
        </div>
      ) : (
        <CoverLetterProvider
          initialData={initialData}
          templateName={'template1'}
        >
          {type === 'preview' ? (
            <TemplateViewer isLoading={isLoading} />
          ) : type === 'edit' ? (
            <CoverLetterBuilder isLoading={isLoading} />
          ) : null}
        </CoverLetterProvider>
      )}
    </Fragment>
  )
}
export default OldCoverLetter
