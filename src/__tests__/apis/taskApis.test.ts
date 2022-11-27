import axios from 'axios'
import { apiChangeTaskPos } from '../../apis/task'

describe('Change taskbaord item position', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const requestSpy = jest.spyOn(mockedAxios, 'request')

  const reqData = 'data'

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('Fails to change item position', async () => {
    requestSpy.mockRejectedValue(new Error('Failed to change position'))
    const result = await apiChangeTaskPos(reqData)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to change position')
  })

  test('Successfully changes ite  position', async () => {
    requestSpy.mockResolvedValue({ data: 'success', error: undefined })
    const result = await apiChangeTaskPos(reqData)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result.data).toBe('success')
    expect(result.error).toBeUndefined()
  })
})
