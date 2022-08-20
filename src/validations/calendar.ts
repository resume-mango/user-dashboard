import dayjs from 'dayjs'
import * as Yup from 'yup'

const summary = Yup.string().required('Required')
const location = Yup.string().test('empty / url', 'Enter correct url', (data) =>
  !data ||
  data.match(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
  )
    ? true
    : false
)

const startDate = Yup.date().typeError('Invaild date')
const endDate = Yup.string()
  .test(
    'empty-or-date',
    'Invalid Date',
    (date) => !date || dayjs(date).isValid()
  )
  .test(
    'should be greater',
    'End date should be greater than start date',
    (date, context) => {
      const starT = context.parent.startTime
      const endT = context.parent.endTime
      const startHour = parseInt(starT.split(':')[0])
      const startMin = parseInt(starT.split(':')[1])

      const endHour = parseInt(endT.split(':')[0])
      const endMin = parseInt(endT.split(':')[1])

      const start = dayjs(context.parent.startDate)
      const end = dayjs(date)
      if (date && date.length > 0 && !starT) {
        const diff = end.diff(start)
        return diff >= 0 ? true : false
      }

      if (date && date.length > 0 && starT && endT) {
        const diff = end
          .hour(endHour)
          .minute(endMin)
          .diff(start.hour(startHour).minute(startMin))
        return diff > 0 ? true : false
      } else {
        return true
      }
    }
  )

const startTime = Yup.string().test(
  'Start Date is Req',
  'Start Date is required with time',
  (data, context) => {
    if (data && data.length > 0) {
      const start = context.parent.startDate
      return dayjs(start).isValid() ? true : false
    } else {
      return true
    }
  }
)

const endTime = Yup.string()
  .test(
    'End Date is Req',
    'End Date is required with time',
    (data, context) => {
      if (data && data.length > 0) {
        const end = context.parent.endDate
        return dayjs(end).isValid() ? true : false
      } else {
        return true
      }
    }
  )
  .test('Start time required', 'Start time is required', (data, context) => {
    const start = context.parent.startTime
    if (data && data.length > 0) {
      return start ? true : false
    } else {
      return true
    }
  })
// .test(
//   'End date and time greater',
//   'End date and time should be greater than start date and time',
//   (data, context) => {
//     const startTime = parseInt(context.parent.startTime)
//     const endTime = parseInt(context.parent.endTime)
//     const startDate = context.parent.startDate
//     const endDate = context.parent.endDate
//     const start = context.parent.startTime
//     if (data && data.length > 0 && startTime && startDate) {
//       console.log('hi')
//       return false
//     } else {
//       console.log('hello')

//       return true
//     }
//   }
// )

const color = Yup.number().min(1).max(11)

export const validateCalendarSchema = Yup.object().shape({
  summary,
  startDate,
  endDate,
  startTime,
  endTime,
  location,
  color,
})
