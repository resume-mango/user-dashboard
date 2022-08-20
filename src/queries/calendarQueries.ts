import { fetchCalendarEvents } from '../helpers/getCalendar'
import getQueryAdvance from '../hooks/getQueryAdvance'

/**
 * Gets Calendar events for give year
 * @param year number
 * @returns UseQueryResults
 */
export const getCalendar: any = (year: number) => {
  return getQueryAdvance(
    ['calendar', year],
    () => fetchCalendarEvents(year),
    true,
    {
      keepPreviousData: true,
    }
  )
}
