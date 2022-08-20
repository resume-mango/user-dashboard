import * as axiosRequest from '../../helpers/axiosRequest'
import axios from 'axios'
import {
  deletePicture,
  deleteResume,
  downloadResume,
  newResume,
  updateResume,
  uploadPicture,
} from '../../apis/resume'

describe('Download Resume', () => {
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
    url: `/resume/download/${id}/${type}`,
    responseType: 'blob',
  }

  test('Fails to download resume', async () => {
    requestSpy.mockRejectedValue(new Error('Failed to download resume'))
    const result = await downloadResume(id, type)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(requestSpy).toHaveBeenCalledWith(options)
    expect(result).toBeNull()
  })

  test('Successfully creates new resume', async () => {
    requestSpy.mockResolvedValue('Blob')
    const result = await downloadResume(id, type)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result).toBe('Blob')
  })
})

describe('Create New resume', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const templateName = 'abc'

  const options = {
    method: 'POST',
    url: '/resume',
    data: { template: templateName },
  }

  test('Fails to create new resume', async () => {
    axiosRequestSpy.mockRejectedValue(new Error('Failed to create resume'))

    const result = await newResume(templateName)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to create resume')
  })

  test('Successfully creates new resume', async () => {
    axiosRequestSpy.mockResolvedValue({
      data: 'resume obj',
      error: undefined,
    })
    const result = await newResume(templateName)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('resume obj')
    expect(result.error).toBeUndefined()
  })
})

describe('Update resume', () => {
  //   const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const requestSpy = jest.spyOn(mockedAxios, 'request')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const templateName = 'abc'

  test('Fails to update resume', async () => {
    requestSpy.mockRejectedValue(new Error('Failed to update resume'))
    const result = await updateResume(templateName)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to update resume')
  })

  test('Successfully creates new resume', async () => {
    requestSpy.mockResolvedValue({
      data: 'resume obj',
      error: undefined,
    })
    const result = await updateResume(templateName)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result.data).toBe('resume obj')
    expect(result.error).toBeUndefined()
  })
})

describe('Uploads resume picture', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const id = 'abc'
  const reqData = 'data'

  const options = {
    method: 'PATCH',
    url: `/resume/${id}/avatar`,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: reqData,
  }

  test('Fails to upload picture', async () => {
    axiosRequestSpy.mockRejectedValue(new Error('Failed to upload picture'))

    const result = await uploadPicture(id, reqData)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to upload picture')
  })

  test('Successfully uploads picture', async () => {
    axiosRequestSpy.mockResolvedValue({
      data: 'resume obj',
      error: undefined,
    })
    const result = await uploadPicture(id, reqData)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('resume obj')
    expect(result.error).toBeUndefined()
  })
})

describe('Deletes resume picture', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const id = 'abc'

  const options = {
    method: 'DELETE',
    url: `/resume/${id}/avatar`,
  }

  test('Fails to delete picture', async () => {
    axiosRequestSpy.mockRejectedValue(new Error('Failed to delete picture'))

    const result = await deletePicture(id)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to delete picture')
  })

  test('Successfully deletes picture', async () => {
    axiosRequestSpy.mockResolvedValue({
      data: 'resume obj',
      error: undefined,
    })
    const result = await deletePicture(id)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('resume obj')
    expect(result.error).toBeUndefined()
  })
})

describe('Delete resume', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const id = 'abc'

  const options = {
    method: 'DELETE',
    url: `/resume/${id}`,
  }

  test('Fails to delete resume', async () => {
    axiosRequestSpy.mockRejectedValue(new Error('Failed to delete resume'))

    const result = await deleteResume(id)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to delete resume')
  })

  test('Successfully deletes resume', async () => {
    axiosRequestSpy.mockResolvedValue({
      data: 'resume obj',
      error: undefined,
    })
    const result = await deleteResume(id)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('resume obj')
    expect(result.error).toBeUndefined()
  })
})
