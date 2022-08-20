import { act, fireEvent, render } from '@testing-library/react'
import { Fragment } from 'react'
import { useViewport } from '../../contexts/viewPort'
import TestingWrapper from '../../__mocks__/TestingWrapper'

describe('View Port Context', () => {
  const TestWrapper = () => {
    const {
      width,
      height,
      screenHeight,
      screenWidth,
      desktop,
      tablet,
      mobile,
    } = useViewport()

    return (
      <Fragment>
        <p>Width: {width}</p>
        <p>Height: {height}</p>
        <p>ScreenHeightVal: {screenHeight}</p>
        <p>ScreenWidhtVal: {screenWidth}</p>
        <p>Desktop: {desktop ? 'true' : 'false'}</p>
        <p>Mobile: {mobile ? 'true' : 'false'}</p>
        <p>Tablet: {tablet ? 'true' : 'false'}</p>
      </Fragment>
    )
  }

  test('View Port 1920 * 1080', async () => {
    let screen: any

    await act(async () => {
      screen = render(
        <TestingWrapper>
          <TestWrapper />
        </TestingWrapper>
      )
    })
    global.innerWidth = 1920
    global.innerHeight = 1080
    fireEvent(window, new Event('resize'))
    expect(screen.getByText(/Width:/i).textContent).toBe('Width: 1920')
    expect(screen.getByText(/Height:/i).textContent).toBe('Height: 1080')
    expect(screen.getByText(/Desktop/i).textContent).toBe('Desktop: true')
    expect(screen.getByText(/Mobile/i).textContent).toBe('Mobile: false')
    expect(screen.getByText(/Tablet/i).textContent).toBe('Tablet: false')
  })

  test('View Port 768 * 1024', async () => {
    let screen: any

    await act(async () => {
      screen = render(
        <TestingWrapper>
          <TestWrapper />
        </TestingWrapper>
      )
    })
    global.innerWidth = 768
    global.innerHeight = 1024
    fireEvent(window, new Event('resize'))
    expect(screen.getByText(/Width:/i).textContent).toBe('Width: 768')
    expect(screen.getByText(/Height:/i).textContent).toBe('Height: 1024')
    expect(screen.getByText(/Desktop/i).textContent).toBe('Desktop: false')
    expect(screen.getByText(/Mobile/i).textContent).toBe('Mobile: false')
    expect(screen.getByText(/Tablet/i).textContent).toBe('Tablet: true')
  })

  test('View Port 480 * 890', async () => {
    let screen: any

    await act(async () => {
      screen = render(
        <TestingWrapper>
          <TestWrapper />
        </TestingWrapper>
      )
    })
    global.innerWidth = 375
    global.innerHeight = 890
    fireEvent(window, new Event('resize'))
    expect(screen.getByText(/Width:/i).textContent).toBe('Width: 375')
    expect(screen.getByText(/Height:/i).textContent).toBe('Height: 890')
    expect(screen.getByText(/Desktop/i).textContent).toBe('Desktop: false')
    expect(screen.getByText(/Mobile/i).textContent).toBe('Mobile: true')
    expect(screen.getByText(/Tablet/i).textContent).toBe('Tablet: false')
  })
})
