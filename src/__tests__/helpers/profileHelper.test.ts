import * as userApis from '../../apis/user'
import * as axiosHelper from '../../helpers/axiosRequest'
import {
  changeUserName,
  handleChangeUserPassword,
} from '../../helpers/profileHelper'

describe('Profile Helper', () => {
  const axiosRequestSpy = jest.spyOn(axiosHelper, 'default')

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Change User Name', () => {
    const apiRefreshSessionSpy = jest.spyOn(userApis, 'apiRefreshSession')
    afterEach(() => {
      jest.clearAllMocks()
    })

    const firstName = 'jhon'
    const lastName = 'doe'
    const user = {
      firstName: 'jane',
      lastName: 'doe',
      role: ['standard'],
      ref: 'abcc',
    }
    const data = { firstName: 'jane', lastName: 'doe' }
    const setUser = jest.fn()
    const setToken = jest.fn()
    const setLoading = jest.fn()
    const setNotify = jest.fn()

    const userData = {
      firstName,
      lastName,
      role: user.role,
      ref: user.ref,
    }

    test('should fail update username', async () => {
      axiosRequestSpy.mockResolvedValue({ data: null, error: 'Err' })
      await changeUserName(
        firstName,
        lastName,
        user,
        data,
        setUser,
        setToken,
        setLoading,
        setNotify
      )
      expect(setNotify).toBeCalledWith({
        type: 'danger',
        heading: 'Failed to update!',
      })
      expect(setLoading).toBeCalledTimes(2)
    })
    test('should fail update user session', async () => {
      axiosRequestSpy.mockResolvedValue({ data: true, error: undefined })
      apiRefreshSessionSpy.mockResolvedValue({ data: undefined, error: 'Err' })
      await changeUserName(
        firstName,
        lastName,
        user,
        data,
        setUser,
        setToken,
        setLoading,
        setNotify
      )
      expect(setUser).toBeCalledWith(userData)
      expect(setNotify).toBeCalledWith({
        type: 'danger',
        heading: 'Failed to update session!',
      })
      expect(setLoading).toBeCalledTimes(2)
    })

    test('should successfully update', async () => {
      axiosRequestSpy.mockResolvedValue({ data: 'dummy', error: undefined })
      apiRefreshSessionSpy.mockResolvedValue({
        data: true,
        error: undefined,
      } as any)
      await changeUserName(
        firstName,
        lastName,
        user,
        data,
        setUser,
        setToken,
        setLoading,
        setNotify
      )
      expect(setUser).toBeCalledWith(userData)
      expect(setToken).toBeCalledWith(data)

      expect(setLoading).toBeCalledTimes(2)
    })
  })

  describe('Handle Chnage password', () => {
    const setData = jest.fn()
    const setLoading = jest.fn()

    afterEach(() => {
      jest.clearAllMocks()
    })
    test('should throw error', async () => {
      axiosRequestSpy.mockRejectedValue('Err')
      await handleChangeUserPassword(setData, setLoading)
      expect(setData).toHaveBeenCalledWith({
        message: 'Something went wrong!',
        type: 'danger',
        id: expect.any(Number),
      })
    })
    test('should fail', async () => {
      axiosRequestSpy.mockResolvedValue({ data: undefined, error: 'Err' })
      await handleChangeUserPassword(setData, setLoading)
      expect(setData).toHaveBeenCalledWith({
        message: 'Err',
        type: 'danger',
        id: expect.any(Number),
      })
    })

    test('should success', async () => {
      axiosRequestSpy.mockResolvedValue({ data: 'dummy', error: undefined })
      await handleChangeUserPassword(setData, setLoading)
      expect(setData).toHaveBeenCalledWith({
        message: 'dummy',
        type: 'success',
        id: expect.any(Number),
      })
    })
  })
})
