import {
  apiCallbackSubscription,
  apiCreateSubscription,
  apiUpgradeSubscription,
} from '../../apis/subscribe'
import * as axiosRequest from '../../helpers/axiosRequest'

describe('Create new subscription', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const planId = 'abc'

  const options = {
    method: 'POST',
    url: `/subscribe/${planId}`,
  }

  test('Fails to create subscripition', async () => {
    axiosRequestSpy.mockRejectedValue(
      new Error('Failed to create subscription')
    )

    const result = await apiCreateSubscription(planId)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to create subscription')
  })

  test('Successfully creates subscription', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'subscription obj',
      error: undefined,
    })

    const result = await apiCreateSubscription(planId)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('subscription obj')
    expect(result.error).toBeUndefined()
  })
})

describe('Upgrades subscription', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const planId = 'abc'

  const options = {
    method: 'PATCH',
    url: `/subscription/upgrade/${planId}`,
  }

  test('Fails to upgrade subscripition', async () => {
    axiosRequestSpy.mockRejectedValue(
      new Error('Failed to upgrade subscription')
    )

    const result = await apiUpgradeSubscription(planId)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to upgrade subscription')
  })

  test('Successfully upgrades subscription', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'subscription obj',
      error: undefined,
    })

    const result = await apiUpgradeSubscription(planId)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('subscription obj')
    expect(result.error).toBeUndefined()
  })
})

describe('Subscription Callback', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const id = 'abc'
  const type = 'success'
  const options = {
    method: 'GET',
    url: `/subscribe/cb?id=${id}&type=${type}`,
  }

  test('Fails to callback subscripition', async () => {
    axiosRequestSpy.mockRejectedValue(
      new Error('Failed to callback subscription')
    )

    const result = await apiCallbackSubscription(id, type)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to callback subscription')
  })

  test('Successfully upgrades subscription', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'subscription obj',
      error: undefined,
    })

    const result = await apiCallbackSubscription(id, type)
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe('subscription obj')
    expect(result.error).toBeUndefined()
  })
})
