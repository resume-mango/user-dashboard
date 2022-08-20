import dayjs from 'dayjs'
import useCalender from '../../helpers/calender'

describe('Calendar helper', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('calendar with previod month dates', async () => {
    const result = useCalender(dayjs('2022-07-01'))
    expect(result).toEqual(
      expect.objectContaining({
        getDatesforNextMonth: expect.any(Array),
        getDatesForPrevMonth: expect.any(Array),
        getDatesForCurrMonth: expect.any(Array),
        weekdays: expect.any(Array),
      })
    )
  })

  test('calendar with next month dates', async () => {
    const result = useCalender(dayjs('2022-08-25'))
    expect(result).toEqual(
      expect.objectContaining({
        getDatesforNextMonth: expect.any(Array),
        getDatesForPrevMonth: expect.any(Array),
        getDatesForCurrMonth: expect.any(Array),
        weekdays: expect.any(Array),
      })
    )
  })
})
