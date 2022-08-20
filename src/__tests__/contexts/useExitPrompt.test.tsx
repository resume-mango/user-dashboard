import { act, fireEvent, render } from '@testing-library/react'
import { Fragment, ReactNode, useEffect } from 'react'
import { BrowserRouter, Router, useHistory } from 'react-router-dom'
import useExitPrompt from '../../hooks/useExitPromt'
import { createMemoryHistory } from 'history'
const TestingWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const history = createMemoryHistory()

  return (
    <BrowserRouter
      getUserConfirmation={() => {
        /* Empty callback to block the default browser prompt */
      }}
    >
      <Router history={history}>{children}</Router>
    </BrowserRouter>
  )
}

describe('Exit prompt hook', () => {
  const Wrapper = () => {
    const { showExitPrompt, setShowExitPrompt } = useExitPrompt(false)
    const history = useHistory()

    useEffect(() => {
      const timer = setTimeout(() => {
        history.push('abc')
      }, 3000)
      return () => clearTimeout(timer)
    }, [])
    return (
      <Fragment>
        <p>showExitPrompt: {showExitPrompt ? 'true' : 'false'}</p>
        <button onClick={() => setShowExitPrompt(true)}>
          setShowExitPrompt
        </button>
      </Fragment>
    )
  }

  jest.setTimeout(30000)

  test('should promt', async () => {
    let screen: any

    await act(async () => {
      screen = render(
        <TestingWrapper>
          <Wrapper />
        </TestingWrapper>
      )
    })
    const exit = screen.getByText(/showExitPrompt:/i)
    const setExit = screen.getByText('setShowExitPrompt')
    expect(exit.textContent).toBe('showExitPrompt: false')

    fireEvent.click(setExit)

    expect(exit.textContent).toBe('showExitPrompt: true')

    expect(1).toBe(1)
  })
})
