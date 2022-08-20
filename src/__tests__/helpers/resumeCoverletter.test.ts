import {
  handleResumeCoverLetterDelete,
  handleResumeCoverLetterDownload,
} from '../../helpers/resumeCoverLetter'
import * as resumeApis from '../../apis/resume'
import * as coverletterApies from '../../apis/coverLetter'

describe('Resume / Coverletter Download helper', () => {
  window.URL.createObjectURL = jest.fn()

  const downloadResumeSpy = jest.spyOn(resumeApis, 'downloadResume')
  const downloadCoverletterSpy = jest.spyOn(
    coverletterApies,
    'downloadCoverLetter'
  )

  const id = 'abc'
  const type = 'pdf'
  const setLoading = (val: any) => val
  const setShowDownload = (val: any) => val

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test('Other resume / coverletter in loading state', async () => {
    const show = 'resume'
    const loading = 'efg'
    const result = await handleResumeCoverLetterDownload(
      id,
      type,
      loading,
      setLoading,
      show,
      setShowDownload
    )
    expect(result).toBeFalsy()
  })

  test('Fails to download', async () => {
    downloadResumeSpy.mockRejectedValue(new Error('failed to download'))
    const show = 'resume'
    const loading = null
    const result = await handleResumeCoverLetterDownload(
      id,
      type,
      loading,
      setLoading,
      show,
      setShowDownload
    )
    expect(result).toBeFalsy()
  })

  test('Successfully download resume', async () => {
    downloadResumeSpy.mockReturnValue({
      data: Buffer.from([215, 255, 215]),
    } as any)

    const show = 'resume'
    const loading = null
    const result = await handleResumeCoverLetterDownload(
      id,
      type,
      loading,
      setLoading,
      show,
      setShowDownload
    )
    expect(result).toBeTruthy()
  })

  test('Successfully download coverletter', async () => {
    downloadCoverletterSpy.mockReturnValue({
      data: Buffer.from([215, 255, 215]),
    } as any)

    const show = 'coverletter'
    const loading = null
    const result = await handleResumeCoverLetterDownload(
      id,
      type,
      loading,
      setLoading,
      show,
      setShowDownload
    )
    expect(result).toBeTruthy()
  })
})

describe('Resume / Coverletter Delete helper', () => {
  const resumeDeleteSpy = jest.spyOn(resumeApis, 'deleteResume')
  const coverletterDeleteSpy = jest.spyOn(coverletterApies, 'deleteCoverLetter')

  const id = 'abc'
  const data = [{ _id: 'abc' }, { _id: 'efg' }]
  const queryClient = {
    setQueryData: jest.fn(),
  } as any
  const setLoading = jest.fn()
  const setDeleteItemId = jest.fn()
  const setNotify = jest.fn()

  test('Other resume / coverletter in loading state', async () => {
    const show = 'resume'
    const loading = 'efg'
    const result = await handleResumeCoverLetterDelete(
      id,
      data,
      queryClient,
      loading,
      setLoading,
      show,
      setDeleteItemId,
      setNotify
    )
    expect(result).toBeFalsy()
  })

  test('Succesfully deletes resume', async () => {
    const show = 'resume'
    const loading = null

    resumeDeleteSpy.mockReturnValue({ data: 'success' } as any)

    const result = await handleResumeCoverLetterDelete(
      id,
      data,
      queryClient,
      loading,
      setLoading,
      show,
      setDeleteItemId,
      setNotify
    )
    expect(result).toBeTruthy()
  })

  test('Succesfully deletes coverletter', async () => {
    const show = 'coverletter'
    const loading = null

    coverletterDeleteSpy.mockReturnValue({ data: 'success' } as any)

    const result = await handleResumeCoverLetterDelete(
      id,
      data,
      queryClient,
      loading,
      setLoading,
      show,
      setDeleteItemId,
      setNotify
    )
    expect(result).toBeTruthy()
  })

  test('Fails to delete coverletter', async () => {
    const show = 'coverletter'
    const loading = null

    coverletterDeleteSpy.mockReturnValue({
      data: undefined,
      error: 'failed to delete coverletter',
    } as any)

    const result = await handleResumeCoverLetterDelete(
      id,
      data,
      queryClient,
      loading,
      setLoading,
      show,
      setDeleteItemId,
      setNotify
    )
    expect(result).toBeFalsy()
  })
  test('Fails to delete resume', async () => {
    const show = 'resume'
    const loading = null

    resumeDeleteSpy.mockReturnValue({
      data: undefined,
      error: 'failed to delete resume',
    } as any)

    const result = await handleResumeCoverLetterDelete(
      id,
      data,
      queryClient,
      loading,
      setLoading,
      show,
      setDeleteItemId,
      setNotify
    )
    expect(result).toBeFalsy()
  })
})
