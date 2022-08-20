import dayjs from 'dayjs'

const year = dayjs().year()
const month = dayjs().month() + 1
const day = dayjs().day()

export const calendarData = [
  {
    id: '1gkofk531letl2klc1br8o1f06',
    summary: 'sdfsdf',
    start: { date: `${year}-${month}-${day}` },
    end: { date: `${year}-${month}-${day + 1}` },
  },
  {
    id: '72b09n0023jbstfpeqdpmf8ror',
    summary: 'sdfsdfsdf',
    start: { date: `${year}-${month}-${day + 1}` },
    end: { date: `${year}-${month}-${day + 3}` },
  },
  {
    id: '3qt2tjo29l5q8a1vcgq58pkcr4',
    summary: 'Sept 22',
    start: { date: `${year}-${month}-${day - 1}` },
    end: { date: `${year}-${month}-${day}` },
  },
]
