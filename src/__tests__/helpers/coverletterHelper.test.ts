import * as coverletterHelper from '../../helpers/coverletter'
import * as coverletterApis from '../../apis/coverLetter'

describe('Coveletter Download', () => {
  const name = 'abc'
  const type = 'pdf'
  const id = '123'
  const setNotify = jest.fn()

  const downloadCoverLetterSpy = jest.spyOn(
    coverletterApis,
    'downloadCoverLetter'
  )
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Fails to download coveletter', async () => {
    downloadCoverLetterSpy.mockResolvedValue(undefined as any)
    const result = await coverletterHelper.handleCoverletterDownload(
      name,
      id,
      type,
      setNotify
    )
    expect(setNotify).toBeCalledWith({
      heading: 'Err!',
      message: 'Failed to donwload design',
      type: 'danger',
    })
    expect(result).toBeUndefined()
  })
  test('Succesfully download coveletter', async () => {
    Object.defineProperty(window.URL, 'createObjectURL', {
      value: jest.fn(),
    })
    Object.defineProperty(window.URL, 'revokeObjectURL', {
      value: jest.fn(),
    })
    downloadCoverLetterSpy.mockResolvedValue({ data: ['dummy'] } as any)
    const result = await coverletterHelper.handleCoverletterDownload(
      name,
      id,
      type,
      setNotify
    )
    expect(window.URL.createObjectURL).toBeCalledWith(new Blob(['dummy']))
    expect(window.URL.revokeObjectURL).toBeCalledWith(
      window.URL.createObjectURL(new Blob(['dummy']))
    )
    expect(result).toBeUndefined()
  })
})

// describe('Coverletter helpers', () => {
//   beforeEach(() => {
//     jest.resetAllMocks()
//     jest.clearAllMocks()
//   })

describe('Creates Coverletter', () => {
  const queryClient = { setQueryData: jest.fn() } as any

  const newCoverLetterSpy = jest.spyOn(coverletterApis, 'newCoverLetter')
  const templateName = 'template-1'
  const history = {
    replace: jest.fn(),
  }

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test('Fails to create new coverletter', async () => {
    newCoverLetterSpy.mockResolvedValueOnce({
      data: undefined,
      error: 'Some Error',
    })
    const result = await coverletterHelper.createNewCoverletter(
      templateName,
      history,
      queryClient
    )
    expect(newCoverLetterSpy).toHaveBeenCalledTimes(1)
    expect(newCoverLetterSpy).toHaveBeenCalledWith(templateName)
    expect(result).toBeFalsy()
  })

  test('Successfully creates new coverletter', async () => {
    newCoverLetterSpy.mockResolvedValueOnce({
      data: 'Success',
      error: undefined,
    } as any)
    const result = await coverletterHelper.createNewCoverletter(
      templateName,
      history,
      queryClient
    )
    expect(newCoverLetterSpy).toHaveBeenCalledTimes(1)
    expect(newCoverLetterSpy).toHaveBeenCalledWith(templateName)
    expect(result).toBeTruthy()
  })
})

describe('Deletes Single Coveletter', () => {
  const queryClient = { setQueryData: jest.fn() } as any

  const deleteCoverLetterSpy = jest.spyOn(coverletterApis, 'deleteCoverLetter')

  afterEach(() => {
    jest.clearAllMocks()
  })

  const id = 'abc'
  const data = { items: [{ _id: 'dummy' }, { _id: 'abc' }] }
  const loading = null
  const setLoading = jest.fn()
  const setDeleteItemId = jest.fn()
  const setNotify = jest.fn()

  test('Should return due to loading state is true', async () => {
    await coverletterHelper.deleteSingleCoverletter(
      id,
      data,
      'efg Loadiing',
      setLoading,
      setDeleteItemId,
      setNotify,
      queryClient
    )
    expect(setLoading).not.toBeCalled()
    expect(deleteCoverLetterSpy).not.toBeCalled()
  })
  test('Should fail to delete coveletter', async () => {
    deleteCoverLetterSpy.mockResolvedValue({ data: undefined, error: 'Err' })
    await coverletterHelper.deleteSingleCoverletter(
      id,
      data,
      loading,
      setLoading,
      setDeleteItemId,
      setNotify,
      queryClient
    )
    expect(setNotify).toBeCalledWith({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete coverletter',
    })
    expect(deleteCoverLetterSpy).toBeCalled()
  })

  test('Should successfully delete coveletter', async () => {
    deleteCoverLetterSpy.mockResolvedValue({
      data: { _id: '123', title: 'abc' },
      error: undefined,
    } as any)
    await coverletterHelper.deleteSingleCoverletter(
      id,
      data,
      loading,
      setLoading,
      setDeleteItemId,
      setNotify,
      queryClient
    )

    expect(deleteCoverLetterSpy).toBeCalled()
    expect(queryClient.setQueryData).toBeCalled()
  })
})

