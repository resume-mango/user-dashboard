import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import RouterPrompt from '../../components/routerPrompt'
import TestingWrapper from '../../__mocks__/TestingWrapper'

describe('<RouterPrompt/>', () => {
  // const useHistorySpy = jest.spyOn(dom, 'useHistory')

  afterEach(() => {
    jest.clearAllMocks()
  })

  const Wrapper = ({ initial, exludedPaths }: any) => {
    const [show, setShow] = useState(initial)
    const history = useHistory()

    useEffect(() => {
      history.push('/home')

      const timer = setTimeout(() => {
        history.push('/blocked')
      }, 3000)
      return () => clearTimeout(timer)
    }, [])
    return (
      <RouterPrompt show={show} setShow={setShow} exludedPaths={exludedPaths} />
    )
  }

  jest.setTimeout(30000)

  test('should show prompt and clicks on cancel btn', async () => {
    let screen: any
    await act(async () => {
      screen = render(
        <TestingWrapper>
          <Wrapper initial={true} />
        </TestingWrapper>
      ) as RenderResult
    })
    await waitFor(async () => {
      expect(
        screen.container.getElementsByClassName('prompt-wrapper')[0]
      ).toBeInTheDocument()
    })
    const cancelBtn = screen.getByText('Cancel')
    fireEvent.click(cancelBtn)
    expect(
      screen.container.getElementsByClassName('prompt-wrapper')[0]
    ).toBeUndefined()
  })
  test('should not show prompt and click on confirm btn', async () => {
    let screen: any
    await act(async () => {
      screen = render(
        <TestingWrapper>
          <Wrapper initial={true} />
        </TestingWrapper>
      ) as RenderResult
    })

    await waitFor(async () => {
      expect(
        screen.container.getElementsByClassName('prompt-wrapper')[0]
      ).toBeInTheDocument()
    })
    const okBtn = screen.getByText('Ok')
    fireEvent.click(okBtn)
    expect(
      screen.container.getElementsByClassName('prompt-wrapper')[0]
    ).toBeUndefined()
  })
  test('should not show prompt because path was excluded', async () => {
    let screen: any
    await act(async () => {
      screen = render(
        <TestingWrapper>
          <Wrapper initial={true} exludedPaths={['/home', '/blocked']} />
        </TestingWrapper>
      ) as RenderResult
    })

    await new Promise((r) => setTimeout(r, 5000))

    expect(
      screen.container.getElementsByClassName('prompt-wrapper')[0]
    ).toBeUndefined()
  })
})
