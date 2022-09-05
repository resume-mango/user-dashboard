import dayjs from 'dayjs'
import useCalender from '../../helpers/calender'
import { eventAdder, findEventDate } from '../../helpers/eventAdderToCalendar'
import { calendarData } from '../../__mocks__/calendar'

describe('Calendar EVent Added Helper', () => {
  test('Finds Event Date', async () => {
    const date = dayjs().add(2, 'day').format('YYYY-MM-D')
    const { getDatesforNextMonth, getDatesForPrevMonth, getDatesForCurrMonth } =
      useCalender(dayjs())

    const dates = [
      ...getDatesForPrevMonth,
      ...getDatesForCurrMonth,
      ...getDatesforNextMonth,
    ]
    const result = findEventDate(date, dates)
    const predictedPos = dates.findIndex((d) => d.date === date)
    expect(result).toBe(predictedPos)
  })

  test('Failes to find Event Date', async () => {
    const date = '1999-12-1'
    const { getDatesforNextMonth, getDatesForPrevMonth, getDatesForCurrMonth } =
      useCalender(dayjs())

    const dates = [
      ...getDatesForPrevMonth,
      ...getDatesForCurrMonth,
      ...getDatesforNextMonth,
    ]

    const result = findEventDate(date, dates)
    expect(result).toBe(-1)
  })

  test('Event Adder', async () => {
    const { getDatesforNextMonth, getDatesForPrevMonth, getDatesForCurrMonth } =
      useCalender(dayjs())

    const dates = [
      ...getDatesForPrevMonth,
      ...getDatesForCurrMonth,
      ...getDatesforNextMonth,
    ]

    const result = eventAdder(dates, calendarData)
    expect(result.filter((obj) => obj.events.length > 0).length).toBe(3)
  })

  test('Event Adder with no events', async () => {
    const { getDatesforNextMonth, getDatesForPrevMonth, getDatesForCurrMonth } =
      useCalender(dayjs())

    const dates = [
      ...getDatesForPrevMonth,
      ...getDatesForCurrMonth,
      ...getDatesforNextMonth,
    ]

    const result = eventAdder(dates, [
      {
        id: '72b09n0023jbstfpeqdpmf8ror',
        summary: 'sdfsdfsdf',
        start: { date: `1999-12-1` },
        end: { date: `1999-12-1` },
      },
    ])
    expect(result.filter((obj) => obj.events.length > 0).length).toBe(0)
  })

  test('Event Adder with events with no start time', async () => {
    const { getDatesforNextMonth, getDatesForPrevMonth, getDatesForCurrMonth } =
      useCalender(dayjs())

    const dates = [
      ...getDatesForPrevMonth,
      ...getDatesForCurrMonth,
      ...getDatesforNextMonth,
    ]

    const result = eventAdder(dates, [
      {
        id: '72b09n0023jbstfpeqdpmf8ror',
        summary: 'sdfsdfsdf',
        end: { date: `1999-12-1` },
      },
    ])
    expect(result).toBe(dates)
  })
})
