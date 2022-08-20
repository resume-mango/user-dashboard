import * as Yup from 'yup'

const job_title = Yup.string()
  .required('job title is required')
  .max(100, 'Max 100 characters allowed')

const company = Yup.string()
  .required('company name is required')
  .max(100, 'Max 100 characters allowed')

const salary = Yup.string().max(100, 'Max 100 characters allowed')

const linkRegex =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

const job_link = Yup.string().test('isValid', 'Invalid link', (value) => {
  if (!value) return true
  return linkRegex.test(value)
})
const location = Yup.string().max(300, 'Max 300 characters allowed')

const deadline = Yup.date()
  .nullable()
  .transform((curr, orig) => (orig === '' ? null : curr))

const status = Yup.string()
  .oneOf(['applied', 'responded', 'interview', 'offers', 'rejected'])
  .required()

const color = Yup.string().oneOf(['red', 'green', 'blue', 'yellow']).required()

const logs = Yup.array().of(
  Yup.object().shape({
    text: Yup.string().max(300, 'Max 300 characters allowed').required(),
    updated_at: Yup.date().required(),
    created_at: Yup.date().required(),
  })
)

const description = Yup.string().max(3000, 'Max 3000 characters allowed')

export const validateTracker = Yup.object().shape({
  job_title,
  company,
  salary,
  deadline,
  job_link,
  location,
  status,
  color,
  logs,
  description,
})
