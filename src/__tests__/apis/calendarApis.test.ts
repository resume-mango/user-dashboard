import {
  apiCreateEvent,
  apiDeleteEvent,
  apiUpdateEvent,
} from '../../apis/calendar'
import * as axiosRequest from '../../helpers/axiosRequest'

describe('Calendar Create Event', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const reqData = {
    summary: 'abc',
    description: 'efg',
    location: 'higk',
    start: { dateTime: new Date(Date.now()).toISOString() },
    end: { dateTime: new Date(Date.now()).toISOString() },
    colorId: 'blue',
  }
  const options = {
    method: 'POST',
    url: '/calendar',
    data: reqData,
  }

  test('Fails to create event', async () => {
    axiosRequestSpy.mockRejectedValue(new Error('Failed to create event'))

    const result = await apiCreateEvent(reqData)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to create event')
  })

  test('Successfully creates event', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'event obj',
      error: undefined,
    })

    const result = await apiCreateEvent(reqData)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('event obj')
    expect(result.error).toBeUndefined()
  })
})

describe('Calendar Update Event', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const reqData = {
    id: '123',
    summary: 'abc',
    description: 'efg',
    location: 'higk',
    start: new Date(Date.now()).toISOString(),
    end: new Date(Date.now()).toISOString(),
    colorId: 'blue',
  }
  const options = {
    method: 'PATCH',
    url: '/calendar',
    data: reqData,
  }

  test('Fails to update event', async () => {
    axiosRequestSpy.mockRejectedValue(new Error('Failed to update event'))

    const result = await apiUpdateEvent(reqData as any)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to update event')
  })

  test('Successfully updates event', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'event obj',
      error: undefined,
    })

    const result = await apiUpdateEvent(reqData as any)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('event obj')
    expect(result.error).toBeUndefined()
  })
})

describe('Calendar Delete Event', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const id = '123'
  const options = {
    method: 'DELETE',
    url: '/calendar',
    data: { id },
  }

  test('Fails to delete event', async () => {
    axiosRequestSpy.mockRejectedValue(new Error('Failed to delete event'))

    const result = await apiDeleteEvent(id)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to delete event')
  })

  test('Successfully delete event', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'event obj',
      error: undefined,
    })

    const result = await apiDeleteEvent(id)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('event obj')
    expect(result.error).toBeUndefined()
  })
})
