import axios from 'axios'
import Cookies from 'universal-cookie'

/**
 * Fetches user auth data
 * @param location url where user to be redirected if not authenticated
 * @param setUser form useAuth()
 * @param setToken from useAuth()
 * @param setIsLoading from useAuth()
 * @returns boolean
 */
export const fetchAuthData = async (
  location: string,
  setUser: (_val: any) => void,
  setToken: (_val: string) => void,
  setIsLoading: (_val: boolean) => void
) => {
  const cookies = new Cookies()
  return await axios
    .get(`${process.env.AUTH_HOST}/auth/data`)
    .then((res: any) => {
      if (!res || !res.data) return false

      if (res.data.token) {
        axios.defaults.headers.common['Authorization'] = res.data.token
      }
      setUser(res.data.user)
      // setUser({ ...res.data.user, role: ['standard'] })
      setToken(res.data.token)

      return true
    })
    .catch((err) => {
      if (err.response && err.response.status && err.response.status === 401) {
        cookies.remove('rm_ia', {
          path: '/',
          domain: process.env.COOKIE_DOMAIN,
        })
        window.location.href = location
      }
      return false
    })
    .finally(() => {
      setIsLoading(false)
    })
}
