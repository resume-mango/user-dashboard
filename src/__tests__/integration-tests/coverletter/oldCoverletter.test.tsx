import { render } from '@testing-library/react'
import * as CoverLetterBuilder from '../../../pages/coverletters/builder'
import OldCoverLetter from '../../../pages/coverletters/oldCoverletter'
import * as TemplateViewer from '../../../pages/coverletters/template-viewer'
import * as coverLetterQueries from '../../../queries/coverLetterQueries'
import TestingWrapper from '../../../__mocks__/TestingWrapper'

describe('<OldCoverLetter />', () => {
  const getCoverLetterSpy = jest.spyOn(coverLetterQueries, 'getCoverLetter')

  const TemplateViewerSpy = jest.spyOn(TemplateViewer, 'default')

  const CoverLetterBuilderSpy = jest.spyOn(CoverLetterBuilder, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  const Wrapper = (id: string, type: string, width: number) => (
    <TestingWrapper>
      <OldCoverLetter type={type} id={id} width={width} />
    </TestingWrapper>
  )

  test('Should render error screen', () => {
    getCoverLetterSpy.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    } as any)

    const { getByText } = render(Wrapper('abc', 'edit', 1024))
    const error = getByText(/Failed/i)
    expect(error.textContent).toBe('Failed to load design!')
    expect(1).toBe(1)
  })

  test('Should render <CoverLetterBuilder/>', () => {
    CoverLetterBuilderSpy.mockReturnValue(null as any)
    getCoverLetterSpy.mockReturnValue({
      data: 'abc',
      isLoading: false,
      isError: false,
    } as any)

    render(Wrapper('abc', 'edit', 1024))
    expect(CoverLetterBuilderSpy).toHaveBeenCalledWith({ isLoading: false }, {})
  })

  test('Should render <TemplateViewer/>', () => {
    TemplateViewerSpy.mockReturnValue(null as any)
    getCoverLetterSpy.mockReturnValue({
      data: 'abc',
      isLoading: false,
      isError: false,
    } as any)

    render(Wrapper('abc', 'preview', 1024))
    expect(TemplateViewerSpy).toHaveBeenCalledWith({ isLoading: false }, {})
  })
})
