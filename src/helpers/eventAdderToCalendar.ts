import dayjs from 'dayjs'

/**
 * Finds event date
 * @param date event date
 * @param dates List of dates
 * @returns returns index position of the matched date
 */
export const findEventDate = (date: string, dates: Array<any>) =>
  dates.findIndex((obj) => {
    return obj.date == dayjs(date).format('YYYY-MM-D')
  })

/**
 * Adds events to dates
 * @param dates list
 * @param data list
 * @returns dates
 */
export const eventAdder = (dates: Array<any>, data: Array<any>): Array<any> => {
  data &&
    data.forEach((item: any) => {
      let date: any
      if (!item.start) return
      item.start.dateTime
        ? (date = item.start.dateTime.split('T')[0])
        : item.start.date
        ? (date = item.start.date)
        : (date = null)
      if (!date) return
      const found = findEventDate(date, dates)
      if (found === -1) return
      dates[found].events.push(item as any)
    })
  return dates
}
