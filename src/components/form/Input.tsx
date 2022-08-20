import React, { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import { InvalidFeedBack } from '../../styled/form'

interface IInput {
  name: string
  label?: string
  className?: string
  style?: React.CSSProperties
  isFieldArray?: boolean
  hideError?: boolean
}

const Input: React.FC<
  IInput &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = ({ name, label, isFieldArray, className, style, hideError, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  let errMsg = null
  if (isFieldArray && !hideError) {
    const Errname = name.split('.')
    const getKeyVal = (selectionArray: Array<any>, obj: any) => {
      if (Object.keys(obj).length > 0) {
        selectionArray.forEach((key) => {
          if (!obj || !obj[key]) obj = null
          else obj = obj[key]
        })
      }
      const msg = obj && typeof obj === 'string' && obj.split('.')[1]
      return msg ? msg : obj
    }
    errMsg =
      Errname.length === 3 &&
      Object.keys(errors).length > 0 &&
      errors[Errname[0]]
        ? getKeyVal([Errname[1], Errname[2], 'message'], errors[Errname[0]])
        : null
  }

  return (
    <Fragment>
      <div className={className} style={style}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          className={`form-control ${(errors[name] || errMsg) && 'is-invalid'}`}
          {...register(name)}
          {...props}
        />
        {errors[name] && !hideError && (
          <InvalidFeedBack className="invalid-feild">
            {errors[name].message}
          </InvalidFeedBack>
        )}
        {errMsg && !hideError && (
          <InvalidFeedBack className="invalid-feild">{errMsg}</InvalidFeedBack>
        )}
      </div>
    </Fragment>
  )
}

export default Input
