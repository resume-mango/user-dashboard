import { act, fireEvent, render, RenderResult } from '@testing-library/react'
import axios from 'axios'
import { Fragment } from 'react'
import Cookies from 'universal-cookie'
import { AuthProvider, useAuth } from '../../contexts/authProvider'
import { WindowFocusContextProvider } from '../../contexts/windowFocus'
import * as authHelper from '../../helpers/fetchAuthData'
import TestingWrapper from '../../__mocks__/TestingWrapper'

describe('Auth Provider Context', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const axiosGetSpy = jest.spyOn(mockedAxios, 'get')
  const fetchAuthDataSpy = jest.spyOn(authHelper, 'fetchAuthData')
  const cookies = new Cookies()

  jest.setTimeout(10000)

  const Wrapper = () => {
    const { token, setToken, user, setUser, isLoading } = useAuth()
    return (
      <Fragment>
        {isLoading ? (
          'Loading'
        ) : (
          <Fragment>
            <p>Token: {token}</p>
            <button onClick={() => setToken('new-token')}>Set Token</button>
            <p>
              User: {user.firstName}
              {user.lastName}
            </p>
            <button
              onClick={() =>
                setUser({ firstName: 'Jack', lastName: 'Reacher' })
              }
            >
              Set User
            </button>
          </Fragment>
        )}
      </Fragment>
    )
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should render loading screen', () => {
    const { getByText } = render(
      <TestingWrapper>
        <WindowFocusContextProvider>
          <AuthProvider>
            <Wrapper />
          </AuthProvider>
        </WindowFocusContextProvider>
      </TestingWrapper>
    )
    expect(getByText('Loading')).toBeInTheDocument()
  })

  test('Should successfully render', async () => {
    axiosGetSpy.mockResolvedValue({
      data: {
        token: 'abc',
        user: {
          firstName: 'jhon',
          lastName: 'doe',
        },
      },
    })
    let screen: any
    await act(async () => {
      cookies.set('rm_ia', 'true')

      screen = render(
        <TestingWrapper>
          <WindowFocusContextProvider>
            <AuthProvider>
              <Wrapper />
            </AuthProvider>
          </WindowFocusContextProvider>
        </TestingWrapper>
      ) as RenderResult
    })

    expect(fetchAuthDataSpy).toBeCalledTimes(1)

    const token = screen.getByText(/Token:/i) as HTMLElement
    const user = screen.getByText(/User:/i) as HTMLElement

    expect(token.textContent).toEqual('Token: abc')
    expect(user.textContent).toEqual('User: jhondoe')

    const setToken = screen.getByText('Set Token')
    const setUser = screen.getByText('Set User')
    fireEvent.click(setToken)
    fireEvent.click(setUser)
    expect(token.textContent).toEqual('Token: new-token')
    expect(user.textContent).toEqual('User: JackReacher')
  })
})
