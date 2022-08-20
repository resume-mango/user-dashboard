import axios from 'axios'
import { fetchAuthData } from '../../helpers/fetchAuthData'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Fetches Auth Data from auth Service', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const location = '/fake/location'
  const setUser = jest.fn()
  const setToken = jest.fn()
  const setIsLoading = jest.fn()

  const user = {
    first_name: 'jhon',
    last_name: 'doe',
  }

  const token = 'dummy token'

  test('Fails to get auth data', async () => {
    Object.defineProperty(window, 'location', {
      value: {
        href: location,
      },
    })

    mockedAxios.get.mockRejectedValue({
      response: {
        status: 401,
        message: 'Unauthorized',
      },
    } as any)
    const result = await fetchAuthData(
      location,
      setUser,
      setToken,
      setIsLoading
    )
    expect(result).toBe(false)
    expect(1).toBe(1)
  })

  test('Successfully fetches auth data', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        token,
        user,
      },
    })
    const result = await fetchAuthData(
      location,
      setUser,
      setToken,
      setIsLoading
    )
    expect(setUser).toBeCalledWith(user)
    expect(setToken).toBeCalledWith(token)
    expect(window.location.href).toEqual(location)
    expect(result).toBe(true)
    expect(1).toBe(1)
  })
})
