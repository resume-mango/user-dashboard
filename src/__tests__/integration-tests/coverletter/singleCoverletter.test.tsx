import { render, RenderResult, waitFor } from '@testing-library/react'
import SingleCoverLetter from '../../../pages/coverletters'
import TestingWrapper from '../../../__mocks__/TestingWrapper'
import dom from 'react-router'
import { act } from 'react-dom/test-utils'
import * as NewCoverLetter from '../../../pages/coverletters/createNew'
import * as OldCoverLetter from '../../../pages/coverletters/oldCoverletter'

describe('<SingleCoverLetter/>', () => {
  const useParamsSpy = jest.spyOn(dom, 'useParams')
  // const viewportSpy = jest.spyOn(viewport, 'useViewport')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  const Wrapper = (
    <TestingWrapper>
      <SingleCoverLetter />
    </TestingWrapper>
  )

  test('Should Render <PageNotFound />', async () => {
    const { getByText } = render(Wrapper)
    expect(getByText('This page could not be found')).toBeInTheDocument()
  })

  test('Should Render <NewCoverLetter />', async () => {
    const NewCoverLetterSpy = jest
      .spyOn(NewCoverLetter, 'default')
      .mockReturnValue(null as any)

    const id = 'abc'
    useParamsSpy.mockReturnValue({ id, type: 'new' })

    let screen: any
    act(() => {
      screen = render(Wrapper) as RenderResult
    })

    if (!screen) throw new Error('Failed to load screen')
    await waitFor(() => {
      expect(
        screen.container.getElementsByClassName('loading-spinner')[0]
      ).toBeFalsy()
    })
    expect(NewCoverLetterSpy).toHaveBeenCalledWith({ templateName: id }, {})
  })
  test('Should Render <OldCoverletter />', async () => {
    const oldCoverletterSpy = jest
      .spyOn(OldCoverLetter, 'default')
      .mockReturnValue(null as any)

    const id = 'abc'
    useParamsSpy.mockReturnValue({ id, type: 'edit' })

    let screen: any
    act(() => {
      screen = render(Wrapper) as RenderResult
    })

    if (!screen) throw new Error('Failed to load screen')
    await waitFor(() => {
      expect(
        screen.container.getElementsByClassName('loading-spinner')[0]
      ).toBeFalsy()
    })
    expect(oldCoverletterSpy).toHaveBeenCalledWith(
      { id, type: 'edit', width: 1024 },
      {}
    )
  })
})
