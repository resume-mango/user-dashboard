import * as Yup from 'yup'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const first_name = Yup.string()
  .required('first name is required')
  .max(20, 'Max 20 characters allowed')
  .min(3, 'Min 3 characters required')
const last_name = Yup.string()
  .required('last name is required')
  .max(20, 'Max 20 characters allowed')
  .min(3, 'Min 3 characters required')

const email_address = Yup.string()
  .email('email is invalid')
  .required('email is required')

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const phone_number = Yup.string().test(
  'isValid',
  'Invalid phone number',
  (value) => {
    if (!value) return true
    return phoneRegExp.test(value) && value.length >= 6 && value.length <= 10
  }
)

const designation = Yup.string().max(50, 'Max 50 characters allowed')
const address = Yup.string()
  .label('address')
  .max(50, 'Max 50 characters allowed')

const about_info = Yup.string().test(
  'test_length_greater_than_2000',
  'Max 2000 characters allowed',
  (value) => {
    if (!value) return true
    const regex = /(<([^>]+)>)/gi
    const noBreak = value.replaceAll('<br>', '!!!!!!!!!!!!!!!')
    const plain = noBreak.replace(regex, '')
    if (plain.length > 2000) return false
    else return true
  }
)

const city = Yup.string().max(20, 'Max 20 characters allowed')
const description = Yup.string().test(
  'test_length_greater_than_300',
  'Max 300 characters allowed',
  (value) => {
    if (!value) return true
    const regex = /(<([^>]+)>)/gi
    const noBreak = value.replaceAll('<br>', '!!!!!!!!!!!!!!!')
    const plain = noBreak.replace(regex, '')

    if (plain.length > 300) return false
    else return true
  }
)

const isNumeric = (str: any) => {
  if (typeof str != 'string') return false
  return !isNaN(str as any) && !isNaN(parseFloat(str))
}

const duration = Yup.object()
  .test('valid start date', 'Invalid start date', (value) => {
    const start: any = value.start
    if (!start) return true
    if (start.length > 8) return false
    const splitVal = start.split(' ')
    if (
      splitVal.length !== 2 ||
      !months.includes(splitVal[0]) ||
      !isNumeric(splitVal[1]) ||
      splitVal[1] < 1999 ||
      splitVal[1] > 2098
    )
      return false
    else return true
  })
  .test('valid end date', 'Invalid end date', (value) => {
    const end: any = value.end
    if (!end) return true
    if (end.length > 8) return false
    const splitVal = end.split(' ')
    if (
      splitVal.length !== 2 ||
      !months.includes(splitVal[0]) ||
      !isNumeric(splitVal[1]) ||
      splitVal[1] < 1999 ||
      splitVal[1] > 2098
    )
      return false
    else return true
  })
  .test('required date', 'start date required', (value) => {
    const end: any = value.end
    const start: any = value.start

    if (!end && !start) return true
    if (end && !start) return false
    else return true
  })

const experience = Yup.array().of(
  Yup.object().shape({
    company: Yup.string().required().max(30, 'Max 30 characters allowed'),
    designation: Yup.string().required().max(30, 'Max 30 characters allowed'),
    city,
    description,
    duration
  })
)

const education = Yup.array().of(
  Yup.object().shape({
    institution: Yup.string().required().max(30, 'Max 30 characters allowed'),
    degree: Yup.string().required().max(30, 'Max 30 characters allowed'),
    city,
    description,
    duration
  })
)

const skills = Yup.array().of(
  Yup.object().shape({
    title: Yup.string().required().max(30, 'Max 30 characters allowed'),
    rating: Yup.number().required().min(0).max(5, 'Max length 5 allowed')
  })
)

const courses = Yup.array().of(
  Yup.object().shape({
    institution: Yup.string().required().max(30, 'Max 30 characters allowed'),
    course: Yup.string().required().max(30, 'Max 30 characters allowed'),
    duration
  })
)

const internships = Yup.array().of(
  Yup.object().shape({
    job_title: Yup.string()
      .required('job title is required')
      .max(30, 'Max 30 characters allowed'),
    employer: Yup.string().required().max(30, 'Max 30 characters allowed'),
    city,
    description,
    duration
  })
)
const languages = Yup.array().of(
  Yup.object().shape({
    language: Yup.string().required().max(30, 'Max 30 characters allowed'),
    level: Yup.string().max(30, 'Max 30 characters allowed')
  })
)

const references = Yup.array().of(
  Yup.object().shape({
    name: Yup.string().required().max(30, 'Max 30 characters allowed'),
    company: Yup.string().required().max(30, 'Max 30 characters allowed'),
    phone_number,
    email_address
  })
)

export const validateResumeFrom = Yup.object().shape({
  first_name: first_name,
  last_name: last_name,
  email_address,
  phone_number,
  designation,
  address,
  about_info,
  experience,
  education,
  skills,
  courses,
  internships,
  languages,
  references
})
