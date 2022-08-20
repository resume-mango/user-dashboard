import axiosRequest from '../helpers/axiosRequest'

/**
 *
 * @param planId string
 * @returns checkout url
 */
export const apiCreateSubscription = async (planId: string) => {
  let data
  let error: string

  const options = {
    method: 'POST',
    url: `/subscribe/${planId}`,
  }

  try {
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err: any) {
    return { data: undefined, error: err }
  }
}

/**
 *
 * @param planId string
 * @returns checkout url
 */
export const apiUpgradeSubscription = async (planId: string) => {
  let data
  let error: string

  const options = {
    method: 'PATCH',
    url: `/subscription/upgrade/${planId}`,
  }

  try {
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err: any) {
    return { data: undefined, error: err }
  }
}

/**
 *
 * @param id Stripe Session Id or Paypal subscription Id
 * @param type success | cancel
 * @returns
 */
export const apiCallbackSubscription = async (
  id: string,
  type: 'success' | 'cancel'
) => {
  let data
  let error: string

  const options = {
    method: 'GET',
    url: `/subscribe/cb?id=${id}&type=${type}`,
  }

  try {
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err: any) {
    return { data: undefined, error: err }
  }
}
