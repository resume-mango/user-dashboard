import * as Yup from 'yup'

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

const company = Yup.string().max(50, 'Max 50 characters allowed')
const hiring_manager = Yup.string().max(50, 'Max 50 characters allowed')

const description = Yup.string().test(
  'test_length_greater_than_3000',
  'Max 3000 characters allowed',
  (value) => {
    if (!value) return true
    const regex = /(<([^>]+)>)/gi
    const noBreak = value.replaceAll('<br>', '!!!!!!!!!!!!!!!')
    const plain = noBreak.replace(regex, '')
    if (plain.length > 3000) return false
    else return true
  }
)

export const validateCoverLetterSteps = Yup.object().shape({
  first_name,
  last_name,
  email_address,
  phone_number,
  designation,
  address,
  company,
  hiring_manager,
  description
})
