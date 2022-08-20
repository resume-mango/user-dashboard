import {
  deleteCoverLetter,
  downloadCoverLetter,
  newCoverLetter,
  updateCoverLetter,
} from '../../apis/coverLetter'
import * as axiosRequest from '../../helpers/axiosRequest'
import axios from 'axios'

describe('Download Coverletter', () => {
  //   const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const requestSpy = jest.spyOn(mockedAxios, 'request')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const id = 'abc'
  const type = 'pdf'

  const options = {
    method: 'GET',
    url: `/coverletter/download/${id}/${type}`,
    responseType: 'blob',
  }

  test('Fails to download coverletter', async () => {
    requestSpy.mockRejectedValue(new Error('Failed to download coverletter'))
    const result = await downloadCoverLetter(id, type)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(requestSpy).toHaveBeenCalledWith(options)
    expect(result).toBeNull()
  })

  test('Successfully creates new coverletter', async () => {
    requestSpy.mockResolvedValue('Blob')
    const result = await downloadCoverLetter(id, type)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result).toBe('Blob')
  })
})

describe('Create New Coverletter', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const templateName = 'abc'

  const options = {
    method: 'POST',
    url: '/coverletter',
    data: { template: templateName },
  }

  test('Fails to create new coverletter', async () => {
    axiosRequestSpy.mockRejectedValue(new Error('Failed to create coverletter'))

    const result = await newCoverLetter(templateName)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to create coverletter')
  })

  test('Successfully creates new coverletter', async () => {
    axiosRequestSpy.mockResolvedValue({
      data: 'coverletter obj',
      error: undefined,
    })
    const result = await newCoverLetter(templateName)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('coverletter obj')
    expect(result.error).toBeUndefined()
  })
})

describe('Update Coverletter', () => {
  //   const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const requestSpy = jest.spyOn(mockedAxios, 'request')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const templateName = 'abc'

  test('Fails to update coverletter', async () => {
    requestSpy.mockRejectedValue(new Error('Failed to update coverletter'))
    const result = await updateCoverLetter(templateName)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to update coverletter')
  })

  test('Successfully creates new coverletter', async () => {
    requestSpy.mockResolvedValue({
      data: 'coverletter obj',
      error: undefined,
    })
    const result = await updateCoverLetter(templateName)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result.data).toBe('coverletter obj')
    expect(result.error).toBeUndefined()
  })
})

describe('Delete Coverletter', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const id = 'abc'

  const options = {
    method: 'DELETE',
    url: `/coverletter/${id}`,
  }

  test('Fails to delete coverletter', async () => {
    axiosRequestSpy.mockRejectedValue(new Error('Failed to delete coverletter'))

    const result = await deleteCoverLetter(id)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to delete coverletter')
  })

  test('Successfully deletes coverletter', async () => {
    axiosRequestSpy.mockResolvedValue({
      data: 'coverletter obj',
      error: undefined,
    })
    const result = await deleteCoverLetter(id)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('coverletter obj')
    expect(result.error).toBeUndefined()
  })
})
