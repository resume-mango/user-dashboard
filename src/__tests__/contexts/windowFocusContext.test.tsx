import { act, fireEvent, render } from '@testing-library/react'
import { Fragment } from 'react'
import {
  useWindowFocus,
  WindowFocusContextProvider,
} from '../../contexts/windowFocus'
import TestingWrapper from '../../__mocks__/TestingWrapper'

describe('Window Focus Context', () => {
  const TestWrapper = () => {
    const { windowIsActive } = useWindowFocus()
    return (
      <Fragment>
        <p>Is Active: {windowIsActive ? 'true' : 'false'}</p>
      </Fragment>
    )
  }

  const Wrapper = (
    <TestingWrapper>
      <WindowFocusContextProvider>
        <TestWrapper />
      </WindowFocusContextProvider>
    </TestingWrapper>
  )

  test('Window should be focused', async () => {
    let screen: any
    await act(async () => {
      screen = render(Wrapper)
    })
    if (!screen) throw new Error('Failed to Render ')
    fireEvent(window, new Event('focus'))

    expect(screen.getByText(/Is Active:/i).textContent).toBe('Is Active: true')
  })

  test('Window should not be focused', async () => {
    let screen: any
    await act(async () => {
      screen = render(Wrapper)
    })
    if (!screen) throw new Error('Failed to Render ')
    fireEvent(window, new Event('blur'))

    expect(screen.getByText(/Is Active:/i).textContent).toBe('Is Active: false')
  })
})
