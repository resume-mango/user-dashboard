import NewCoverLetter from '../../../pages/coverletters/createNew'
import TestingWrapper from '../../../__mocks__/TestingWrapper'
import * as helpers from '../../../helpers/coverletter'
import { fireEvent, render, waitFor } from '@testing-library/react'

describe('<NewCoverLetter/>', () => {
  const createNewCoverletterSpy = jest.spyOn(helpers, 'createNewCoverletter')

  const Wrapper = (
    <TestingWrapper>
      <NewCoverLetter templateName="template-1" />
    </TestingWrapper>
  )

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test('Should render spinner', async () => {
    createNewCoverletterSpy.mockResolvedValueOnce(true)
    const { container } = render(Wrapper)
    const spinner = container.getElementsByClassName('loading-spinner')[0]
    expect(spinner).toBeInTheDocument()
  })

  test('Should render error', async () => {
    createNewCoverletterSpy.mockResolvedValueOnce(false)

    const { getByText, container } = render(Wrapper)

    await waitFor(async () => {
      expect(
        container.getElementsByClassName('loading-spinner')[0]
      ).toBeUndefined()
      const errorTxt = getByText(/Failed/i)
      expect(errorTxt).toBeInTheDocument()
      const tryAgain = getByText('Try Again')
      expect(tryAgain).toBeInTheDocument()
      fireEvent.click(tryAgain)
      expect(
        container.getElementsByClassName('loading-spinner')[0]
      ).toBeInTheDocument()
    })
  })
})