describe('Handles coverletter submit', () => {
  const template = 'template-1'
  const type = 'pdf'
  const initialData = 'dummy-data'
  const coverletterData = 'dummy-data'
  const watch = jest.fn()
  const reset = jest.fn()
  const setSubmitSuccess = jest.fn()
  const setNotify = jest.fn()
  const queryClient = {
    setQueryData: jest.fn(),
    getQueryData: jest.fn(),
  } as any

  const updayeCoveletterSpy = jest.spyOn(coverletterApis, 'updateCoverLetter')
  const handleCoverletterDownloadSpy = jest.spyOn(
    coverletterHelper,
    'handleCoverletterDownload'
  )
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should fail because no data was provided', async () => {
    const result = await coverletterHelper.submitCoveletterForm(
      template,
      type,
      initialData,
      undefined,
      watch,
      reset,
      setSubmitSuccess,
      setNotify,
      queryClient
    )
    expect(result).toBeFalsy()
    expect(updayeCoveletterSpy).not.toBeCalled()
  })

  test('should fail to update coverletter', async () => {
    updayeCoveletterSpy.mockResolvedValue({ data: undefined, error: 'Err' })
    const result = await coverletterHelper.submitCoveletterForm(
      template,
      type,
      initialData,
      coverletterData,
      watch,
      reset,
      setSubmitSuccess,
      setNotify,
      queryClient
    )
    expect(result).toBeFalsy()
    expect(updayeCoveletterSpy).toBeCalledTimes(1)
    expect(setNotify).toBeCalledWith({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to update design',
    })
  })
  test('should successfully update coverletter', async () => {
    updayeCoveletterSpy.mockResolvedValue({
      data: { _id: 'abc', title: 'abc' },
      error: undefined,
    })
    queryClient.getQueryData.mockReturnValue([{ _id: 'abc' }, { _id: 'efg' }])
    const result = await coverletterHelper.submitCoveletterForm(
      template,
      type,
      initialData,
      coverletterData,
      watch,
      reset,
      setSubmitSuccess,
      setNotify,
      queryClient
    )
    expect(result).toBeTruthy()
    expect(updayeCoveletterSpy).toBeCalledTimes(1)
    expect(queryClient.getQueryData).toBeCalledTimes(1)
    expect(queryClient.setQueryData).toBeCalledTimes(2)
    expect(reset).toBeCalledTimes(1)
    expect(watch).toBeCalledTimes(1)

    expect(handleCoverletterDownloadSpy).toBeCalledTimes(1)
  })
  test('should successfully create coverletter', async () => {
    updayeCoveletterSpy.mockResolvedValue({
      data: { _id: 'xyz', title: 'abc' },
      error: undefined,
    })
    queryClient.getQueryData.mockReturnValue([{ _id: 'abc' }, { _id: 'efg' }])
    const result = await coverletterHelper.submitCoveletterForm(
      template,
      type,
      initialData,
      coverletterData,
      watch,
      reset,
      setSubmitSuccess,
      setNotify,
      queryClient
    )
    expect(result).toBeTruthy()
    expect(updayeCoveletterSpy).toBeCalledTimes(1)
    expect(queryClient.getQueryData).toBeCalledTimes(1)
    expect(queryClient.setQueryData).toBeCalledTimes(2)
    expect(reset).toBeCalledTimes(1)
    expect(watch).toBeCalledTimes(1)

    expect(handleCoverletterDownloadSpy).toBeCalledTimes(1)
  })
})
// })
