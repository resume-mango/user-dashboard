import { fireEvent, render } from '@testing-library/react'
import ResumeCoverLetter from '../../pages/homepage/resumeCoverLetter'
import TestingWrapper from '../../__mocks__/TestingWrapper'
import * as resumeQueries from '../../queries/resumeQueries'
import * as coverQueries from '../../queries/coverLetterQueries'
import { resumesData } from '../../__mocks__/resumes'
import { coverLetterData } from '../../__mocks__/coverletters'
import * as helpers from '../../helpers/resumeCoverLetter'

describe('<ResumeCoverLetter/>', () => {
  const getAllResumesSpy = jest.spyOn(resumeQueries, 'getAllResumes')
  const getAllCoverLettersSpy = jest.spyOn(coverQueries, 'getAllCoverLetters')
  const handleDownloadSpy = jest.spyOn(
    helpers,
    'handleResumeCoverLetterDownload'
  )
  const handleDeleteSpy = jest.spyOn(helpers, 'handleResumeCoverLetterDelete')

  handleDeleteSpy.mockResolvedValueOnce(true)
  handleDownloadSpy.mockResolvedValueOnce(true)

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  const Wrapper = (
    <TestingWrapper>
      <ResumeCoverLetter />
    </TestingWrapper>
  )

  test('Succesfully renders free user UI', () => {
    getAllResumesSpy.mockReturnValue({
      data: { items: resumesData },
      isLoading: false,
      isError: false,
    } as any)

    getAllCoverLettersSpy.mockReturnValue({
      data: { items: coverLetterData },
      isLoading: false,
      isError: false,
    } as any)
    const { getByText, queryByText } = render(
      <TestingWrapper>
        <ResumeCoverLetter freeUser />
      </TestingWrapper>
    )
    const resumeBtn = queryByText('My Resume') as Element
    const coverBtn = queryByText('Cover Letter') as Element
    expect(resumeBtn).toBeInTheDocument()
    expect(coverBtn).toBeInTheDocument()

    const createBtn = getByText(/Create/i)
    expect(createBtn).toBeInTheDocument()
    expect(createBtn.textContent).toBe('Create Resume')

    fireEvent.click(coverBtn)
    expect(createBtn.textContent).toBe('Create Coverletter')
    expect(createBtn).toBeInTheDocument()
  })

  test('Successfully renders ResumeCoverLetter', () => {
    getAllResumesSpy.mockReturnValue({
      data: { items: resumesData },
      isLoading: false,
      isError: false,
    } as any)

    getAllCoverLettersSpy.mockReturnValue({
      data: { items: coverLetterData },
      isLoading: false,
      isError: false,
    } as any)
    const { getByText, queryByText, container } = render(Wrapper)
    const resumeBtn = queryByText('My Resume') as Element
    const coverBtn = queryByText('Cover Letter') as Element
    expect(resumeBtn).toBeInTheDocument()
    expect(coverBtn).toBeInTheDocument()

    const downloadBtn = container?.querySelector('.toggle-download') as Element

    const deleteBtn = container?.querySelector('.toggle-delete') as Element

    fireEvent.click(downloadBtn)

    const downloadOverLay = container.querySelector(
      '.download-overlay'
    ) as Element

    expect(downloadOverLay.classList.contains('isVisible')).toBeTruthy()

    const pdfBtn = downloadOverLay.getElementsByClassName('pdf-icon')[0]
    fireEvent.click(pdfBtn)

    fireEvent.click(downloadBtn)
    const docxBtn = downloadOverLay.getElementsByClassName('docx-icon')[0]
    fireEvent.click(docxBtn)

    fireEvent.click(downloadBtn)
    const txtBtn = downloadOverLay.getElementsByClassName('txt-icon')[0]
    fireEvent.click(txtBtn)

    expect(handleDownloadSpy).toHaveBeenCalledTimes(1)

    fireEvent.click(deleteBtn)
    const confirmationBox =
      container.getElementsByClassName('confirmation-box')[0]
    expect(confirmationBox).toBeInTheDocument()
    const cancelDeleteBtn = confirmationBox.getElementsByTagName('button')[0]
    fireEvent.click(cancelDeleteBtn)
    expect(confirmationBox).not.toBeInTheDocument()
    fireEvent.click(deleteBtn)

    const confBox = container.getElementsByClassName('confirmation-box')[0]
    const confirmDeleteBtn = confBox.getElementsByTagName('button')[1]

    fireEvent.click(confirmDeleteBtn)

    expect(handleDeleteSpy).toHaveBeenCalledTimes(1)

    const editBtn = container?.querySelector('.toggle-edit') as Element
    expect(editBtn).toBeInTheDocument()

    fireEvent.click(editBtn)
    const createBtn = getByText(/Create/i)
    expect(createBtn).toBeInTheDocument()
    expect(createBtn.textContent).toBe('Create Resume')

    fireEvent.click(coverBtn)
    expect(createBtn.textContent).toBe('Create Coverletter')
    fireEvent.click(resumeBtn)
    expect(createBtn.textContent).toBe('Create Resume')
  })
  test('Failed render ResumeCoverLetter', () => {
    getAllResumesSpy.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as any)

    const { getByText } = render(Wrapper)
    const error = getByText(/Failed/i)
    expect(error.textContent).toBe('Failed to load designs!')
  })

  test('Renders loading screen', () => {
    getAllResumesSpy.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any)

    const { container } = render(Wrapper)
    const loader = container.getElementsByClassName('loader-wrapper')[0]
    expect(loader).toBeInTheDocument()
  })
})
