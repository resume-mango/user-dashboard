import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

/**
 * Fetches calendar events for given year
 * @param year number, example: 2022
 * @returns calendar object
 */
export const fetchCalendarEvents = async (year: number) => {
  const start = dayjs(year).startOf('year')
  const end = dayjs(year).endOf('year')
  const min = start.toISOString()
  const max = end.toISOString()
  try {
    const res = await axios.get(
      `/calendar${min && `?min=${min}`}${max && `&max=${max}`}`
    )
    if (res.data) return res.data
    else return null
  } catch (err) {
    return null
  }
}
