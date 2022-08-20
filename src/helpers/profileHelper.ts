import { apiRefreshSession } from '../apis/user'
import axiosRequest from './axiosRequest'
/**
 * Changes User Name
 * @param firstName
 * @param lastName
 * @param user from useAuth()
 * @param data state form useState()
 * @param setUser from useAuth(), setState fn
 * @param setToken from useAuth(), setState Fn
 * @param setLoading setState fn
 * @param setNotify from useNotify(), setState fn
 * @returns void
 */
export const changeUserName = async (
  firstName: string,
  lastName: string,
  user: Record<string, any>,
  data: any,
  setUser: (_val: Record<string, any>) => void,
  setToken: (_val: string) => void,
  setLoading: (_val: any) => void,
  setNotify: (_val: any) => void
) => {
  setLoading({ name: true })
  const options = {
    method: 'PATCH',
    url: '/user',
    data: { firstName, lastName },
  }
  const { data: res, error } = await axiosRequest(options)
  if (res) {
    const userData = {
      firstName,
      lastName,
      role: user.role,
      ref: user.ref,
    }

    setUser(userData)
    const { data: token, error: tokenError } = await apiRefreshSession()
    if (token && !tokenError) {
      setToken(data)
    } else setNotify({ type: 'danger', heading: 'Failed to update session!' })
  }
  if (error) setNotify({ type: 'danger', heading: 'Failed to update!' })

  return setLoading({ name: false })
}

/**
 * Changes user password
 * @param setData setState fn
 * @param setLoading setState fn
 * @returns boolean
 */
export const handleChangeUserPassword = async (
  setData: (_val: any) => void,
  setLoading: (_val: any) => void
) => {
  const options = {
    method: 'POST',
    url: '/change-password',
    data: '',
  }
  try {
    setLoading({ password: true })
    const { data: res, error } = await axiosRequest(options)
    if (res) {
      setData({ message: res, type: 'success', id: Math.random() })
    }
    if (error) {
      setData({ message: error, type: 'danger', id: Math.random() })
    }
  } catch (err) {
    setData({
      message: 'Something went wrong!',
      type: 'danger',
      id: Math.random(),
    })
  }

  return setLoading({ password: false })
}
