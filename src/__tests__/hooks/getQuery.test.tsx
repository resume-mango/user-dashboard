import { act, render } from '@testing-library/react'
import axios from 'axios'
import * as authProvider from '../../contexts/authProvider'
import getQuery from '../../hooks/getQuery'
import TestingWrapper from '../../__mocks__/TestingWrapper'

describe('Get Query Hook', () => {
  const Wrapper = () => {
    const { data }: any = getQuery('identifier', '/home', '{query : abc}')
    return <p>Data: {data ? JSON.stringify(data) : 'null'}</p>
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return null', async () => {
    let screen: any
    await act(async () => {
      screen = render(
        <TestingWrapper>
          <Wrapper />
        </TestingWrapper>
      )
    })

    const data = screen.getByText(/Data:/i)
    expect(data.textContent).toBe(`Data: null`)
  })
  test('should return data', async () => {
    const useAuthSpy = jest.spyOn(authProvider, 'useAuth')

    useAuthSpy.mockReturnValue({
      user: { firstName: 'abc', lastName: 'efg', ref: 'ijk' },
      token: 'token',
    } as any)
    const AxiosGetSpy = jest.spyOn(axios, 'get')

    AxiosGetSpy.mockResolvedValue({ data: 'dummy' })
    let screen: any
    await act(async () => {
      screen = render(
        <TestingWrapper>
          <Wrapper />
        </TestingWrapper>
      )
    })

    const data = screen.getByText(/Data:/i)
    expect(data.textContent).toBe(`Data: ${JSON.stringify('dummy')}`)
  })
})
