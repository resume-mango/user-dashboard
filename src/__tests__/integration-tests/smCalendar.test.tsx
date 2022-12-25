import { cleanup, fireEvent, render } from '@testing-library/react'
import dayjs from 'dayjs'
import { calendarData } from '../../__mocks__/calendar'
import * as calendarQueries from '../../queries/calendarQueries'
import SmallCalender from '../../pages/homepage/sm-calender'
import nock from 'nock'
import useCalender from '../../helpers/calender'
import TestingWrapper from '../../__mocks__/TestingWrapper'

describe('<SmallCalender/>', () => {
  const getCalendarSpy = jest.spyOn(calendarQueries, 'getCalendar')
  const currDate = dayjs()
  const calendar = useCalender(currDate)
  const actual = jest.requireActual('../../helpers/calender')
  const calendarSpy = jest.spyOn(actual, 'default')
  calendarSpy.mockReturnValue(calendar)
  beforeAll(() => {
    nock('http://localhost:4000')
      .persist()
      .get(`/v1/calendar`)
      .query(true)
      .reply(200, calendarData())
  })
  afterEach(cleanup)

  const Wrapper = (
    <TestingWrapper>
      <SmallCalender />
    </TestingWrapper>
  )

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Fails to render calendar', async () => {
    getCalendarSpy.mockReturnValue({
      data: calendarData(),
      isLoading: false,
      isError: true,
    })
    const { getByText } = render(Wrapper)
    const error = getByText(/Failed/i)
    expect(error.textContent).toBe('Failed to fetch calendar events')
  })
  test('Successfully renders calendar', async () => {
    getCalendarSpy.mockReturnValue({
      data: calendarData(),
      isLoading: false,
      isError: false,
    })

    const { getByText, container } = render(Wrapper)

    const pattern = new RegExp(`\\b${currDate.format('MMMM')}\\b`, 'i')

    const title = getByText(pattern)
    expect(title.textContent).toBe(currDate.format('MMMM YYYY'))

    const today = container.getElementsByClassName('today')[0]

    const styles = getComputedStyle(today)
    expect(styles.color).toBe('rgb(240, 132, 56)')

    const prev = container.querySelector('.prev-btn') as Element
    const next = container.querySelector('.next-btn') as Element
    fireEvent.click(prev)

    expect(title.textContent).toBe(
      currDate.subtract(1, 'month').format('MMMM YYYY')
    )

    fireEvent.click(next)
    fireEvent.click(next)

    expect(title.textContent).toBe(currDate.add(1, 'month').format('MMMM YYYY'))
  })
})
