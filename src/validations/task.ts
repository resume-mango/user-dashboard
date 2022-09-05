import * as Yup from 'yup'

const title = Yup.string().required('Required')

const description = Yup.string().required('Required')

const status = Yup.string()
  .oneOf(['todo', 'inprogress', 'completed'])
  .required('Required')
const date = Yup.lazy((value) => (!value ? Yup.string() : Yup.date()))

export const validateTaskSchema = Yup.object().shape({
  title,
  description,
  status,
  startsAt: date,
  endsAt: date,
})
