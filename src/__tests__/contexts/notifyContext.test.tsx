import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react'
import { Fragment } from 'react'
import { act } from 'react-dom/test-utils'
import { useNotify } from '../../contexts/notify'
import TestingWrapper from '../../__mocks__/TestingWrapper'

describe('Notify Context', () => {
  const TestWrapper = () => {
    const { setNotify } = useNotify()
    return (
      <Fragment>
        <button
          onClick={() =>
            setNotify({
              type: 'danger',
              heading: 'Err',
              message: 'Something went wrong',
            })
          }
        >
          Set Danger
        </button>
        <button
          onClick={() =>
            setNotify({
              type: 'warning',
              heading: 'Warn',
              message: 'This is wraning',
            })
          }
        >
          Set Warning
        </button>
        <button
          onClick={() =>
            setNotify({
              type: 'info',
              heading: 'Info',
              message: 'This is info',
            })
          }
        >
          Set Info
        </button>
        <button
          onClick={() =>
            setNotify({
              type: 'success',
              heading: 'Success',
              message: 'This is success',
            })
          }
        >
          Set Success
        </button>
      </Fragment>
    )
  }

  const Wrapper = (
    <TestingWrapper>
      <TestWrapper />
    </TestingWrapper>
  )

  jest.setTimeout(30000)

  test('Should render successfully', async () => {
    let screen: any
    await act(async () => {
      screen = render(Wrapper) as RenderResult
    })

    if (!screen) throw Error('Failed to render')
    const danger = screen.getByText('Set Danger')
    const warning = screen.getByText('Set Warning')
    const info = screen.getByText('Set Info')
    const success = screen.getByText('Set Success')

    fireEvent.click(danger)
    fireEvent.click(screen.container.getElementsByClassName('cross')[0])

    fireEvent.click(warning)
    fireEvent.click(screen.container.getElementsByClassName('cross')[0])

    fireEvent.click(info)
    fireEvent.click(screen.container.getElementsByClassName('cross')[0])

    fireEvent.click(success)
    fireEvent.click(screen.container.getElementsByClassName('cross')[0])

    await waitFor(() => {
      expect(
        screen.container.getElementsByClassName('toast-wrapper')[0].children
          .length
      ).toBe(0)
    })
  })

  test('Should render successfully and wait to auto close notify', async () => {
    let screen: any
    await act(async () => {
      screen = render(Wrapper) as RenderResult
    })

    if (!screen) throw Error('Failed to render')
    const dangerErr = screen.getByText('Set Danger')

    fireEvent.click(dangerErr)
    expect(
      screen.container.getElementsByClassName('toast-wrapper')[0].children
        .length
    ).toBe(1)

    await new Promise((r) => setTimeout(r, 10000))
    expect(
      screen.container.getElementsByClassName('toast-wrapper')[0].children
        .length
    ).toBe(0)
  })
})
