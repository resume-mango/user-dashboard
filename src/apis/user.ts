import axiosRequest from '../helpers/axiosRequest'

/**
 * Refresh user session data
 * @returns access_token
 */
export const apiRefreshSession = async () => {
  let data
  let error: string

  const options = {
    method: 'GET',
    url: `${process.env.AUTH_HOST}/auth/refresh`,
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
