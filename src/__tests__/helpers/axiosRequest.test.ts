import axios from 'axios'
import axiosRequest from '../../helpers/axiosRequest'

describe('Axios Request helper', () => {
  const RequestSpy = jest.spyOn(axios, 'request')
  test('Unkown Err', async () => {
    RequestSpy.mockRejectedValue('err')
    const result = await axiosRequest('dummy-options')
    expect(result).toEqual({ data: '', error: 'Something went wrong!' })
  })
  test('Known Err', async () => {
    RequestSpy.mockRejectedValue({
      response: { data: { error: { message: 'Known Error' } } },
    })
    const result = await axiosRequest('dummy-options')
    expect(result).toEqual({ data: '', error: 'Known Error' })
  })
  test('Request Successful', async () => {
    RequestSpy.mockResolvedValueOnce({
      data: 'Request was successful',
    })
    const result = await axiosRequest('dummy-options')
    expect(result).toEqual({ data: 'Request was successful', error: '' })
  })
  test('Request Successful but data null', async () => {
    RequestSpy.mockResolvedValueOnce({
      data: null,
    })
    const result = await axiosRequest('dummy-options')
    expect(result).toEqual({ data: '', error: '' })
  })
})
