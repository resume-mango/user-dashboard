import * as Yup from 'yup'

const name = Yup.string()
  .min(3, 'Too Short!')
  .max(30, 'Too Long!')
  .required('Required')

export const changeNameSchema = Yup.object().shape({
  firstName: name,
  lastName: name
})
