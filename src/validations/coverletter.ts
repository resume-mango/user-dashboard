import * as Yup from "yup"

const first_name = Yup.string()
  .required("first name is required")
  .max(300, "Max 300 characters allowed")
  .min(1, "Min 1 characters required")
const last_name = Yup.string()
  .required("last name is required")
  .max(300, "Max 300 characters allowed")
  .min(1, "Min 1 characters required")

const email_address = Yup.string()
  .email("email is invalid")
  .required("email is required")

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const phone_number = Yup.string().test(
  "isValid",
  "Invalid phone number",
  (value) => {
    if (!value) return true
    return phoneRegExp.test(value) && value.length >= 6 && value.length <= 10
  }
)

const designation = Yup.string().max(300, "Max 300 characters allowed")
const address = Yup.string()
  .label("address")
  .max(300, "Max 300 characters allowed")

const company = Yup.string().max(300, "Max 300 characters allowed")
const hiring_manager = Yup.string().max(300, "Max 300 characters allowed")

const description = Yup.string().test(
  "test_length_greater_than_10000",
  "Max 10000 characters allowed",
  (value) => {
    if (!value) return true
    const regex = /(<([^>]+)>)/gi
    const noBreak = value.replaceAll("<br>", "!!!!!!!!!!!!!!!")
    const plain = noBreak.replace(regex, "")
    if (plain.length > 10000) return false
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
  description,
})
