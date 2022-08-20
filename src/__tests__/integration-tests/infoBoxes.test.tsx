import { render } from '@testing-library/react'
import InfoBoxes from '../../pages/homepage/InfoBoxes'
import * as countsQueries from '../../queries/dashboardQueries'
import { countsData } from '../../__mocks__/counts'
import TestingWrapper from '../../__mocks__/TestingWrapper'

describe('<InfoBoxes/>', () => {
  const getCountsSpy = jest.spyOn(countsQueries, 'getCounts')

  afterEach(() => {
    jest.clearAllMocks()
  })

  const Wrapper = (
    <TestingWrapper>
      <InfoBoxes />
    </TestingWrapper>
  )

  test('Should Succefully render info boxes', () => {
    getCountsSpy.mockReturnValue({
      data: countsData,
      isLoading: false,
      isError: false,
    } as any)
    const { getByText } = render(Wrapper)
    const applied = getByText('Jobs Applied')
    const todos = getByText('To-dos')
    const callbacks = getByText('Call backs')
    const interviews = getByText('Interviews')

    const appliedVal = applied.parentElement
    const todosVal = todos.parentElement
    const callbacksVal = callbacks.parentElement
    const interviewsVal = interviews.parentElement

    expect(applied).toBeInTheDocument()
    expect(todos).toBeInTheDocument()
    expect(callbacks).toBeInTheDocument()
    expect(interviews).toBeInTheDocument()

    expect(appliedVal).toContainHTML('<h3>05</h3>')
    expect(todosVal).toContainHTML('<h3>02</h3>')
    expect(callbacksVal).toContainHTML('<h3>03</h3>')
    expect(interviewsVal).toContainHTML('<h3>04</h3>')
  })

  test('Loading infoboxes', () => {
    getCountsSpy.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    } as any)

    const { queryByText } = render(Wrapper)
    const applied = queryByText('Jobs Applied')
    const todos = queryByText('To-dos')
    const callbacks = queryByText('Call backs')
    const interviews = queryByText('Interviews')
    const error = queryByText('Failed to load counts')
    expect(error).not.toBeInTheDocument()
    expect(applied).not.toBeInTheDocument()
    expect(todos).not.toBeInTheDocument()
    expect(callbacks).not.toBeInTheDocument()
    expect(interviews).not.toBeInTheDocument()
  })

  test('Fails to render infoboxes', () => {
    getCountsSpy.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    } as any)

    const { getByText } = render(Wrapper)

    const error = getByText('Failed to load counts')
    expect(error).toBeInTheDocument()
  })
})
