import dayjs from 'dayjs'

interface Dates {
  day: number
  date: string
  isCurr: boolean
  events: any
}
/**
 * Calendar helper
 * @param date Date
 * @returns {dates for nextMonth, prevMonth, currentMonth and weekdays}
 */
const useCalender = (
  date: dayjs.Dayjs
): {
  getDatesforNextMonth: Dates[]
  getDatesForPrevMonth: Dates[]
  getDatesForCurrMonth: Dates[]
  weekdays: Array<string>
} => {
  const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

  const daysInMonth = date.daysInMonth()
  const firstDayOfMonth = date.startOf('month').format('d')
  const endDayOfMonth = date.endOf('month').format('d')

  const firstDayOfTheMonthWeekday = parseInt(firstDayOfMonth)
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6

  const prevMonth = date.subtract(1, 'month')
  const firstdateodMonth = date.startOf('month')
  const prevMonthLastDay = firstdateodMonth
    .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
    .date()

  const lastDayOfTheMonthWeekday = parseInt(endDayOfMonth)
  const nextMonth = date.add(1, 'month')

  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday

  const getDatesForCurrMonth = [...Array(daysInMonth)].map((_day, i) => {
    return {
      day: i + 1,
      date: `${date.format('YYYY')}-${date.format('MM')}-${i + 1}`,
      isCurr: true,
      events: [] as any,
    }
  })

  const getDatesForPrevMonth = [
    ...Array(visibleNumberOfDaysFromPreviousMonth),
  ].map((_day, i) => {
    return {
      day: prevMonthLastDay + i,
      date: `${prevMonth.format('YYYY')}-${prevMonth.format('MM')}-${
        prevMonthLastDay + i
      }`,
      isCurr: false,
      events: [] as any,
    }
  })

  const getDatesforNextMonth = [...Array(visibleNumberOfDaysFromNextMonth)].map(
    (_day, i) => {
      return {
        day: i + 1,
        date: `${nextMonth.format('YYYY')}-${nextMonth.format('MM')}-${i + 1}`,
        isCurr: false,
        events: [] as any,
      }
    }
  )

  return {
    getDatesforNextMonth,
    getDatesForPrevMonth,
    getDatesForCurrMonth,
    weekdays,
  }
}

export default useCalender
